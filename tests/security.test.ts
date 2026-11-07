import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { afterEach, beforeEach, test } from 'node:test';
import bcrypt from 'bcryptjs';
import { POST } from '../app/api/mobile/admin/auth/login/route';
import nextConfig from '../next.config';
import { NextRequest } from 'next/server';
import { config as middlewareConfig, middleware } from '../middleware';

const TEST_EMAIL = 'admin@example.test';
const TEST_PASSWORD = 'test-only-password';
const TEST_SECRET = 'test-only-signing-secret-at-least-32-bytes';
const TEST_HASH = bcrypt.hashSync(TEST_PASSWORD, 4);
const envKeys = ['MOBILE_ADMIN_EMAIL', 'MOBILE_ADMIN_PASSWORD_HASH', 'MOBILE_ADMIN_JWT_SECRET', 'AUTH_SECRET'] as const;
const previousEnv = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));

beforeEach(() => {
  globalThis.__dukeStreetTyresRateLimitStore?.clear();
  process.env.MOBILE_ADMIN_EMAIL = TEST_EMAIL;
  process.env.MOBILE_ADMIN_PASSWORD_HASH = TEST_HASH;
  process.env.MOBILE_ADMIN_JWT_SECRET = TEST_SECRET;
  delete process.env.AUTH_SECRET;
});

afterEach(() => {
  for (const key of envKeys) {
    if (previousEnv[key] === undefined) delete process.env[key];
    else process.env[key] = previousEnv[key];
  }
});

function login(body: string, headers: Record<string, string> = {}) {
  return POST(new Request('http://localhost/api/mobile/admin/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body,
  }));
}

test('rejects null, arrays and primitive JSON without throwing', async () => {
  for (const body of ['null', '[]', 'true', '1', '"email"']) {
    const response = await login(body);
    assert.equal(response.status, 400);
    assert.equal(response.headers.get('cache-control'), 'no-store');
  }
});

test('rejects malformed JSON and missing credentials', async () => {
  assert.equal((await login('{')).status, 400);
  assert.equal((await login('{}')).status, 400);
  assert.equal((await login('{"email":true,"password":123}')).status, 400);
});

test('enforces actual byte size with absent or misleading content-length', async () => {
  const oversized = JSON.stringify({ email: TEST_EMAIL, password: 'é'.repeat(1100) });
  assert.equal((await login(oversized)).status, 413);
  assert.equal((await login(oversized, { 'content-length': '10' })).status, 413);
});

test('non-ASCII email fails as unauthorized instead of a buffer-length exception', async () => {
  const response = await login(JSON.stringify({ email: 'é@example.test', password: TEST_PASSWORD }));
  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), { error: 'Email or password is incorrect.' });
});

test('both unknown-email and wrong-password attempts perform bcrypt verification', async (context) => {
  // This verifies the expensive work occurs on both paths without a flaky
  // wall-clock threshold that depends on machine load.
  const comparison = context.mock.method(bcrypt, 'compare', async () => false);
  const unknown = await login(JSON.stringify({ email: 'unknown@example.test', password: 'wrong' }));
  const known = await login(JSON.stringify({ email: TEST_EMAIL, password: 'wrong' }));
  assert.equal(comparison.mock.callCount(), 2);
  assert.equal(unknown.status, 401);
  assert.equal(known.status, 401);
  assert.deepEqual(await unknown.json(), await known.json());
});

test('missing signing configuration returns the same controlled error for both credentials', async () => {
  delete process.env.MOBILE_ADMIN_JWT_SECRET;
  const correct = await login(JSON.stringify({ email: TEST_EMAIL, password: TEST_PASSWORD }));
  const incorrect = await login(JSON.stringify({ email: 'unknown@example.test', password: 'wrong' }));
  assert.equal(correct.status, 503);
  assert.equal(incorrect.status, 503);
  assert.deepEqual(await correct.json(), await incorrect.json());
});

test('invalid password-hash configuration fails closed', async () => {
  process.env.MOBILE_ADMIN_PASSWORD_HASH = 'not-a-bcrypt-hash';
  assert.equal((await login(JSON.stringify({ email: TEST_EMAIL, password: TEST_PASSWORD }))).status, 503);
});

test('bcrypt errors return a controlled unavailable response', async (context) => {
  context.mock.method(bcrypt, 'compare', async () => { throw new Error('invalid salt'); });
  assert.equal((await login(JSON.stringify({ email: TEST_EMAIL, password: TEST_PASSWORD }))).status, 503);
});

test('successful login preserves signed token/user contract and disables caching', async () => {
  const response = await login(JSON.stringify({ email: ` ${TEST_EMAIL.toUpperCase()} `, password: TEST_PASSWORD }));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  const data = await response.json();
  const [header, payload, signature] = data.token.split('.');
  assert.deepEqual(JSON.parse(Buffer.from(header, 'base64url').toString()), { alg: 'HS256', typ: 'JWT' });
  assert.equal(signature, createHmac('sha256', TEST_SECRET).update(`${header}.${payload}`).digest('base64url'));
  const claims = JSON.parse(Buffer.from(payload, 'base64url').toString());
  assert.equal(claims.email, TEST_EMAIL);
  assert.equal(claims.role, 'admin');
  assert.equal(claims.site, 'dukestreettyres');
  assert.equal(claims.exp - claims.iat, 86400);
  assert.equal(data.user.id, 'dukestreet-admin');
});

test('legacy AUTH_SECRET fallback still signs the existing token contract', async () => {
  delete process.env.MOBILE_ADMIN_JWT_SECRET;
  process.env.AUTH_SECRET = TEST_SECRET;
  assert.equal((await login(JSON.stringify({ email: TEST_EMAIL, password: TEST_PASSWORD }))).status, 200);
});

test('sixth login attempt is rate limited with retry and no-store headers', async () => {
  for (let index = 0; index < 5; index++) {
    assert.equal((await login(JSON.stringify({ email: TEST_EMAIL, password: 'wrong' }))).status, 401);
  }
  const response = await login(JSON.stringify({ email: TEST_EMAIL, password: TEST_PASSWORD }));
  assert.equal(response.status, 429);
  assert.ok(Number(response.headers.get('retry-after')) > 0);
  assert.equal(response.headers.get('cache-control'), 'no-store');
});

test('API middleware has a separate burst limit and uncached throttle response', async () => {
  assert.equal(middlewareConfig.matcher, '/api/:path*');
  const request = new NextRequest('http://localhost/api/mobile/admin/auth/login', { method: 'POST' });
  for (let index = 0; index < 10; index++) {
    assert.equal(middleware(request).headers.get('x-middleware-next'), '1');
  }
  const response = middleware(request);
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.ok(Number(response.headers.get('retry-after')) > 0);
});

test('security headers cover all paths without restricting booking navigation', async () => {
  assert.equal(nextConfig.poweredByHeader, false);
  const rules = await nextConfig.headers!();
  const allPaths = rules.find((rule) => rule.source === '/:path*');
  assert.ok(allPaths);
  const headers = Object.fromEntries(allPaths.headers.map(({ key, value }) => [key.toLowerCase(), value]));
  assert.equal(headers['x-content-type-options'], 'nosniff');
  assert.equal(headers['x-frame-options'], 'SAMEORIGIN');
  assert.match(headers['content-security-policy'], /frame-ancestors 'self'/);
  assert.match(headers['content-security-policy'], /object-src 'none'/);
  assert.equal(headers['referrer-policy'], 'strict-origin-when-cross-origin');
});
