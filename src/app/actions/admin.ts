'use server';

import { prisma } from '@/lib/prisma';
import { createSession, logout, requireAdmin } from '@/lib/auth';
import { generateHMAC } from '@/lib/security';
import { rateLimit, RATE_LIMIT_PROFILES, getClientIp } from '@/lib/rate-limit';
import { sanitizeInput, checkPromptInjection } from '@/lib/security/prompt-defense';
import { compare, hash } from 'bcryptjs';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export async function adminLogin(prevState: any, formData: FormData) {
  const reqHeaders = await headers();
  const clientIp = getClientIp(reqHeaders);

  const rl = rateLimit(`admin_login:${clientIp}`, RATE_LIMIT_PROFILES.AUTH);
  if (!rl.success) {
    return { error: `Too many attempts. Retry in ${rl.retryAfter}s.` };
  }

  const rawEmail = formData.get('email') as string;
  const rawPassword = formData.get('password') as string;

  if (!rawEmail || !rawPassword) return { error: 'Missing fields' };

  if (checkPromptInjection(rawEmail).isMalicious) {
    return { error: 'Suspicious input format detected.' };
  }

  const email = rawEmail.toLowerCase().trim();
  const password = rawPassword;

  // For the very first run, create the admin user if none exists
  let admin = await prisma.user.findUnique({ where: { email } });

  if (!admin) {
    const userCount = await prisma.user.count();
    if (userCount === 0) {
      // Create first super admin
      const hashedPassword = await hash(password, 10);
      admin = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: 'Super Admin',
          role: 'ADMIN',
        },
      });
    } else {
      return { error: 'Invalid credentials' };
    }
  }

  if (admin.role !== 'ADMIN') {
    return { error: 'Unauthorized: Admin privileges required.' };
  }

  const isValid = await compare(password, admin.password);
  if (!isValid) return { error: 'Invalid credentials' };

  await createSession({
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: 'ADMIN',
  });

  redirect('/admin');
}

export async function adminLogout() {
  await logout();
  redirect('/login');
}

export async function issueCertificate(formData: FormData) {
  await requireAdmin();
  const reqHeaders = await headers();
  const clientIp = getClientIp(reqHeaders);

  const rl = rateLimit(`cert_mutate:${clientIp}`, RATE_LIMIT_PROFILES.MUTATION);
  if (!rl.success) {
    throw new Error(`Rate limit exceeded. Try again in ${rl.retryAfter}s.`);
  }

  const studentId = sanitizeInput(formData.get('studentId'));
  const courseId = sanitizeInput(formData.get('courseId'));
  const recipientName = sanitizeInput(formData.get('recipientName'));

  if (!studentId || !courseId || !recipientName) {
    throw new Error('All fields are required');
  }

  const certHash = generateHMAC(studentId, courseId);

  await prisma.certificate.create({
    data: {
      studentId,
      courseId,
      recipientName,
      certHash,
    },
  });

  revalidatePath('/admin');
}

export async function deleteCertificate(id: string) {
  await requireAdmin();
  await prisma.certificate.delete({
    where: { id },
  });
  revalidatePath('/admin');
}

export async function updateCertificate(id: string, formData: FormData) {
  await requireAdmin();

  const studentId = sanitizeInput(formData.get('studentId'));
  const courseId = sanitizeInput(formData.get('courseId'));
  const recipientName = sanitizeInput(formData.get('recipientName'));
  const issuedAtString = sanitizeInput(formData.get('issuedAt'));

  if (!studentId || !courseId || !recipientName) {
    throw new Error('All fields are required');
  }

  const certHash = generateHMAC(studentId, courseId);
  const issuedAt = issuedAtString ? new Date(issuedAtString) : new Date();

  await prisma.certificate.update({
    where: { id },
    data: {
      studentId,
      courseId,
      recipientName,
      certHash,
      issuedAt,
    },
  });

  revalidatePath('/admin');
  redirect('/admin');
}
