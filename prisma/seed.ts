import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import crypto from 'crypto';

const prisma = new PrismaClient();
const SALT = process.env.SERVER_SECRET_SALT || 'aejaz-training-secure-salt-2026';

function generateHMAC(studentId: string, courseId: string): string {
  const data = `${studentId}:${courseId}`;
  return crypto.createHmac('sha256', SALT).update(data).digest('hex');
}

async function main() {
  console.log('Seeding initial data...');

  // 1. Create or update Admin
  const adminPassword = await hash('AdminPassword123!', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@aejaz.in' },
    update: { password: adminPassword, role: 'ADMIN' },
    create: {
      email: 'admin@aejaz.in',
      name: 'Mohammed Aejaz Ahmed',
      password: adminPassword,
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });
  console.log('Admin ready:', admin.email);

  // 2. Create or update Student
  const studentPassword = await hash('StudentPassword123!', 10);
  const student = await prisma.user.upsert({
    where: { email: 'student@aejaz.in' },
    update: { password: studentPassword, role: 'STUDENT' },
    create: {
      email: 'student@aejaz.in',
      name: 'Zaid Khan',
      password: studentPassword,
      role: 'STUDENT',
      status: 'ACTIVE',
    },
  });
  console.log('Student ready:', student.email);

  // 3. Create Course
  const course = await prisma.course.upsert({
    where: { slug: 'primavera-p6-epc-mastery' },
    update: {},
    create: {
      title: 'Primavera P6 Professional EPC Mastery',
      slug: 'primavera-p6-epc-mastery',
      description: 'Comprehensive project planning, CPM scheduling, cost loading, earned value analysis, and delay claim reporting for Oil & Gas and EPC projects.',
      level: 'Advanced / Professional',
      duration: '45 Days (30 Hours)',
      published: true,
      order: 1,
    },
  });
  console.log('Course ready:', course.title);

  // 4. Create Videos
  await prisma.video.deleteMany({ where: { courseId: course.id } });
  await prisma.video.createMany({
    data: [
      {
        courseId: course.id,
        title: '01. EPC Scheduling & Work Breakdown Structure (WBS)',
        description: 'Introduction to turnkey EPC project phases, contractual milestones, and hierarchical WBS dictionary construction.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '28:15',
        order: 1,
        isFreePreview: true,
      },
      {
        courseId: course.id,
        title: '02. Configuring Enterprise Project Structure (EPS) & Calendars',
        description: 'How to configure custom 6-day and 7-day calendars, shutdown shifts, and resource units.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '35:40',
        order: 2,
        isFreePreview: false,
      },
      {
        courseId: course.id,
        title: '03. Critical Path Method (CPM) & Logic Relationships',
        description: 'Setting Finish-to-Start (FS), Start-to-Start (SS) with lags, resolving negative float, and schedule integrity checks.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '42:10',
        order: 3,
        isFreePreview: false,
      },
      {
        courseId: course.id,
        title: '04. Forensic Delay Analysis & Time Impact Analysis (TIA)',
        description: 'ADNOC & Aramco case study: isolating excusable vs non-excusable delays and constructing formal delay claims.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '50:20',
        order: 4,
        isFreePreview: false,
      },
    ],
  });
  console.log('Videos created.');

  // 5. Grant Student Access to the Course
  await prisma.courseAccess.upsert({
    where: {
      userId_courseId: { userId: student.id, courseId: course.id },
    },
    update: {},
    create: {
      userId: student.id,
      courseId: course.id,
    },
  });
  console.log('Course access granted to student.');

  // 6. Create sample certificate
  const certHash = generateHMAC('AEJAZ-2026-001', 'PRIMAVERA-P6');
  await prisma.certificate.deleteMany({ where: { studentId: 'AEJAZ-2026-001' } });
  await prisma.certificate.create({
    data: {
      studentId: 'AEJAZ-2026-001',
      courseId: 'PRIMAVERA-P6',
      recipientName: 'Zaid Khan',
      certHash,
    },
  });
  console.log('Sample certificate seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
