import { NextResponse } from 'next/server';

// Edge-compatible HMAC-SHA256 verification (Web Crypto API)
async function verifyToken(token) {
  try {
    const secret = process.env.AUTH_SECRET;
    if (!secret) return null;

    const dot = token.lastIndexOf('.');
    if (dot === -1) return null;

    const data = token.slice(0, dot);
    const sig = token.slice(dot + 1);

    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const rawSig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
    const expected = btoa(String.fromCharCode(...new Uint8Array(rawSig)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');

    if (expected !== sig) return null;

    // Decode base64url payload (UTF-8 safe)
    const bytes = Uint8Array.from(
      atob(data.replace(/-/g, '+').replace(/_/g, '/')),
      (c) => c.charCodeAt(0)
    );
    const payload = JSON.parse(new TextDecoder().decode(bytes));

    if (Date.now() > payload.exp) return null;

    return payload;
  } catch {
    return null;
  }
}

async function createToken(payload) {
  const secret = process.env.AUTH_SECRET;
  const enc = new TextEncoder();

  const jsonBytes = enc.encode(JSON.stringify(payload));
  const data = btoa(String.fromCharCode(...jsonBytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const rawSig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  const sig = btoa(String.fromCharCode(...new Uint8Array(rawSig)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  return `${data}.${sig}`;
}

export async function middleware(request) {
  const token = request.cookies.get('session')?.value;
  const payload = token ? await verifyToken(token) : null;

  if (!payload) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (payload.rol !== 'ADMIN' && request.nextUrl.pathname.startsWith('/admin/usuarios')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  const response = NextResponse.next();

  // Renovar token si expira en menos de 10 minutos
  if (payload.exp - Date.now() < 10 * 60 * 1000) {
    const { exp: _, ...rest } = payload;
    const renewed = { ...rest, exp: Date.now() + 3_600_000 };
    const newToken = await createToken(renewed);
    response.cookies.set('session', newToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
