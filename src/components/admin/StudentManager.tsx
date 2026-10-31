'use client';

import { useState } from 'react';
import { createStudent, deleteStudent, toggleCourseAccess } from '@/app/actions/courses';
import { UserPlus, Trash2, Shield, CheckCircle2, XCircle, Mail, Key } from 'lucide-react';

interface CourseOption {
  id: string;
  title: string;
}

interface StudentUser {
  id: string;
  name: string | null;
  email: string;
  createdAt: Date;
  courseAccess: { courseId: string }[];
}

export function StudentManager({
  students,
  courses,
}: {
  students: StudentUser[];
  courses: CourseOption[];
}) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleToggle = async (userId: string, courseId: string, currentlyHasAccess: boolean) => {
    setIsUpdating(`${userId}-${courseId}`);
    try {
      await toggleCourseAccess(userId, courseId, !currentlyHasAccess);
    } catch (err: any) {
      alert(err.message || 'Error updating permission');
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border">
        <div>
          <h2 className="text-lg font-heading font-bold text-foreground">
            Student Access & Video Permissions
          </h2>
          <p className="text-xs text-muted">
            Provision student login credentials and grant/revoke access to course videos.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(!showCreateModal)}
          className="px-3.5 py-2 rounded-lg bg-primary text-background font-bold text-xs hover:bg-accent transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <UserPlus size={14} />
          <span>{showCreateModal ? 'Close Form' : 'Add Student'}</span>
        </button>
      </div>

      {/* New Student Form */}
      {showCreateModal && (
        <div className="p-6 rounded-xl bg-card border border-primary/30 shadow-lg animate-in fade-in">
          <h3 className="text-sm font-bold text-foreground mb-4">Register New Student Account</h3>
          <form
            action={async (formData) => {
              await createStudent(formData);
              setShowCreateModal(false);
            }}
            className="grid sm:grid-cols-3 gap-4"
          >
            <div>
              <label className="block text-xs font-semibold text-muted mb-1">Student Full Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. John Doe"
                className="w-full p-2.5 rounded-lg bg-background border border-border text-xs text-foreground focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted mb-1">Student Email *</label>
              <input
                type="email"
                name="email"
                required
                placeholder="student@example.com"
                className="w-full p-2.5 rounded-lg bg-background border border-border text-xs text-foreground focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted mb-1">Temporary Password *</label>
              <input
                type="text"
                name="password"
                required
                defaultValue="StudentP6@2026"
                className="w-full p-2.5 rounded-lg bg-background border border-border text-xs text-foreground focus:border-primary outline-none font-mono"
              />
            </div>

            <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-lg bg-secondary text-xs text-muted"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-primary text-background font-bold text-xs hover:bg-accent"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Students Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-secondary/30 text-[11px] font-bold uppercase tracking-wider text-muted">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Course Video Access</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-xs">
              {students.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-muted">
                    No students registered yet. Click "Add Student" above to create an account.
                  </td>
                </tr>
              ) : (
                students.map((student) => {
                  const accessSet = new Set(student.courseAccess.map((a) => a.courseId));

                  return (
                    <tr key={student.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-foreground">
                        {student.name || 'Unnamed Student'}
                      </td>
                      <td className="py-3.5 px-4 text-muted font-mono">{student.email}</td>
                      <td className="py-3.5 px-4">
                        {courses.length === 0 ? (
                          <span className="text-[11px] text-muted italic">Create a course first</span>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {courses.map((course) => {
                              const hasAccess = accessSet.has(course.id);
                              const updatingKey = `${student.id}-${course.id}`;
                              const isThisUpdating = isUpdating === updatingKey;

                              return (
                                <button
                                  key={course.id}
                                  onClick={() => handleToggle(student.id, course.id, hasAccess)}
                                  disabled={isThisUpdating}
                                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                                    hasAccess
                                      ? 'bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20'
                                      : 'bg-secondary text-muted border border-border hover:border-muted/50'
                                  }`}
                                  title={hasAccess ? 'Click to revoke access' : 'Click to grant access'}
                                >
                                  {hasAccess ? (
                                    <CheckCircle2 size={12} className="text-green-400" />
                                  ) : (
                                    <XCircle size={12} className="text-muted" />
                                  )}
                                  <span>{course.title}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <form
                          action={async () => {
                            if (confirm(`Delete student account "${student.email}"?`)) {
                              await deleteStudent(student.id);
                            }
                          }}
                        >
                          <button
                            type="submit"
                            className="text-muted hover:text-red-400 p-1.5 rounded transition-colors"
                            title="Delete Student"
                          >
                            <Trash2 size={14} />
                          </button>
                        </form>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
