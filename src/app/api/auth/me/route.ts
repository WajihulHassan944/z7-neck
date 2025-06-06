import { NextRequest, NextResponse } from 'next/server';
import { getUserBySessionToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Get session token directly from cookies
    const sessionToken = request.cookies.get('auth_session')?.value;
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Get user by session token
    const user = await getUserBySessionToken(sessionToken);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Session expired or invalid' },
        { status: 401 }
      );
    }
    
    // Return user data (don't include sensitive info)
    return NextResponse.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      isSuperAdmin: user.isSuperAdmin,
    });
  } catch (error) {
    console.error('Error getting current user:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// Force this to run in the Node.js environment, not Edge
export const config = {
  runtime: 'nodejs'
}; 