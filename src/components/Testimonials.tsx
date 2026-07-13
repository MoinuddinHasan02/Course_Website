import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Got job after course",
    student: "Planning Engineer"
  },
  {
    quote: "Improved planning skills",
    student: "Senior Scheduler"
  },
  {
    quote: "Helped in Gulf interview",
    student: "Project Engineer"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-card/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-black mb-4 uppercase tracking-tight">Student <span className="text-primary italic">Results</span></h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <div 
              key={index}
              className="p-10 rounded-[2rem] glass-dark border border-border/50 relative group hover:border-primary/40 transition-all"
            >
              <Quote className="absolute top-6 right-8 text-primary/10 group-hover:text-primary/20 transition-colors shadow-xl" size={60} />
              <p className="text-xl font-heading font-bold mb-6 italic leading-relaxed text-gradient">
                "{test.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                  {test.student[0]}
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-muted">{test.student}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
