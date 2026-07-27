import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  
  // Protect all /admin routes except /admin/login
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    try {
      await decrypt(session);
    } catch (err) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // Redirect /admin/login to /admin if already logged in
  if (request.nextUrl.pathname.startsWith('/admin/login')) {
    if (session) {
      try {
        await decrypt(session);
        return NextResponse.redirect(new URL('/admin', request.url));
      } catch (err) {}
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
