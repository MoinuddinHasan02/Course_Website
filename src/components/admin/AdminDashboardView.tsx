'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CourseManager } from './CourseManager';
import { StudentManager } from './StudentManager';
import { DeleteButton } from '@/components/DeleteButton';
import { issueCertificate, adminLogout } from '@/app/actions/admin';
import { Video, Users, Award, LogOut, ExternalLink, ShieldCheck } from 'lucide-react';

interface AdminDashboardViewProps {
  courses: any[];
  students: any[];
  certificates: any[];
  adminEmail: string;
}

export function AdminDashboardView({
  courses,
  students,
  certificates,
  adminEmail,
}: AdminDashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'courses' | 'students' | 'certificates'>('courses');

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      {/* Admin Top Navigation */}
      <header className="border-b border-border bg-card/70 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-background text-sm font-heading">
                A
              </div>
              <span className="font-heading font-black tracking-tight text-lg text-foreground">
                AEJAZ <span className="text-primary font-normal text-xs uppercase tracking-widest">Admin Control</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/student"
              className="text-xs text-muted hover:text-foreground hidden sm:flex items-center gap-1"
            >
              <ExternalLink size={13} />
              Student View
            </Link>

            <span className="text-xs font-mono text-muted hidden md:inline-block">
              {adminEmail}
            </span>

            <form action={adminLogout}>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-semibold transition-colors cursor-pointer"
              >
                <LogOut size={13} />
                <span>Logout</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 pt-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-4">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'courses'
                ? 'bg-primary text-background shadow-md shadow-primary/20'
                : 'bg-card text-muted hover:text-foreground border border-border'
            }`}
          >
            <Video size={15} />
            <span>Courses & Videos ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'students'
                ? 'bg-primary text-background shadow-md shadow-primary/20'
                : 'bg-card text-muted hover:text-foreground border border-border'
            }`}
          >
            <Users size={15} />
            <span>Student Access Permissions ({students.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'certificates'
                ? 'bg-primary text-background shadow-md shadow-primary/20'
                : 'bg-card text-muted hover:text-foreground border border-border'
            }`}
          >
            <Award size={15} />
            <span>Certificates ({certificates.length})</span>
          </button>
        </div>

        {/* Tab 1: Courses & Videos */}
        {activeTab === 'courses' && <CourseManager courses={courses} />}

        {/* Tab 2: Student Permissions */}
        {activeTab === 'students' && (
          <StudentManager
            students={students}
            courses={courses.map((c) => ({ id: c.id, title: c.title }))}
          />
        )}

        {/* Tab 3: Certificates */}
        {activeTab === 'certificates' && (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 bg-card p-6 rounded-2xl border border-border shadow-sm h-fit">
              <h2 className="text-base font-heading font-bold mb-4 text-foreground flex items-center gap-2">
                <Award size={18} className="text-primary" />
                Issue Certificate
              </h2>
              <form action={issueCertificate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-muted">Recipient Name</label>
                  <input
                    type="text"
                    name="recipientName"
                    required
                    placeholder="Student Full Name"
                    className="w-full p-2.5 rounded-lg bg-background border border-border text-xs text-foreground focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-muted">
                    Student ID / Roll No
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    required
                    placeholder="e.g. AEJAZ-2026-001"
                    className="w-full p-2.5 rounded-lg bg-background border border-border text-xs text-foreground focus:border-primary outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-muted">Course ID</label>
                  <input
                    type="text"
                    name="courseId"
                    defaultValue="PRIMAVERA-P6"
                    required
                    className="w-full p-2.5 rounded-lg bg-background border border-border text-xs text-foreground focus:border-primary outline-none font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-primary text-background font-bold text-xs rounded-xl hover:bg-accent transition-colors shadow-lg shadow-primary/20"
                >
                  Generate & Issue
                </button>
              </form>
            </div>

            <div className="md:col-span-2 bg-card p-6 rounded-2xl border border-border shadow-sm">
              <h2 className="text-base font-heading font-bold mb-4 text-foreground">
                Issued Certificates ({certificates.length})
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border text-[11px] font-bold uppercase tracking-wider text-muted">
                      <th className="py-3 px-4">Recipient</th>
                      <th className="py-3 px-4">Course</th>
                      <th className="py-3 px-4">Issued On</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-xs">
                    {certificates.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-muted">
                          No certificates issued yet.
                        </td>
                      </tr>
                    ) : (
                      certificates.map((cert) => (
                        <tr key={cert.id} className="hover:bg-secondary/20">
                          <td className="py-3 px-4 font-semibold text-foreground">
                            {cert.recipientName}
                            <div className="text-[10px] text-muted font-mono">{cert.studentId}</div>
                          </td>
                          <td className="py-3 px-4 text-muted">{cert.courseId}</td>
                          <td className="py-3 px-4 text-muted">
                            {new Date(cert.issuedAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end gap-2 items-center">
                              <Link
                                href={`/verify/${cert.studentId}`}
                                target="_blank"
                                className="text-primary hover:underline font-bold text-[11px]"
                              >
                                Verify
                              </Link>
                              <a
                                href={`/api/certificates/generate/${cert.studentId}`}
                                target="_blank"
                                className="text-muted hover:text-foreground text-[11px]"
                              >
                                Download
                              </a>
                              <Link
                                href={`/admin/edit/${cert.id}`}
                                className="text-muted hover:text-foreground text-[11px]"
                              >
                                Edit
                              </Link>
                              <DeleteButton id={cert.id} />
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
