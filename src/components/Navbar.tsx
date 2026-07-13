"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "glass-dark border-b border-border py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center font-bold text-background font-heading">
            A
          </div>
          <span className="font-heading font-bold text-xl tracking-tight hidden sm:block">
            AEJAZ TRAINING
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#why" className="text-sm font-medium hover:text-primary transition-colors">Why This Course</Link>
          <Link href="#curriculum" className="text-sm font-medium hover:text-primary transition-colors">Curriculum</Link>
          <Link href="#trainer" className="text-sm font-medium hover:text-primary transition-colors">About Trainer</Link>
          <Link href="/verify" className="text-sm font-medium text-green-400 hover:text-primary transition-colors">Verify Certificate</Link>
        </div>

        <Link
          href="https://forms.gle/qeDv1BP5acFm2N4j6"
          target="_blank"
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-background font-bold text-sm hover:bg-accent transition-all transform hover:scale-105"
        >
          <MessageCircle size={18} />
          <span>Enroll Now</span>
        </Link>
      </div>
    </nav>
  );
}
