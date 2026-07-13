import Link from "next/link";
import { MessageCircle, ArrowRight, Globe, Video, Camera, Mail } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 -z-10" />
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="glass p-12 md:p-20 rounded-[3rem] border border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 -translate-y-1/2 translate-x-1/2" />
          
          <h2 className="text-4xl md:text-6xl font-heading font-black mb-6 tracking-tight">
            Ready to Accelerate Your <br />
            <span className="gold-gradient">Planning Career?</span>
          </h2>
          <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">
            Limited Seats Available – Start Your Career in Planning with Expert Guidance today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="https://wa.me/917829449074"
              target="_blank"
              className="px-10 py-5 bg-primary text-background font-black rounded-2xl hover:bg-accent transition-all flex items-center justify-center gap-3 text-xl shadow-2xl"
            >
              <MessageCircle size={24} />
              Message Now to Join
            </Link>
          </div>
          
          <p className="mt-8 text-sm font-bold text-primary flex items-center justify-center gap-2">
            <ArrowRight size={16} />
            Join the Next Batch starting soon
          </p>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-12 border-t border-border mt-12 bg-card/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center font-bold text-background text-xs">
                A
              </div>
              <span className="font-heading font-bold text-lg tracking-tight">
                AEJAZ TRAINING
              </span>
            </div>
            <p className="text-xs text-muted">© 2025 Aejaz Training. All rights reserved.</p>
          </div>

          <div className="flex gap-6">
            <Link href="#" className="text-muted hover:text-primary transition-colors"><Globe size={20} /></Link>
            <Link href="#" className="text-muted hover:text-primary transition-colors"><Video size={20} /></Link>
            <Link href="#" className="text-muted hover:text-primary transition-colors"><Camera size={20} /></Link>
            <Link href="#" className="text-muted hover:text-primary transition-colors"><Mail size={20} /></Link>
          </div>

          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-muted">
            <Link href="#" className="hover:text-primary">Terms</Link>
            <Link href="#" className="hover:text-primary">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
