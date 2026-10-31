"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Trophy, Target, MessageCircle, PlayCircle, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Precision Blueprint / Grid Ambient Background */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,#000_70%,transparent_100%)] -z-10 opacity-70" 
        aria-hidden="true"
      />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-bold mb-6 tracking-wider uppercase">
            <Trophy size={14} className="text-primary" />
            <span>11+ Years EPC & Oil & Gas Experience</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight leading-[1.08] mb-6 text-foreground [text-wrap:balance]">
            Primavera P6 <br />
            <span className="gold-gradient">Training for Planning Engineers</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted font-normal mb-8 leading-relaxed max-w-xl [text-wrap:pretty]">
            Master Real-World Project Planning, CPM Scheduling & Forensic Delay Analysis in 45 Days. 
            Learn directly from a Senior Planning Engineer with ADNOC & Aramco project credentials.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <motion.a 
              href="https://forms.gle/qeDv1BP5acFm2N4j6" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="px-8 py-4 bg-primary text-background font-black rounded-xl hover:bg-accent transition-colors flex items-center justify-center gap-2 text-base shadow-[0_4px_24px_rgba(234,179,8,0.25)] cursor-pointer"
            >
              <span>Enroll in Batch</span>
              <ChevronRight size={18} />
            </motion.a>

            <motion.a 
              href="https://wa.me/917829449074" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="px-7 py-4 bg-secondary/80 border border-border text-foreground font-bold rounded-xl hover:bg-secondary hover:border-muted/50 transition-colors flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <MessageCircle size={18} className="text-primary" />
              <span>WhatsApp Inquiries</span>
            </motion.a>
          </div>

          {/* Classroom Quick Link */}
          <div className="mb-8">
            <Link 
              href="/login" 
              className="inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-primary transition-colors group"
            >
              <PlayCircle size={15} className="text-primary group-hover:scale-110 transition-transform" />
              <span>Already enrolled? Sign in to Student Video Classroom &rarr;</span>
            </Link>
          </div>

          <div className="flex items-center gap-8 text-muted pt-6 border-t border-border/60">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-foreground font-mono">11+</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted">Years Exp</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex flex-col">
              <span className="text-2xl font-black text-foreground font-mono">45</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted">Days Track</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex flex-col">
              <span className="text-2xl font-black text-foreground font-mono">ADNOC</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted">Case Studies</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative aspect-square max-w-lg mx-auto w-full"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <div className="absolute inset-0 border border-primary/20 rounded-3xl -z-10 translate-x-3 translate-y-3" />
          <div className="bg-card w-full h-full rounded-3xl overflow-hidden border border-border relative shadow-2xl">
            <Image
              src="/trainer.png" 
              alt="Mohammed Aejaz Ahmed"
              fill
              className="object-cover hover:scale-102 transition-transform duration-500"
              priority
            />
            
            {/* Overlay Badge */}
            <div className="absolute bottom-6 left-6 right-6 z-20 bg-background/85 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center justify-between shadow-lg">
              <div>
                <p className="font-heading font-black text-base text-foreground">Mohammed Aejaz Ahmed</p>
                <p className="text-xs text-primary font-bold">Planning & Project Control Engineer</p>
              </div>
              <Target className="text-primary" size={26} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
