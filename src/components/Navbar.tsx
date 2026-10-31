"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { MessageCircle, Menu, X, PlayCircle, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className={cn(
        "fixed z-50 transition-all duration-300 ease-out left-1/2 -translate-x-1/2",
        scrolled 
          ? "top-4 w-[95%] max-w-5xl bg-background/80 backdrop-blur-2xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.3)] rounded-full py-2.5 px-6" 
          : "top-0 w-full max-w-7xl bg-transparent py-5 px-6"
      )}
    >
      <div className="flex items-center justify-between w-full">
        <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setMobileMenuOpen(false)}>
          <motion.div 
            layout
            className={cn(
              "bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center font-bold text-background font-heading transition-all duration-300",
              scrolled ? "w-8 h-8 text-sm" : "w-9 h-9 text-base shadow-lg shadow-primary/20"
            )}
          >
            A
          </motion.div>
          <motion.span 
            layout
            className={cn(
              "font-heading font-black tracking-tight hidden sm:block transition-all duration-300 group-hover:text-primary",
              scrolled ? "text-base" : "text-lg"
            )}
          >
            AEJAZ TRAINING
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="#why" className="text-xs font-semibold text-muted hover:text-foreground transition-colors">
            Why This Course
          </Link>
          <Link href="#curriculum" className="text-xs font-semibold text-muted hover:text-foreground transition-colors">
            Curriculum
          </Link>
          <Link href="#trainer" className="text-xs font-semibold text-muted hover:text-foreground transition-colors">
            About Trainer
          </Link>
          <Link href="/verify" className="text-xs font-bold text-green-400 hover:text-green-300 transition-colors">
            Verify Certificate
          </Link>

          <Link
            href="/login"
            className="text-xs font-bold text-foreground/90 hover:text-primary transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/80 border border-border"
          >
            <PlayCircle size={14} className="text-primary" />
            <span>Classroom Login</span>
          </Link>

          <a
            href="https://forms.gle/qeDv1BP5acFm2N4j6"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-1.5 rounded-full bg-primary text-background font-bold hover:bg-accent transition-all transform hover:scale-105 active:scale-95 shadow-md shadow-primary/20",
              scrolled ? "px-3.5 py-1.5 text-xs" : "px-4 py-2 text-xs"
            )}
          >
            <MessageCircle size={15} />
            <span>Enroll Now</span>
          </a>
        </div>

        {/* Mobile Navigation Toggle & Enroll Button */}
        <div className="flex md:hidden items-center gap-2.5">
          <Link
            href="/login"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary border border-border text-foreground font-bold text-[11px]"
          >
            <PlayCircle size={13} className="text-primary" />
            <span>Login</span>
          </Link>
          <a
            href="https://forms.gle/qeDv1BP5acFm2N4j6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary text-background font-bold text-[11px] hover:bg-accent transition-all"
          >
            <span>Enroll</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground p-1.5 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 mt-3 p-5 bg-card/95 backdrop-blur-2xl border border-border shadow-2xl rounded-2xl flex flex-col gap-4"
          >
            <Link 
              href="#why" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-muted hover:text-foreground transition-colors"
            >
              Why This Course
            </Link>
            <Link 
              href="#curriculum" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-muted hover:text-foreground transition-colors"
            >
              Curriculum
            </Link>
            <Link 
              href="#trainer" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-muted hover:text-foreground transition-colors"
            >
              About Trainer
            </Link>
            <Link 
              href="/verify" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-green-400 hover:text-green-300 transition-colors"
            >
              Verify Certificate
            </Link>
            <Link 
              href="/login" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-primary flex items-center gap-2 pt-2 border-t border-border"
            >
              <PlayCircle size={16} />
              <span>Student Classroom Login</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
