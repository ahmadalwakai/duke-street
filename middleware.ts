import { NextRequest, NextResponse } from "next/server";
import {
  getClientIpFromHeaders,
  rateLimit,
  rateLimitHeaders,
  type RateLimitConfig,
} from "@/lib/rate-limit";

const LIMITS = {
  login: {
    prefix: "middleware:login",
    windowMs: 60 * 1000,
    max: 10,
    blockDurationMs: 15 * 60 * 1000,
  },
  api: {
    prefix: "middleware:api",
    windowMs: 60 * 1000,
    max: 60,
    blockDurationMs: 5 * 60 * 1000,
  },
} satisfies Record<string, RateLimitConfig>;

function tooManyRequests(headers: HeadersInit): NextResponse {
  const responseHeaders = new Headers(headers);
  responseHeaders.set("Cache-Control", "no-store");
  return NextResponse.json(
    { error: "Too many requests. Try again later." },
    { status: 429, headers: responseHeaders },
  );
}

export function middleware(request: NextRequest): NextResponse {
  const limit = request.nextUrl.pathname === "/api/mobile/admin/auth/login"
    ? LIMITS.login
    : LIMITS.api;
  const ip = getClientIpFromHeaders(request.headers);
  const result = rateLimit(`${request.method}:${ip}`, limit);
  const headers = rateLimitHeaders(result);

  if (!result.allowed) {
    return tooManyRequests(headers);
  }

  const response = NextResponse.next();

  for (const [key, value] of Object.entries(headers)) {
    response.headers.set(key, value);
  }

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
