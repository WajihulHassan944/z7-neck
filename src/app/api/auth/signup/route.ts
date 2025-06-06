import { NextRequest, NextResponse } from 'next/server';
import { createSession, createUser, setSessionCookie } from '@/lib/auth';
import { z } from 'zod';

// Define signup request schema
const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request
    const body = await request.json();
    const validationResult = signupSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const { email, password, firstName, lastName } = validationResult.data;
    
    // Create user
    const createResult = await createUser(email, password, firstName, lastName);
    
    if (!createResult.success) {
      return NextResponse.json(
        { error: createResult.error },
        { status: 400 }
      );
    }
    
    // Create session and set cookie
    const sessionToken = await createSession(createResult?.user?.id || 0);
    
    // Prepare user data (don't include sensitive info)
    const userData = {
      id: createResult?.user?.id,
      email: createResult?.user?.email,
      firstName: createResult?.user?.firstName,
      lastName: createResult?.user?.lastName,
      isAdmin: createResult?.user?.isAdmin,
    };
    
    // Create response with session cookie
    const response = NextResponse.json(
      { success: true, user: userData },
      { status: 201 }
    );
    
    return setSessionCookie(response, sessionToken);
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 