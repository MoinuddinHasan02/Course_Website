'use server';

import { prisma } from '@/lib/prisma';
import { login, logout } from '@/lib/auth';
import { generateHMAC } from '@/lib/security';
import { compare, hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function adminLogin(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) return { error: 'Missing fields' };

  // For the very first run, create the admin user if none exists
  let admin = await prisma.user.findUnique({ where: { email } });
  
  if (!admin) {
    const userCount = await prisma.user.count();
    if (userCount === 0) {
      // Create first admin
      const hashedPassword = await hash(password, 10);
      admin = await prisma.user.create({
        data: { email, password: hashedPassword }
      });
    } else {
      return { error: 'Invalid credentials' };
    }
  }

  const isValid = await compare(password, admin.password);
  if (!isValid) return { error: 'Invalid credentials' };

  await login(admin.id);
  redirect('/admin');
}

export async function adminLogout() {
  await logout();
  redirect('/admin/login');
}

export async function issueCertificate(formData: FormData) {
  const studentId = formData.get('studentId') as string;
  const courseId = formData.get('courseId') as string;
  const recipientName = formData.get('recipientName') as string;

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
    }
  });

  revalidatePath('/admin');
}

export async function deleteCertificate(id: string) {
  await prisma.certificate.delete({
    where: { id }
  });
  revalidatePath('/admin');
}

export async function updateCertificate(id: string, formData: FormData) {
  const studentId = formData.get('studentId') as string;
  const courseId = formData.get('courseId') as string;
  const recipientName = formData.get('recipientName') as string;
  const issuedAtString = formData.get('issuedAt') as string;

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
    }
  });

  revalidatePath('/admin');
  redirect('/admin');
}
