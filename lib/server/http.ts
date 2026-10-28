import 'server-only';

import { NextResponse } from 'next/server';

import { getAppUrl } from '@/lib/server/config';

export class RequestError extends Error {
  constructor(
    message: string,
    public readonly status = 400,
  ) {
    super(message);
    this.name = 'RequestError';
  }
}

export function jsonResponse(data: unknown, status = 200, headers?: HeadersInit) {
  return NextResponse.json(data, {
    status,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
      ...headers,
    },
  });
}

export function assertJsonRequest(request: Request) {
  const contentType = request.headers.get('content-type')?.toLowerCase() ?? '';
  if (!contentType.startsWith('application/json')) {
    throw new RequestError('Content-Type must be application/json', 415);
  }
}

export async function readJsonBody(request: Request, maximumBytes = 16_384): Promise<unknown> {
  assertJsonRequest(request);

  const declaredLength = Number(request.headers.get('content-length') ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > maximumBytes) {
    throw new RequestError('Request body is too large', 413);
  }

  const rawBody = await request.text();
  if (Buffer.byteLength(rawBody, 'utf8') > maximumBytes) {
    throw new RequestError('Request body is too large', 413);
  }

  try {
    return JSON.parse(rawBody) as unknown;
  } catch {
    throw new RequestError('Request body must contain valid JSON');
  }
}

export function assertSameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return;

  let suppliedOrigin: string;
  try {
    suppliedOrigin = new URL(origin).origin;
  } catch {
    throw new RequestError('Invalid request origin', 403);
  }

  const requestOrigin = new URL(request.url).origin;
  const configuredOrigin = getAppUrl().origin;
  if (suppliedOrigin !== requestOrigin && suppliedOrigin !== configuredOrigin) {
    throw new RequestError('Cross-origin request rejected', 403);
  }
}

export function getClientAddress(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || request.headers.get('x-real-ip')?.trim() || 'unknown';
}

export function publicErrorResponse(error: unknown, fallbackMessage: string) {
  if (error instanceof RequestError) {
    return jsonResponse({ error: error.message }, error.status);
  }

  // Do not return provider errors, SMTP details, or environment information to the browser.
  console.error(fallbackMessage, error instanceof Error ? error.message : 'Unknown server error');
  return jsonResponse({ error: fallbackMessage }, 500);
}
