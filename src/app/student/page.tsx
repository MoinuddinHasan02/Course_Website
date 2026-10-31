import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { logoutUser } from '@/app/actions/auth';
import Link from 'next/link';
import { PlayCircle, Lock, BookOpen, Clock, ShieldCheck, LogOut, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function StudentDashboardPage() {
  const session = await requireAuth();

  // Fetch all published courses with video counts
  const courses = await prisma.course.findMany({
    where: { published: true },
    include: {
      videos: {
        select: { id: true, duration: true },
      },
      accesses: {
        where: { userId: session.userId },
      },
    },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navigation */}
      <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-background text-sm font-heading">
                A
              </div>
              <span className="font-heading font-black tracking-tight text-lg text-foreground">
                AEJAZ <span className="text-primary font-normal text-sm">CLASSROOM</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-semibold text-foreground">{session.name || session.email}</span>
              <span className="text-[10px] text-muted uppercase tracking-wider">{session.role} ACCOUNT</span>
            </div>

            {session.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-bold hover:bg-primary/20 transition-colors"
              >
                Admin Panel
              </Link>
            )}

            <form action={logoutUser}>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/80 border border-border text-xs text-muted hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck size={14} />
            Authenticated Student Workspace
          </div>
          <h1 className="text-3xl font-heading font-black tracking-tight">Your Enrolled Courses</h1>
          <p className="text-sm text-muted mt-1 max-w-xl">
            Select an authorized course below to watch recorded video lectures, project case studies, and scheduling breakdowns.
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-card border border-border">
            <BookOpen size={40} className="mx-auto text-muted mb-3" />
            <h3 className="text-lg font-bold text-foreground mb-1">No Courses Currently Published</h3>
            <p className="text-xs text-muted">
              The administrator has not published any courses yet. Please check back shortly.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const hasAccess = course.accesses.length > 0 || session.role === 'ADMIN';
              const videoCount = course.videos.length;

              return (
                <div
                  key={course.id}
                  className={`rounded-2xl border transition-all flex flex-col justify-between overflow-hidden bg-card ${
                    hasAccess
                      ? 'border-border hover:border-primary/40 shadow-sm'
                      : 'border-border/60 opacity-80'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-secondary text-foreground uppercase tracking-wider">
                        {course.level}
                      </span>
                      {hasAccess ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-green-400 bg-green-500/10 px-2.5 py-0.5 rounded-full border border-green-500/20">
                          <CheckCircle2 size={12} />
                          Access Granted
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                          <Lock size={12} />
                          Locked
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-heading font-bold text-foreground mb-2">
                      {course.title}
                    </h2>

                    <p className="text-xs text-muted line-clamp-3 mb-6 leading-relaxed">
                      {course.description || 'Hands-on Primavera P6 mastery for Planning Engineers.'}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted pt-4 border-t border-border/60">
                      <div className="flex items-center gap-1.5">
                        <PlayCircle size={14} className="text-primary" />
                        <span>{videoCount} {videoCount === 1 ? 'Lecture' : 'Lectures'}</span>
                      </div>
                      {course.duration && (
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-muted" />
                          <span>{course.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-secondary/30 border-t border-border">
                    {hasAccess ? (
                      <Link
                        href={`/student/course/${course.slug}`}
                        className="w-full py-2.5 px-4 rounded-xl bg-primary text-background font-bold text-xs hover:bg-accent transition-all flex items-center justify-center gap-2"
                      >
                        <PlayCircle size={16} />
                        <span>Enter Classroom</span>
                      </Link>
                    ) : (
                      <div className="text-center py-1">
                        <p className="text-[11px] text-muted mb-2">
                          Access not enabled for this student account.
                        </p>
                        <a
                          href="https://wa.me/917829449074"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary font-bold hover:underline"
                        >
                          Request Access from Admin &rarr;
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
