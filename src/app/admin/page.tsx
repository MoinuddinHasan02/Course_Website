import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { AdminDashboardView } from '@/components/admin/AdminDashboardView';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const session = await requireAdmin();

  // Fetch certificates
  const certificates = await prisma.certificate.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Fetch courses with their videos
  const courses = await prisma.course.findMany({
    include: {
      videos: {
        orderBy: { order: 'asc' },
      },
    },
    orderBy: { order: 'asc' },
  });

  // Fetch students with their course access
  const students = await prisma.user.findMany({
    where: { role: 'STUDENT' },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      courseAccess: {
        select: { courseId: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <AdminDashboardView
      courses={courses}
      students={students}
      certificates={certificates}
      adminEmail={session.email}
    />
  );
}
