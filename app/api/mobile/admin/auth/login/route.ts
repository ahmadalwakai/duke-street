import { NextResponse } from 'next/server';
import { createHash, createHmac, timingSafeEqual } from 'crypto';
import bcrypt from 'bcryptjs';
import {
  getClientIpFromHeaders,
  rateLimit,
  rateLimitHeaders,
  type RateLimitConfig,
} from '@/lib/rate-limit';

// Duke Street Tyres is a static booking site — bookings go to Tyre Rescue directly.
// Retain the Assisted Chat app's login response contract. This repository does
// not contain a consumer/verifier for the returned token, or protected admin
// data routes. Any backend accepting it must verify it before authorizing access;
// the signing secret must never be embedded in the mobile client.

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

function signMobileToken(payload: Record<string, unknown>, secret: string): string {
  const issuedAt = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64url(JSON.stringify({ ...payload, iat: issuedAt, exp: issuedAt + 86400 }));
  const sig = base64url(createHmac('sha256', secret).update(`${header}.${body}`).digest());
  return `${header}.${body}.${sig}`;
}

async function readLoginBody(request: Request): Promise<unknown> {
  if (!request.body) return null;
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_LOGIN_BODY_BYTES) {
        await reader.cancel();
        throw new RangeError('Request body is too large.');
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown;
}

export async function POST(request: Request): Promise<NextResponse> {
  const ip = getClientIpFromHeaders(request.headers);
  const limit = rateLimit(ip, LOGIN_RATE_LIMIT);
  const headers = new Headers(rateLimitHeaders(limit));
  headers.set('Cache-Control', 'no-store');

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
    body = await readLoginBody(request);
  } catch (error) {
    if (error instanceof RangeError) {
      return NextResponse.json({ error: 'Request body is too large.' }, { status: 413, headers });
    }
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400, headers });
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400, headers });
  }

  const credentials = body as Record<string, unknown>;
  const email = typeof credentials.email === 'string'
    ? credentials.email.toLowerCase().trim()
    : '';
  const password = typeof credentials.password === 'string'
    ? credentials.password
    : '';

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400, headers });
  }

  if (email.length > MAX_EMAIL_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
    return NextResponse.json({ error: 'Email or password is incorrect.' }, { status: 401, headers });
  }

  const configEmail = (process.env.MOBILE_ADMIN_EMAIL ?? '').toLowerCase().trim();
  const configHash = process.env.MOBILE_ADMIN_PASSWORD_HASH ?? '';
  const secret = process.env.MOBILE_ADMIN_JWT_SECRET || process.env.AUTH_SECRET || '';

  // Check configuration before looking up credentials so a missing signing key
  // cannot distinguish a correct password from an incorrect one via a 500.
  if (!configEmail || !/^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(configHash) || !secret) {
    return NextResponse.json({ error: 'Admin not configured.' }, { status: 503, headers });
  }

  // Fixed-size digests also handle non-ASCII email safely. Always perform the
  // expensive password comparison, including for an unknown email address.
  const emailMatch = timingSafeEqual(
    createHash('sha256').update(email).digest(),
    createHash('sha256').update(configEmail).digest(),
  );
  let passwordValid: boolean;
  try {
    passwordValid = await bcrypt.compare(password, configHash);
  } catch {
    return NextResponse.json({ error: 'Admin not configured.' }, { status: 503, headers });
  }

  if (!emailMatch || !passwordValid) {
    return NextResponse.json({ error: 'Email or password is incorrect.' }, { status: 401, headers });
  }

  const token = signMobileToken({ email: configEmail, role: 'admin', site: 'dukestreettyres' }, secret);

  return NextResponse.json({
    token,
    user: { id: 'dukestreet-admin', name: 'Duke Street Admin', email: configEmail, role: 'admin' },
  }, { headers });
}
