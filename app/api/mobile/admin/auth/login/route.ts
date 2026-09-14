import { NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';
import bcrypt from 'bcryptjs';
import {
  getClientIpFromHeaders,
  rateLimit,
  rateLimitHeaders,
  type RateLimitConfig,
} from '@/lib/rate-limit';

// Duke Street Tyres is a static booking site — bookings go to Tyre Rescue directly.
// This endpoint allows the Assisted Chat iOS app to authenticate for read-only
// operational visibility (analytics, booking status from TR, etc.).
// Credentials are configured via environment variables (no DB required).

export const runtime = 'nodejs';

const MAX_LOGIN_BODY_BYTES = 2048;
const MAX_EMAIL_LENGTH = 254;
const MAX_PASSWORD_LENGTH = 512;

const LOGIN_RATE_LIMIT = {
  prefix: 'route:mobile-admin-login',
  windowMs: 15 * 60 * 1000,
  max: 5,
  blockDurationMs: 30 * 60 * 1000,
} satisfies RateLimitConfig;

function base64url(input: Buffer | string): string {
  const b = Buffer.isBuffer(input) ? input : Buffer.from(input, 'utf8');
  return b.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function signMobileToken(payload: Record<string, unknown>): string {
  const secret = process.env.MOBILE_ADMIN_JWT_SECRET ?? process.env.AUTH_SECRET ?? '';
  if (!secret) throw new Error('MOBILE_ADMIN_JWT_SECRET is not configured');
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64url(JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 86400 }));
  const sig = base64url(createHmac('sha256', secret).update(`${header}.${body}`).digest());
  return `${header}.${body}.${sig}`;
}

export async function POST(request: Request): Promise<NextResponse> {
  const ip = getClientIpFromHeaders(request.headers);
  const limit = rateLimit(ip, LOGIN_RATE_LIMIT);
  const headers = rateLimitHeaders(limit);

  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many login attempts. Try again later.' },
      { status: 429, headers },
    );
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_LOGIN_BODY_BYTES) {
    return NextResponse.json({ error: 'Request body is too large.' }, { status: 413, headers });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400, headers });
  }

  const email = typeof (body as Record<string, unknown>).email === 'string'
    ? ((body as Record<string, unknown>).email as string).toLowerCase().trim()
    : '';
  const password = typeof (body as Record<string, unknown>).password === 'string'
    ? ((body as Record<string, unknown>).password as string)
    : '';

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400, headers });
  }

  if (email.length > MAX_EMAIL_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
    return NextResponse.json({ error: 'Email or password is incorrect.' }, { status: 401, headers });
  }

  const configEmail = (process.env.MOBILE_ADMIN_EMAIL ?? '').toLowerCase().trim();
  const configHash = process.env.MOBILE_ADMIN_PASSWORD_HASH ?? '';

  if (!configEmail || !configHash) {
    return NextResponse.json({ error: 'Admin not configured.' }, { status: 503, headers });
  }

  const emailMatch = timingSafeEqual(Buffer.from(email), Buffer.from(configEmail.padEnd(email.length, '\0').slice(0, email.length))) && email === configEmail;
  const passwordValid = emailMatch && await bcrypt.compare(password, configHash);

  if (!passwordValid) {
    return NextResponse.json({ error: 'Email or password is incorrect.' }, { status: 401, headers });
  }

  const token = signMobileToken({ email: configEmail, role: 'admin', site: 'dukestreettyres' });

  return NextResponse.json({
    token,
    user: { id: 'dukestreet-admin', name: 'Duke Street Admin', email: configEmail, role: 'admin' },
  }, { headers });
}
