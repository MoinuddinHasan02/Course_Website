"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck, Trophy, Target, MessageCircle } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6 tracking-wider uppercase">
            <Trophy size={14} />
            11+ Years EPC & Oil & Gas Experience
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter leading-[1.1] mb-6">
            Primavera P6 <br />
            <span className="gold-gradient">Training for Planning Engineers</span>
          </h1>
          
          <p className="text-xl text-muted font-medium mb-8 leading-relaxed max-w-xl">
            Master Real Project Planning, Scheduling & Delay Analysis in 45 Days. 
            Learn from a leading expert with ADNOC & Aramco project experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a 
              href="https://forms.gle/qeDv1BP5acFm2N4j6" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-primary text-background font-black rounded-xl hover:bg-accent transition-all flex items-center justify-center gap-2 text-lg shadow-[0_0_30px_rgba(234,179,8,0.3)]"
            >
              Enroll Now
              <ChevronRight size={20} />
            </a>
            <a 
              href="https://wa.me/917829449074" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 glass text-foreground font-bold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-lg"
            >
              <MessageCircle size={20} className="text-primary" />
              Message Now
            </a>
          </div>

          <div className="flex items-center gap-8 text-muted">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-foreground">11+</span>
              <span className="text-[10px] uppercase font-bold tracking-widest">Exp Years</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex flex-col">
              <span className="text-2xl font-black text-foreground">45</span>
              <span className="text-[10px] uppercase font-bold tracking-widest">Day Path</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex flex-col">
              <span className="text-2xl font-black text-foreground">Live</span>
              <span className="text-[10px] uppercase font-bold tracking-widest">Training</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-square"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <div className="absolute inset-0 border-2 border-primary/20 rounded-3xl -z-10 translate-x-4 translate-y-4" />
          <div className="bg-card w-full h-full rounded-3xl overflow-hidden border border-border relative">
            <Image
              src="/trainer.png" 
              alt="Mohammed Aejaz Ahmed"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              priority
            />
            {/* Overlay Badges */}
            <div className="absolute bottom-8 left-8 right-8 z-20 glass p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="font-heading font-black text-lg">Mohammed Aejaz Ahmed</p>
                <p className="text-xs text-primary font-bold">Planning & Project Control Engineer</p>
              </div>
              <Target className="text-primary" size={32} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
