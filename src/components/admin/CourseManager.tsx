'use client';

import { useState } from 'react';
import { createCourse, deleteCourse, addVideo, deleteVideo } from '@/app/actions/courses';
import { Plus, Trash2, Video, BookOpen, Clock, ChevronDown, ChevronUp } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  videoUrl: string;
  duration: string | null;
  order: number;
}

interface CourseItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  level: string;
  duration: string | null;
  videos: VideoItem[];
}

export function CourseManager({ courses }: { courses: CourseItem[] }) {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState(false);

  const activeCourse = courses.find((c) => c.id === selectedCourseId);

  return (
    <div className="space-y-6">
      {/* Course Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border">
        <div>
          <h2 className="text-lg font-heading font-bold text-foreground">Course & Lecture Library</h2>
          <p className="text-xs text-muted">Create courses and attach lecture video links/embeds.</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowAddCourse(!showAddCourse)}
            className="px-3.5 py-2 rounded-lg bg-primary text-background font-bold text-xs hover:bg-accent transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus size={14} />
            <span>{showAddCourse ? 'Cancel' : 'New Course'}</span>
          </button>
        </div>
      </div>

      {/* New Course Form Modal/Collapsible */}
      {showAddCourse && (
        <div className="p-6 rounded-xl bg-card border border-primary/30 shadow-lg animate-in fade-in">
          <h3 className="text-sm font-bold text-foreground mb-4">Create New Course</h3>
          <form
            action={async (formData) => {
              await createCourse(formData);
              setShowAddCourse(false);
            }}
            className="grid sm:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-xs font-semibold text-muted mb-1">Course Title</label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Primavera P6 Advanced Delay Analysis"
                className="w-full p-2.5 rounded-lg bg-background border border-border text-xs text-foreground focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted mb-1">URL Slug</label>
              <input
                type="text"
                name="slug"
                required
                placeholder="e.g. primavera-p6-delay-analysis"
                className="w-full p-2.5 rounded-lg bg-background border border-border text-xs text-foreground focus:border-primary outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-muted mb-1">Description</label>
              <textarea
                name="description"
                rows={2}
                placeholder="Detailed curriculum overview..."
                className="w-full p-2.5 rounded-lg bg-background border border-border text-xs text-foreground focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted mb-1">Difficulty Level</label>
              <select
                name="level"
                className="w-full p-2.5 rounded-lg bg-background border border-border text-xs text-foreground focus:border-primary outline-none"
              >
                <option value="All Levels">All Levels</option>
                <option value="Beginner to Intermediate">Beginner to Intermediate</option>
                <option value="Advanced / Professional">Advanced / Professional</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted mb-1">Duration Tag</label>
              <input
                type="text"
                name="duration"
                placeholder="e.g. 45 Days (30 Hours)"
                className="w-full p-2.5 rounded-lg bg-background border border-border text-xs text-foreground focus:border-primary outline-none"
              />
            </div>

            <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddCourse(false)}
                className="px-4 py-2 rounded-lg bg-secondary text-xs text-muted hover:text-foreground"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-primary text-background font-bold text-xs hover:bg-accent"
              >
                Save Course
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Courses List & Selected Course Detail */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column: Course Selector List */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Available Courses ({courses.length})</h3>
          {courses.length === 0 ? (
            <div className="p-6 text-center rounded-xl bg-card border border-border text-xs text-muted">
              No courses created yet. Click "New Course" above.
            </div>
          ) : (
            courses.map((course) => {
              const isSelected = course.id === selectedCourseId;
              return (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourseId(course.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-primary/10 border-primary/40 text-foreground font-semibold'
                      : 'bg-card border-border hover:border-border/80 text-muted hover:text-foreground'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-xs truncate font-bold">{course.title}</p>
                    <p className="text-[10px] text-muted flex items-center gap-1 mt-0.5">
                      <Video size={10} /> {course.videos.length} videos
                    </p>
                  </div>
                  <form
                    action={async (e) => {
                      if (confirm(`Delete course "${course.title}" and its videos?`)) {
                        await deleteCourse(course.id);
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="submit"
                      className="text-muted hover:text-red-400 p-1 rounded transition-colors"
                      title="Delete Course"
                    >
                      <Trash2 size={13} />
                    </button>
                  </form>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Selected Course Videos */}
        <div className="md:col-span-2">
          {activeCourse ? (
            <div className="p-6 rounded-xl bg-card border border-border space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-secondary text-primary uppercase">
                    {activeCourse.level}
                  </span>
                  <h3 className="text-lg font-heading font-bold text-foreground mt-1">
                    {activeCourse.title}
                  </h3>
                  <p className="text-xs text-muted font-mono mt-0.5">/student/course/{activeCourse.slug}</p>
                </div>

                <button
                  onClick={() => setShowAddVideo(!showAddVideo)}
                  className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary font-bold text-xs hover:bg-primary/20 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>{showAddVideo ? 'Close Form' : 'Add Video Lecture'}</span>
                </button>
              </div>

              {/* Add Video Form */}
              {showAddVideo && (
                <div className="p-4 rounded-xl bg-secondary/50 border border-border space-y-3">
                  <h4 className="text-xs font-bold text-foreground">Add Lecture to {activeCourse.title}</h4>
                  <form
                    action={async (formData) => {
                      formData.append('courseId', activeCourse.id);
                      await addVideo(formData);
                      setShowAddVideo(false);
                    }}
                    className="space-y-3"
                  >
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-muted mb-1">Lecture Title *</label>
                        <input
                          type="text"
                          name="title"
                          required
                          placeholder="e.g. Lesson 01: Critical Path Setup"
                          className="w-full p-2 rounded bg-background border border-border text-xs text-foreground focus:border-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-muted mb-1">Duration Tag</label>
                        <input
                          type="text"
                          name="duration"
                          placeholder="e.g. 24:15"
                          className="w-full p-2 rounded bg-background border border-border text-xs text-foreground focus:border-primary outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-muted mb-1">
                        Video URL / Embed Link *
                      </label>
                      <input
                        type="text"
                        name="videoUrl"
                        required
                        placeholder="https://www.youtube.com/watch?v=... or Google Drive preview or Vimeo or MP4"
                        className="w-full p-2 rounded bg-background border border-border text-xs text-foreground focus:border-primary outline-none"
                      />
                      <p className="text-[10px] text-muted mt-1">
                        Supports YouTube, Vimeo, Google Drive preview links, or secure MP4 streams.
                      </p>
                    </div>

                    <div>
                      <label className="block text-[11px] text-muted mb-1">Description / Notes</label>
                      <textarea
                        name="description"
                        rows={2}
                        placeholder="Lecture summary, downloads, or exercises..."
                        className="w-full p-2 rounded bg-background border border-border text-xs text-foreground focus:border-primary outline-none"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowAddVideo(false)}
                        className="px-3 py-1.5 rounded-lg bg-card text-xs text-muted"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg bg-primary text-background font-bold text-xs hover:bg-accent"
                      >
                        Add Video
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Videos List */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-muted">
                  Lectures in Course ({activeCourse.videos.length})
                </h4>
                {activeCourse.videos.length === 0 ? (
                  <div className="p-8 text-center rounded-xl bg-secondary/20 border border-border text-xs text-muted">
                    No video lectures uploaded yet. Click "Add Video Lecture" to add one.
                  </div>
                ) : (
                  <div className="divide-y divide-border border border-border rounded-xl overflow-hidden bg-card">
                    {activeCourse.videos.map((vid, idx) => (
                      <div
                        key={vid.id}
                        className="p-3.5 flex items-center justify-between hover:bg-secondary/30 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-4">
                          <span className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-muted">
                            {idx + 1}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-foreground truncate">{vid.title}</p>
                            <p className="text-[10px] text-muted truncate mt-0.5">{vid.videoUrl}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {vid.duration && (
                            <span className="text-[10px] text-muted flex items-center gap-1">
                              <Clock size={11} /> {vid.duration}
                            </span>
                          )}
                          <form
                            action={async () => {
                              if (confirm(`Delete lecture "${vid.title}"?`)) {
                                await deleteVideo(vid.id);
                              }
                            }}
                          >
                            <button
                              type="submit"
                              className="text-muted hover:text-red-400 p-1 rounded transition-colors"
                              title="Delete Lecture"
                            >
                              <Trash2 size={13} />
                            </button>
                          </form>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center rounded-xl bg-card border border-border text-muted text-xs">
              Select or create a course to manage videos.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
