import { NextRequest, NextResponse } from 'next/server';
import { createSession, getUserByEmail, setSessionCookie, verifyPassword } from '@/lib/auth';
import { z } from 'zod';

// Define login request schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request
    const body = await request.json();
    const validationResult = loginSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const { email, password } = validationResult.data;
    
    // Get user by email
    const user = await getUserByEmail(email);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Verify password
    const isPasswordValid = verifyPassword(user.passwordHash, password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Create session and set cookie
    const sessionToken = await createSession(user.id);
    
    // Prepare user data (don't include sensitive info)
    const userData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
    };
    
    // Create response with session cookie
    const response = NextResponse.json(
      { success: true, user: userData }
    );
    
    return setSessionCookie(response, sessionToken);
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 