'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlayCircle, Clock, CheckCircle, ChevronLeft, Shield, Video as VideoIcon } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string;
  duration: string | null;
  order: number;
  isFreePreview: boolean;
}

interface ClassroomPlayerProps {
  courseTitle: string;
  courseSlug: string;
  videos: VideoItem[];
  studentEmail: string;
}

/**
 * Transforms common video URLs (YouTube, Vimeo, Google Drive, MP4) into proper embeddable iframe or video sources
 */
function getEmbedUrl(rawUrl: string): { type: 'iframe' | 'video'; src: string } {
  const url = rawUrl.trim();

  // YouTube standard watch or youtu.be shortlink
  if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else {
      const match = url.match(/[?&]v=([^&]+)/);
      videoId = match ? match[1] : '';
    }
    return {
      type: 'iframe',
      src: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`,
    };
  }

  // YouTube embed direct
  if (url.includes('youtube.com/embed/')) {
    return { type: 'iframe', src: url };
  }

  // Vimeo
  if (url.includes('vimeo.com/')) {
    const vimeoId = url.split('vimeo.com/')[1].split('?')[0].split('/')[0];
    return {
      type: 'iframe',
      src: `https://player.vimeo.com/video/${vimeoId}`,
    };
  }

  // Google Drive preview
  if (url.includes('drive.google.com/file/d/')) {
    const fileId = url.split('drive.google.com/file/d/')[1].split('/')[0];
    return {
      type: 'iframe',
      src: `https://drive.google.com/file/d/${fileId}/preview`,
    };
  }

  // Fallback to native MP4 / direct stream
  return { type: 'video', src: url };
}

export function ClassroomPlayer({ courseTitle, courseSlug, videos, studentEmail }: ClassroomPlayerProps) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const currentVideo = videos[activeVideoIndex] || null;

  if (!currentVideo) {
    return (
      <div className="p-12 text-center rounded-2xl bg-card border border-border">
        <VideoIcon size={40} className="mx-auto text-muted mb-3" />
        <h3 className="text-lg font-bold text-foreground mb-1">No Videos in this Course Yet</h3>
        <p className="text-xs text-muted mb-4">
          The instructor has not uploaded lectures to this curriculum yet.
        </p>
        <Link
          href="/student"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary text-foreground text-xs font-semibold hover:bg-secondary/80"
        >
          <ChevronLeft size={16} /> Back to Courses
        </Link>
      </div>
    );
  }

  const { type, src } = getEmbedUrl(currentVideo.videoUrl);

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Video Viewport (2 Cols on lg) */}
      <div className="lg:col-span-2 space-y-4">
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-border shadow-2xl">
          {type === 'iframe' ? (
            <iframe
              src={src}
              title={currentVideo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <video
              src={src}
              controls
              controlsList="nodownload"
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          )}

          {/* Dynamic Anti-Screen-Capture Watermark */}
          <div className="absolute top-3 right-3 pointer-events-none opacity-30 select-none text-[10px] font-mono text-white/70 bg-black/50 px-2 py-0.5 rounded">
            Authorized: {studentEmail}
          </div>
        </div>

        {/* Video Info Header */}
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Lesson {activeVideoIndex + 1} of {videos.length}
            </span>
            {currentVideo.duration && (
              <span className="text-xs text-muted flex items-center gap-1">
                <Clock size={12} /> {currentVideo.duration}
              </span>
            )}
          </div>
          <h1 className="text-2xl font-heading font-black text-foreground mb-3">
            {currentVideo.title}
          </h1>
          {currentVideo.description && (
            <p className="text-sm text-muted leading-relaxed whitespace-pre-wrap">
              {currentVideo.description}
            </p>
          )}
        </div>
      </div>

      {/* Playlist / Lesson Sidebar (1 Col on lg) */}
      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
            <h2 className="text-sm font-heading font-bold text-foreground">Course Playlist</h2>
            <span className="text-xs text-muted">{videos.length} lessons</span>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {videos.map((vid, idx) => {
              const isActive = idx === activeVideoIndex;
              return (
                <button
                  key={vid.id}
                  onClick={() => setActiveVideoIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-primary/10 border border-primary/30 text-primary'
                      : 'bg-secondary/40 hover:bg-secondary border border-transparent text-muted hover:text-foreground'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isActive ? (
                      <PlayCircle size={16} className="text-primary" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-muted/50 flex items-center justify-center text-[10px] font-bold">
                        {idx + 1}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold truncate ${isActive ? 'text-primary font-bold' : ''}`}>
                      {vid.title}
                    </p>
                    {vid.duration && (
                      <p className="text-[10px] text-muted mt-0.5">{vid.duration}</p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-secondary/30 border border-border text-center">
          <Shield size={20} className="mx-auto text-primary mb-1.5" />
          <p className="text-xs font-bold text-foreground">Secure Learning Portal</p>
          <p className="text-[11px] text-muted mt-0.5">
            Content is licensed to {studentEmail}. Redistribution is strictly monitored.
          </p>
        </div>
      </div>
    </div>
  );
}
