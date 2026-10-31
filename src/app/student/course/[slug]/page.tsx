import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { ClassroomPlayer } from '@/components/ClassroomPlayer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Lock, MessageCircle, ShieldAlert } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function StudentCoursePage({ params }: PageProps) {
  const session = await requireAuth();
  const { slug } = await params;

  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      videos: {
        orderBy: { order: 'asc' },
      },
      accesses: {
        where: { userId: session.userId },
      },
    },
  });

  if (!course) {
    notFound();
  }

  const isAuthorized = course.accesses.length > 0 || session.role === 'ADMIN';

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      {/* Top Banner Navigation */}
      <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-30 mb-8">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/student"
            className="flex items-center gap-2 text-xs font-semibold text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to All Courses</span>
          </Link>

          <span className="text-xs font-mono text-muted hidden sm:inline-block">
            Student: {session.email}
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        {isAuthorized ? (
          <ClassroomPlayer
            courseTitle={course.title}
            courseSlug={course.slug}
            videos={course.videos}
            studentEmail={session.email}
          />
        ) : (
          <div className="max-w-lg mx-auto mt-12 p-8 rounded-3xl bg-card border border-border text-center shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-4">
              <Lock size={28} />
            </div>

            <h1 className="text-2xl font-heading font-black text-foreground mb-2">
              Course Access Locked
            </h1>

            <p className="text-sm text-muted mb-6 leading-relaxed">
              You are signed in as <strong>{session.email}</strong>, but access to{' '}
              <span className="text-foreground font-semibold">{course.title}</span> has not been enabled by the administrator yet.
            </p>

            <div className="space-y-3">
              <a
                href="https://wa.me/917829449074"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-primary text-background font-bold text-sm hover:bg-accent transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                <span>Contact Admin on WhatsApp</span>
              </a>

              <Link
                href="/student"
                className="w-full py-2.5 px-4 rounded-xl bg-secondary text-foreground font-semibold text-xs hover:bg-secondary/80 transition-all flex items-center justify-center"
              >
                Return to Dashboard
              </Link>
            </div>

            <div className="mt-6 pt-5 border-t border-border flex items-center justify-center gap-1.5 text-xs text-muted">
              <ShieldAlert size={14} className="text-amber-400" />
              <span>Strict Role-Based Authorization Enforced</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
