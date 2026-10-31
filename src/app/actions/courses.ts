'use server';

import { prisma } from '@/lib/prisma';
import { requireAdmin, requireAuth } from '@/lib/auth';
import { rateLimit, RATE_LIMIT_PROFILES, getClientIp } from '@/lib/rate-limit';
import {
  sanitizeInput,
  CourseSchema,
  VideoSchema,
  StudentCreateSchema,
} from '@/lib/security/prompt-defense';
import { hash } from 'bcryptjs';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

// ==========================================
// COURSE MANAGEMENT (ADMIN)
// ==========================================

export async function createCourse(formData: FormData) {
  await requireAdmin();
  const reqHeaders = await headers();
  const clientIp = getClientIp(reqHeaders);

  const rl = rateLimit(`admin_mutate:${clientIp}`, RATE_LIMIT_PROFILES.MUTATION);
  if (!rl.success) {
    throw new Error(`Rate limit exceeded. Please wait ${rl.retryAfter}s.`);
  }

  const rawData = {
    title: sanitizeInput(formData.get('title')),
    slug: sanitizeInput(formData.get('slug')),
    description: sanitizeInput(formData.get('description')),
    level: sanitizeInput(formData.get('level')) || 'All Levels',
    duration: sanitizeInput(formData.get('duration')),
  };

  const parsed = CourseSchema.safeParse(rawData);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || 'Validation failed');
  }

  // Check slug uniqueness
  const existing = await prisma.course.findUnique({
    where: { slug: parsed.data.slug },
  });
  if (existing) {
    throw new Error('A course with this URL slug already exists.');
  }

  await prisma.course.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      description: parsed.data.description,
      level: parsed.data.level,
      duration: parsed.data.duration,
    },
  });

  revalidatePath('/admin');
  revalidatePath('/student');
}

export async function deleteCourse(courseId: string) {
  await requireAdmin();
  await prisma.course.delete({
    where: { id: courseId },
  });
  revalidatePath('/admin');
  revalidatePath('/student');
}

// ==========================================
// VIDEO MANAGEMENT (ADMIN)
// ==========================================

export async function addVideo(formData: FormData) {
  await requireAdmin();
  const reqHeaders = await headers();
  const clientIp = getClientIp(reqHeaders);

  const rl = rateLimit(`admin_mutate:${clientIp}`, RATE_LIMIT_PROFILES.MUTATION);
  if (!rl.success) {
    throw new Error(`Rate limit exceeded. Please wait ${rl.retryAfter}s.`);
  }

  const courseId = sanitizeInput(formData.get('courseId'));
  const title = sanitizeInput(formData.get('title'));
  const description = sanitizeInput(formData.get('description'));
  const videoUrl = sanitizeInput(formData.get('videoUrl'));
  const duration = sanitizeInput(formData.get('duration'));
  const order = parseInt(formData.get('order') as string, 10) || 0;
  const isFreePreview = formData.get('isFreePreview') === 'true';

  const parsed = VideoSchema.safeParse({
    courseId,
    title,
    description,
    videoUrl,
    duration,
    order,
    isFreePreview,
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || 'Validation failed');
  }

  await prisma.video.create({
    data: parsed.data,
  });

  revalidatePath('/admin');
  revalidatePath(`/student/course/${courseId}`);
}

export async function deleteVideo(videoId: string) {
  await requireAdmin();
  await prisma.video.delete({
    where: { id: videoId },
  });
  revalidatePath('/admin');
}

// ==========================================
// STUDENT & ACCESS MANAGEMENT (ADMIN)
// ==========================================

export async function createStudent(formData: FormData) {
  await requireAdmin();
  const reqHeaders = await headers();
  const clientIp = getClientIp(reqHeaders);

  const rl = rateLimit(`admin_mutate:${clientIp}`, RATE_LIMIT_PROFILES.MUTATION);
  if (!rl.success) {
    throw new Error(`Rate limit exceeded. Please wait ${rl.retryAfter}s.`);
  }

  const rawData = {
    name: sanitizeInput(formData.get('name')),
    email: sanitizeInput(formData.get('email')).toLowerCase(),
    password: formData.get('password') as string,
  };

  const parsed = StudentCreateSchema.safeParse(rawData);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || 'Invalid student data');
  }

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (existing) {
    throw new Error('A user with this email already exists.');
  }

  const hashedPassword = await hash(parsed.data.password, 10);

  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      password: hashedPassword,
      role: 'STUDENT',
      status: 'ACTIVE',
    },
  });

  revalidatePath('/admin');
}

export async function deleteStudent(studentId: string) {
  await requireAdmin();
  await prisma.user.delete({
    where: { id: studentId },
  });
  revalidatePath('/admin');
}

export async function toggleCourseAccess(userId: string, courseId: string, grant: boolean) {
  await requireAdmin();

  if (grant) {
    // Upsert access
    await prisma.courseAccess.upsert({
      where: {
        userId_courseId: { userId, courseId },
      },
      create: {
        userId,
        courseId,
      },
      update: {},
    });
  } else {
    // Revoke access
    await prisma.courseAccess.deleteMany({
      where: {
        userId,
        courseId,
      },
    });
  }

  revalidatePath('/admin');
  revalidatePath('/student');
}
