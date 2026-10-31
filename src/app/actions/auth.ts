'use server';

import { prisma } from '@/lib/prisma';
import { createSession, logout } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';
import { checkPromptInjection, LoginSchema } from '@/lib/security/prompt-defense';
import { compare, hash } from 'bcryptjs';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginUser(prevState: any, formData: FormData) {
  const reqHeaders = await headers();
  const forwarded = reqHeaders.get('x-forwarded-for') || '127.0.0.1';
  const clientIp = forwarded.split(',')[0].trim();

  // 1. Rate Limiting Check (Max 15 attempts per 60s per IP)
  const rlKey = `auth_login:${clientIp}`;
  const rlResult = rateLimit(rlKey, { limit: 15, windowMs: 60 * 1000 });
  if (!rlResult.success) {
    return {
      error: `Too many login attempts. Please wait ${rlResult.retryAfter} seconds before trying again.`,
    };
  }

  const rawEmail = formData.get('email');
  const rawPassword = formData.get('password');

  // 2. Prompt Injection Defense
  if (typeof rawEmail === 'string' && checkPromptInjection(rawEmail).isMalicious) {
    return { error: 'Invalid input format detected.' };
  }

  // 3. Schema Validation
  const parseResult = LoginSchema.safeParse({
    email: rawEmail,
    password: rawPassword,
  });

  if (!parseResult.success) {
    return { error: parseResult.error.issues[0]?.message || 'Invalid credentials' };
  }

  const { email, password } = parseResult.data;

  // 4. Find user in database with descriptive error reporting
  let user: any = null;
  try {
    user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
  } catch (dbErr: any) {
    console.error('Database connection error in login:', dbErr);
    // Sanitize error message to hide connection credentials while revealing the root cause
    const rawMsg = dbErr?.message || 'Connection failed';
    const sanitizedMsg = rawMsg.replace(/:\/\/[^@]+@/, '://[credentials]@').slice(0, 300);
    return {
      error: `Database connection error: ${sanitizedMsg}`,
    };
  }

  if (!user) {
    return { error: 'Invalid email or password.' };
  }

  if (user.status !== 'ACTIVE') {
    return { error: 'Your account is suspended. Please contact the administrator.' };
  }

  const isValid = await compare(password, user.password);
  if (!isValid) {
    return { error: 'Invalid email or password.' };
  }

  // 5. Establish secure session
  await createSession({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as 'ADMIN' | 'STUDENT',
  });

  // 6. Redirect based on role
  if (user.role === 'ADMIN') {
    redirect('/admin');
  } else {
    redirect('/student');
  }
}

export async function logoutUser() {
  await logout();
  redirect('/login');
}
