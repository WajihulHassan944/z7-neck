import { NextRequest, NextResponse } from 'next/server';
import { getSessionToken, getUserBySessionToken } from '@/lib/auth';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

// Define request schema
const toggleAdminSchema = z.object({
  isAdmin: z.boolean(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: any }
) {
  try {
    const userId = parseInt(params.id);
    
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      );
    }
    
    // Get session token from cookies
    const sessionToken = getSessionToken(request);
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Get current user by session token
    const currentUser = await getUserBySessionToken(sessionToken);
    
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Session expired or invalid' },
        { status: 401 }
      );
    }
    
    // Check if current user is admin
    if (!currentUser.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    // Parse and validate request
    const body = await request.json();
    const validationResult = toggleAdminSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const { isAdmin } = validationResult.data;
    
    // Prevent self-demotion
    if (userId === currentUser.id && !isAdmin) {
      return NextResponse.json(
        { error: 'Cannot remove admin privileges from yourself' },
        { status: 400 }
      );
    }
    
    // Check if user exists and if they are a super admin
    const userCheck = await db
      .select({ 
        id: users.id,
        isSuperAdmin: users.isSuperAdmin
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    
    if (userCheck.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Prevent removing admin status from super admin accounts
    if (userCheck[0].isSuperAdmin && !isAdmin) {
      return NextResponse.json(
        { error: 'Cannot remove admin privileges from super admin accounts' },
        { status: 400 }
      );
    }
    
    // Update user's admin status
    await db
      .update(users)
      .set({
        isAdmin,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId));
    
    return NextResponse.json({ 
      success: true, 
      message: `User is ${isAdmin ? 'now an admin' : 'no longer an admin'}`
    });
  } catch (error) {
    console.error('Error updating user admin status:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 