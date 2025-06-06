import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Protect admin routes - only accessible to admin users
  if (path.startsWith('/admin')) {
    const sessionToken = request.cookies.get('auth_session')?.value;
    
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    try {
      // Use an API route instead of direct DB access that uses crypto
      const response = await fetch(`${request.nextUrl.origin}/api/auth/verify-session`, {
        headers: {
          Cookie: `auth_session=${sessionToken}`
        }
      });
      
      if (!response.ok) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      
      const user = await response.json();
      
      if (!user.isAdmin) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // Protect user profile routes - only accessible to authenticated users
  if (path.startsWith('/profile')) {
    const sessionToken = request.cookies.get('auth_session')?.value;
    
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // Redirect authenticated users away from auth pages
  if (path.startsWith('/login') || path.startsWith('/signup') || path.startsWith('/reset-password') || path.startsWith('/forgot-password')) {
    const sessionToken = request.cookies.get('auth_session')?.value;
    
    if (sessionToken) {
      try {
        // Use an API route instead of direct DB access that uses crypto
        const response = await fetch(`${request.nextUrl.origin}/api/auth/verify-session`, {
          headers: {
            Cookie: `auth_session=${sessionToken}`
          }
        });
        
        if (response.ok) {
          // User is logged in, redirect to home or profile
          return NextResponse.redirect(new URL('/', request.url));
        }
      } catch (error) {
        console.error('Middleware error:', error);
        // Continue to auth pages if there's an error
      }
    }
  }
  
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*', '/profile/:path*', '/login', '/signup', '/reset-password', '/forgot-password'],
}; 