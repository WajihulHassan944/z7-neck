import { NextRequest, NextResponse } from 'next/server';
import { generatePasswordResetToken, getUserByEmail, sendPasswordResetEmail } from '@/lib/auth';
import { z } from 'zod';

// Define request schema
const requestResetSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request
    const body = await request.json();
    const validationResult = requestResetSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const { email } = validationResult.data;
    
    // Find user by email
    const user = await getUserByEmail(email);
    
    // For security reasons, always return success even if email doesn't exist
    if (!user) {
      return NextResponse.json({ success: true });
    }
    
    // Generate password reset token
    const token = await generatePasswordResetToken(user.id);
    
    // Send password reset email
    await sendPasswordResetEmail(email, token);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error requesting password reset:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 