import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('session')?.value;
  if (!token || !token.includes('.')) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
