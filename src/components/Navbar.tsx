"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { MessageCircle, Menu, X } from "lucide-react";
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
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "fixed z-50 transition-all duration-500 ease-out left-1/2 -translate-x-1/2",
        scrolled 
          ? "top-4 w-[95%] max-w-5xl bg-background/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full py-2.5 px-6" 
          : "top-0 w-full max-w-7xl bg-transparent py-5 px-6"
      )}
    >
      <div className="flex items-center justify-between w-full">
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setMobileMenuOpen(false)}>
          <motion.div 
            layout
            className={cn(
              "bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center font-bold text-background font-heading transition-all duration-300",
              scrolled ? "w-8 h-8 text-sm" : "w-10 h-10 text-base shadow-lg shadow-primary/20"
            )}
          >
            A
          </motion.div>
          <motion.span 
            layout
            className={cn(
              "font-heading font-bold tracking-tight hidden sm:block transition-all duration-300 group-hover:text-primary",
              scrolled ? "text-lg" : "text-xl"
            )}
          >
            AEJAZ TRAINING
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7">
          <Link href="#why" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">Why This Course</Link>
          <Link href="#curriculum" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">Curriculum</Link>
          <Link href="#trainer" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">About Trainer</Link>
          <Link href="/verify" className="text-sm font-bold text-green-400 hover:text-green-300 transition-colors">Verify Certificate</Link>
          <a
            href="https://forms.gle/qeDv1BP5acFm2N4j6"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-2 rounded-full bg-primary text-background font-bold hover:bg-accent transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20",
              scrolled ? "px-4 py-2 text-xs" : "px-5 py-2.5 text-sm"
            )}
          >
            <MessageCircle size={scrolled ? 16 : 18} />
            <span>Enroll Now</span>
          </a>
        </div>

        {/* Mobile Navigation Toggle & Enroll Button */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href="https://forms.gle/qeDv1BP5acFm2N4j6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-background font-bold text-xs hover:bg-accent transition-all"
          >
            <span>Enroll</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground p-2 rounded-full hover:bg-white/10 transition-colors"
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
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden absolute top-full left-0 right-0 mt-4 bg-background/80 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-2xl p-6 flex flex-col gap-5 overflow-hidden"
          >
            <Link href="#why" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors">Why This Course</Link>
            <Link href="#curriculum" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors">Curriculum</Link>
            <Link href="#trainer" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors">About Trainer</Link>
            <Link href="/verify" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-green-400 hover:text-green-300 transition-colors">Verify Certificate</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
