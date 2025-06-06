import { NextRequest, NextResponse } from 'next/server';
import { getUserBySessionToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('auth_session')?.value;
    
    if (!sessionToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    const user = await getUserBySessionToken(sessionToken);
    
    if (!user) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }
    
    // Return user data without sensitive information
    return NextResponse.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      isSuperAdmin: user.isSuperAdmin
    });
  } catch (error) {
    console.error('Error verifying session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Export a config that forces this to run in Node.js environment, not the Edge
export const config = {
  runtime: 'nodejs'
}; 