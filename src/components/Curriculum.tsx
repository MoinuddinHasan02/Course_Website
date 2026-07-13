"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ListChecks, Calendar, Share2, DollarSign, AlertCircle, FileText } from "lucide-react";

const modules = [
  {
    id: 1,
    title: "Fundamentals",
    icon: <ListChecks />,
    items: ["Planning concepts", "Project lifecycle"]
  },
  {
    id: 2,
    title: "Primavera P6 Basics",
    icon: <Calendar />,
    items: ["Interface overview", "Project setup", "Calendars configuration"]
  },
  {
    id: 3,
    title: "Scheduling",
    icon: <Share2 />,
    items: ["Activities management", "Relationships (FF, FS, SS, SF)", "Critical Path Method (CPM)"]
  },
  {
    id: 4,
    title: "Advanced Planning",
    icon: <AlertCircle />,
    items: ["Baselines management", "Constraints handling", "Tracking progress"]
  },
  {
    id: 5,
    title: "Cost & Resources",
    icon: <DollarSign />,
    items: ["Resource loading", "Cost loading", "Earned Value Management (EVM)"]
  },
  {
    id: 6,
    title: "Delay Analysis",
    icon: <AlertCircle className="text-accent" />,
    items: ["Types of delays", "Real case studies", "Claims basics"]
  },
  {
    id: 7,
    title: "Reporting",
    icon: <FileText />,
    items: ["S-curves generation", "Dashboard creation", "Client reports generation"]
  }
];

export function Curriculum() {
  return (
    <section id="curriculum" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-heading font-black mb-4 uppercase tracking-tight">Structured <span className="text-primary italic">Curriculum</span></h2>
            <p className="text-muted font-medium max-w-xl">
              From fundamentals to advanced delay analysis. A professional path designed for Planning Engineers.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 glass rounded-lg text-xs font-bold border border-primary/20">7 MODULES</div>
            <div className="px-4 py-2 glass rounded-lg text-xs font-bold border border-primary/20">CASE STUDIES</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, idx) => (
            <motion.div 
              key={module.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl glass-dark border border-border/50 hover:border-primary/40 transition-all flex flex-col h-full group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors">
                  {module.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-muted tracking-widest uppercase">Module 0{module.id}</span>
                  <h3 className="font-heading font-bold text-lg">{module.title}</h3>
                </div>
              </div>

              <ul className="space-y-3 mt-auto">
                {module.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted">
                    <CheckCircle2 size={16} className="text-primary/60 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          
          {/* Final Summary Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-accent border border-primary/50 flex flex-col justify-center items-center text-center text-background">
            <h4 className="font-heading font-black text-2xl mb-2">45-60 DAYS</h4>
            <p className="font-bold text-sm mb-4">Mastery Program</p>
            <div className="w-12 h-1.5 bg-background/30 rounded-full mb-4" />
            <p className="text-xs font-medium px-4">Live + Recorded Support for Beginner to Advanced Levels</p>
          </div>
        </div>
      </div>
    </section>
  );
}
