"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MessageCircle, Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass-dark border-b border-border py-3" : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center font-bold text-background font-heading">
            A
          </div>
          <span className="font-heading font-bold text-xl tracking-tight hidden sm:block">
            AEJAZ TRAINING
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#why" className="text-sm font-medium hover:text-primary transition-colors">Why This Course</Link>
          <Link href="#curriculum" className="text-sm font-medium hover:text-primary transition-colors">Curriculum</Link>
          <Link href="#trainer" className="text-sm font-medium hover:text-primary transition-colors">About Trainer</Link>
          <Link href="/verify" className="text-sm font-medium text-green-400 hover:text-primary transition-colors">Verify Certificate</Link>
          <a
            href="https://forms.gle/qeDv1BP5acFm2N4j6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-background font-bold text-sm hover:bg-accent transition-all transform hover:scale-105"
          >
            <MessageCircle size={18} />
            <span>Enroll Now</span>
          </a>
        </div>

        {/* Mobile Navigation Toggle & Enroll Button */}
        <div className="flex md:hidden items-center gap-4">
          <a
            href="https://forms.gle/qeDv1BP5acFm2N4j6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-background font-bold text-xs hover:bg-accent transition-all"
          >
            <span>Enroll</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground p-1"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-2xl p-6 flex flex-col gap-6">
          <Link href="#why" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold hover:text-primary transition-colors">Why This Course</Link>
          <Link href="#curriculum" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold hover:text-primary transition-colors">Curriculum</Link>
          <Link href="#trainer" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold hover:text-primary transition-colors">About Trainer</Link>
          <Link href="/verify" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-green-400 hover:text-primary transition-colors">Verify Certificate</Link>
        </div>
      )}
    </nav>
  );
}
