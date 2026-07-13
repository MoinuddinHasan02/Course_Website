import { HardHat, Briefcase, Zap, GraduationCap, Globe } from "lucide-react";

const features = [
  {
    icon: <HardHat className="text-primary" />,
    title: "Real shutdown & EPC examples",
    description: "Learn from real-world projects, not just hypothetical scenarios."
  },
  {
    icon: <Zap className="text-primary" />,
    title: "Hands-on training",
    description: "Practical approach focusing on implementation rather than pure theory."
  },
  {
    icon: <GraduationCap className="text-primary" />,
    title: "Basic to Advanced",
    description: "Complete curriculum covering everything from project setup to delay analysis."
  },
  {
    icon: <Briefcase className="text-primary" />,
    title: "Industry Demand",
    description: "Learn high-demand skills preferred by major EPC and Oil & Gas companies."
  },
  {
    icon: <Globe className="text-primary" />,
    title: "Job Guidance",
    description: "Strategic guidance for securing high-paying jobs in Gulf & India."
  }
];

export function Features() {
  return (
    <section id="why" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-black mb-4 uppercase tracking-tight">Why Choose This Course?</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl glass border border-border hover:border-primary/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">{feature.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
