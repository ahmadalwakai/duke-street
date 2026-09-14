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
  sitemap: {
    prefix: "middleware:sitemap",
    windowMs: 60 * 1000,
    max: 30,
    blockDurationMs: 10 * 60 * 1000,
  },
  page: {
    prefix: "middleware:page",
    windowMs: 60 * 1000,
    max: 240,
    blockDurationMs: 5 * 60 * 1000,
  },
} satisfies Record<string, RateLimitConfig>;

function getLimitForPath(pathname: string): RateLimitConfig {
  if (pathname === "/api/mobile/admin/auth/login") return LIMITS.login;
  if (pathname.startsWith("/api/")) return LIMITS.api;
  if (pathname.endsWith(".xml")) return LIMITS.sitemap;
  return LIMITS.page;
}

function tooManyRequests(headers: HeadersInit): NextResponse {
  return NextResponse.json(
    { error: "Too many requests. Try again later." },
    { status: 429, headers },
  );
}

export function middleware(request: NextRequest): NextResponse {
  const limit = getLimitForPath(request.nextUrl.pathname);
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
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.svg|photos/|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|css|js|map)$).*)",
  ],
};
