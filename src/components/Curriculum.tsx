"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ListChecks, Calendar, Share2, DollarSign, AlertCircle, FileText, Layers, Clock } from "lucide-react";

const modules = [
  {
    id: 1,
    title: "Planning Fundamentals & WBS",
    duration: "Week 1",
    icon: <ListChecks size={20} />,
    items: [
      "EPC Project Lifecycle & Contract Types",
      "Work Breakdown Structure (WBS) Architecture",
      "Activity Coding & Milestone Definitions",
    ]
  },
  {
    id: 2,
    title: "Primavera P6 Setup & Calendars",
    duration: "Week 2",
    icon: <Calendar size={20} />,
    items: [
      "Enterprise Project Structure (EPS) & OBS",
      "Multi-Calendar Configuration (Shift/Holidays)",
      "Project Profiles & Currency/Unit Setups",
    ]
  },
  {
    id: 3,
    title: "CPM Logic & Network Scheduling",
    duration: "Week 3",
    icon: <Share2 size={20} />,
    items: [
      "Relationships: FS, SS, FF, SF with Lags",
      "Critical Path Method (CPM) Calculation",
      "Total Float & Free Float Optimization",
    ]
  },
  {
    id: 4,
    title: "Resource & Cost Loading",
    duration: "Week 4",
    icon: <DollarSign size={20} />,
    items: [
      "Labor, Non-Labor & Material Resource Sheets",
      "Direct vs Indirect Cost Loading",
      "Resource Leveling & Histogram Generation",
    ]
  },
  {
    id: 5,
    title: "Baseline Control & Progress Tracking",
    duration: "Week 5",
    icon: <Layers size={20} />,
    items: [
      "Target vs Current Baseline Comparisons",
      "Data Date Updating & Physical % Complete",
      "Earned Value Management: EV, PV, AC, CPI & SPI",
    ]
  },
  {
    id: 6,
    title: "Forensic Delay Analysis & Claims",
    duration: "Week 6",
    icon: <AlertCircle size={20} />,
    items: [
      "Excusable vs Non-Excusable Delays",
      "Time Impact Analysis (TIA) Execution",
      "Disruption, Acceleration & EOT Claim Reports",
    ]
  },
  {
    id: 7,
    title: "Executive Dashboards & S-Curves",
    duration: "Week 7",
    icon: <FileText size={20} />,
    items: [
      "Early vs Late S-Curve Generation in Excel/P6",
      "Executive Delay Summary Presentations",
      "Client & Consultant Lookahead Reporting",
    ]
  },
  {
    id: 8,
    title: "ADNOC & Aramco Case Studies",
    duration: "Capstone",
    icon: <Clock size={20} />,
    items: [
      "Real Refined Oil & Gas Shutdown Turnaround",
      "Heavy Industrial Plant Construction Schedule",
      "Live Schedule Quality Check (DCMA 14-Point)",
    ]
  }
];

export function Curriculum() {
  return (
    <section id="curriculum" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">
              Comprehensive 8-Phase Blueprint
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-foreground">
              Structured <span className="gold-gradient">Curriculum</span>
            </h2>
            <p className="text-muted text-sm md:text-base font-normal max-w-xl mt-2 leading-relaxed">
              From foundational EPS architecture to forensic delay analysis and international EOT claims documentation.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="px-3.5 py-1.5 rounded-full bg-secondary border border-border text-xs font-bold text-foreground">
              8 Core Modules
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
              EPC & Shutdown Ready
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module, idx) => (
            <motion.div 
              key={module.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                    {module.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-secondary text-muted">
                    {module.duration}
                  </span>
                </div>

                <span className="text-[10px] font-black text-muted tracking-widest uppercase block mb-1">
                  Module 0{module.id}
                </span>
                <h3 className="font-heading font-bold text-base text-foreground mb-4 leading-snug">
                  {module.title}
                </h3>

                <ul className="space-y-2.5">
                  {module.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-muted leading-relaxed">
                      <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
