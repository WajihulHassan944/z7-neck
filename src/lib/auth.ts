import { db } from './db';
import { users, sessions, passwordResetTokens } from './db/schema';
import { eq, and, gt } from 'drizzle-orm';
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import ResetPasswordEmail from '../app/emails/reset-password';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Salt rounds for bcrypt (we're using a simplified hash function here)
const SALT_ROUNDS = 10;

// Session cookie name
const SESSION_COOKIE_NAME = 'auth_session';

// Function to hash a password
export function hashPassword(password: string): string {
  // In a real app, use bcrypt.hashSync(password, SALT_ROUNDS)
  // This is a simplified version for demonstration
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  
  return `${salt}:${hash}`;
}

// Function to verify a password
export function verifyPassword(storedPassword: string | undefined | null, suppliedPassword: string): boolean {
  // Handle null or undefined stored password
  if (!storedPassword) {
    return false;
  }
  
  // In a real app, use bcrypt.compareSync(suppliedPassword, storedPassword)
  // This is a simplified version for demonstration
  try {
    const [salt, hash] = storedPassword.split(':');
    if (!salt || !hash) {
      return false;
    }
    
    const suppliedHash = crypto
      .pbkdf2Sync(suppliedPassword, salt, 1000, 64, 'sha512')
      .toString('hex');
    
    return hash === suppliedHash;
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
}

// Function to create a session
export async function createSession(userId: number): Promise<string> {
  // Generate a unique session token
  const sessionToken = crypto.randomBytes(32).toString('hex');
  
  // Store the session in the database
  await db.insert(sessions).values({
    userId,
    token: sessionToken,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  });
  
  return sessionToken;
}

// Function to get user by session token
export async function getUserBySessionToken(sessionToken: string) {
  const result = await db
    .select({
      id: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      isAdmin: users.isAdmin,
      isSuperAdmin: users.isSuperAdmin,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(and(
      eq(sessions.token, sessionToken),
      gt(sessions.expiresAt, new Date())
    ))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

// Function to set session cookie
export function setSessionCookie(response: NextResponse, sessionToken: string) {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: sessionToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/'
  });
  
  return response;
}

// Function to clear session cookie
export function clearSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    expires: new Date(0),
    path: '/'
  });
  
  return response;
}

// Function to get session token from cookies
export function getSessionToken(request: NextRequest) {
  return request.cookies.get(SESSION_COOKIE_NAME)?.value;
}

// Function to generate a password reset token
export async function generatePasswordResetToken(userId: number): Promise<string> {
  // Generate a token
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
  
  // Delete any existing tokens for this user
  await db.delete(passwordResetTokens).where(eq(passwordResetTokens.userId, userId));
  
  // Store the token
  await db.insert(passwordResetTokens).values({
    userId,
    token,
    expiresAt
  });
  
  return token;
}

// Function to send password reset email
export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'noreply@suckapunch.com',
      to: email,
      subject: 'Reset Your Password',
      react: ResetPasswordEmail({ resetLink }),
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Error sending reset email:', error);
    return { success: false, error };
  }
}

// Function to verify password reset token
export async function verifyPasswordResetToken(token: string) {
  const result = await db
    .select({ userId: passwordResetTokens.userId })
    .from(passwordResetTokens)
    .where(and(
      eq(passwordResetTokens.token, token),
      gt(passwordResetTokens.expiresAt, new Date())
    ))
    .limit(1);
  
  return result.length > 0 ? result[0].userId : null;
}

// Function to reset password
export async function resetPassword(userId: number, newPassword: string) {
  const hashedPassword = hashPassword(newPassword);
  
  await db.update(users)
    .set({
      passwordHash: hashedPassword,
      updatedAt: new Date()
    })
    .where(eq(users.id, userId));
  
  // Delete the token so it can't be used again
  await db.delete(passwordResetTokens).where(eq(passwordResetTokens.userId, userId));
  
  return { success: true };
}

// Function to create a new user
export async function createUser(
  email: string, 
  password: string, 
  firstName?: string, 
  lastName?: string
) {
  const hashedPassword = hashPassword(password);
  
  try {
    const result = await db.insert(users)
      .values({
        email,
        passwordHash: hashedPassword,
        firstName: firstName || null,
        lastName: lastName || null,
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        isAdmin: users.isAdmin
      });
    
    return { success: true, user: result[0] };
  } catch (error: any) {
    // Check for duplicate email constraint violation
    if (error.code === '23505') { // PostgreSQL unique constraint violation
      return { success: false, error: 'Email is already registered' };
    }
    
    throw error;
  }
}

// Function to get user by email
export async function getUserByEmail(email: string) {
  const result = await db
    .select({
      id: users.id,
      email: users.email,
      passwordHash: users.passwordHash,
      firstName: users.firstName,
      lastName: users.lastName,
      isAdmin: users.isAdmin
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

// Function to get user by ID
export async function getUserById(id: number) {
  const result = await db
    .select({
      id: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      isAdmin: users.isAdmin
    })
    .from(users)
    .where(eq(users.id, id))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
} 