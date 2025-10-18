import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authConfig } from '@/shared/config/auth';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const currentPath = request.nextUrl.pathname;
  const role = request.cookies.get('role')?.value;

  const isAuthPage = authConfig.publicPages.some(
    (path: string) => path !== '/' && currentPath.startsWith(path),
  );

  const isProtectedPage =
    authConfig.protectedPages.some((path: string) =>
      currentPath.startsWith(path),
    ) && !isAuthPage;

  if (isProtectedPage) {
    const isAdmin = role === 'ROLE_HEAD_ADMIN' || role === 'ROLE_PLACE_ADMIN';
    if (!isAdmin) {
      return NextResponse.redirect(new URL(authConfig.signInPage, request.url));
    }
  }

  if (currentPath.startsWith('/api')) {
    requestHeaders.set('x-custom-header', 'api-request');

    const accessToken = request.cookies.get('accessToken');
    if (accessToken) {
      requestHeaders.set('Authorization', `Bearer ${accessToken.value}`);
    }

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  if (
    currentPath.startsWith('/_next') ||
    currentPath.startsWith('/favicon') ||
    currentPath.includes('.')
  ) {
    return NextResponse.next();
  }

  const hasAccessToken = request.cookies.has('accessToken');
  const hasRefreshToken = request.cookies.has('refreshToken');

  if (!hasAccessToken && isProtectedPage) {
    if (hasRefreshToken) {
      return NextResponse.next({
        request: { headers: requestHeaders },
      });
    } else {
      return NextResponse.redirect(new URL(authConfig.signInPage, request.url));
    }
  }

  if (hasAccessToken && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg).*)',
  ],
};
