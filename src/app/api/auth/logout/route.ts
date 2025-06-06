import { NextRequest, NextResponse } from 'next/server';
import { clearSessionCookie, getSessionToken } from '@/lib/auth';
import { db } from '@/lib/db';
import { sessions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    // Get session token from cookies
    const sessionToken = getSessionToken(request);
    
    if (sessionToken) {
      // Delete session from database
      await db.delete(sessions).where(eq(sessions.token, sessionToken));
    }
    
    // Clear session cookie and return response
    const response = NextResponse.json({ success: true });
    return clearSessionCookie(response);
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 