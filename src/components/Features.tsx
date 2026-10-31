import { HardHat, Briefcase, Zap, GraduationCap, Globe, Award } from "lucide-react";

const features = [
  {
    icon: <HardHat className="text-primary" size={22} />,
    title: "Real Shutdown & EPC Examples",
    description: "Learn from actual high-value turnkey projects, shutdown turnarounds, and EPC execution schedules, not simplified mock examples."
  },
  {
    icon: <Zap className="text-primary" size={22} />,
    title: "Hands-on Software Execution",
    description: "Build logic networks, activity codes, WBS dictionaries, and cost-loaded baselines directly in Primavera P6 software."
  },
  {
    icon: <GraduationCap className="text-primary" size={22} />,
    title: "Basic to Forensic Delay Analysis",
    description: "Master time-impact analysis (TIA), windows analysis, critical path shifts, and formal delay claims documentation."
  },
  {
    icon: <Briefcase className="text-primary" size={22} />,
    title: "Gulf & International Job Guidance",
    description: "Strategic resume positioning, technical interview preparation, and direct insights for high-paying roles in UAE, Saudi Arabia & India."
  },
  {
    icon: <Globe className="text-primary" size={22} />,
    title: "Global Industry Standards",
    description: "Learn planning methodologies aligned with major oil & gas operators including ADNOC, Aramco, and international contractors."
  },
  {
    icon: <Award className="text-primary" size={22} />,
    title: "Cryptographically Verified Certificate",
    description: "Earn a tamper-proof certificate with unique QR code verification that employers and clients can validate instantly."
  }
];

export function Features() {
  return (
    <section id="why" className="py-24 bg-card/40 border-y border-border/60 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">
            Why Professionals Choose This Program
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-black mb-4 tracking-tight text-foreground">
            Engineered for Real-World Competence
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl bg-card border border-border hover:border-primary/40 hover:bg-card/80 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-heading font-bold mb-2.5 text-foreground">{feature.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
