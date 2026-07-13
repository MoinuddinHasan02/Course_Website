import Image from "next/image";
import Link from "next/link";
import { Award, CheckCircle, MapPin, Briefcase, MessageCircle } from "lucide-react";

export function About() {
  return (
    <section id="trainer" className="py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-10">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden glass border border-border mt-4">
                <Image 
                  src="/trainer.png" 
                  alt="Mohammed Aejaz Ahmed" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

            </div>

            <div className="flex justify-center gap-4">
              <Link 
                href="https://wa.me/917829449074" 
                target="_blank"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all font-bold"
              >
                <MessageCircle size={20} />
                WhatsApp
              </Link>
              <Link 
                href="https://www.linkedin.com/in/aejaz-ahmed-a4710472/" 
                target="_blank"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#0077b5]/10 text-[#0077b5] border border-[#0077b5]/30 hover:bg-[#0077b5]/20 transition-all font-bold"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                LinkedIn
              </Link>
            </div>
          </div>

          <div>
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">Meet Your Trainer</span>
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 tracking-tight">Mohammed Aejaz Ahmed</h2>
            <p className="text-muted text-lg mb-8 leading-relaxed">
              Planning & Project Control Engineer with over <strong>11 years of international experience</strong> 
              across the UAE, Saudi Arabia, Oman, and India.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="mt-1 text-primary"><Briefcase size={20} /></div>
                <div>
                  <h4 className="font-bold mb-1">Expert Experience</h4>
                  <p className="text-sm text-muted">ADNOC Shutdown Project (2025), Specialized in EPC & Oil & Gas projects.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 text-primary"><Award size={20} /></div>
                <div>
                  <h4 className="font-bold mb-1">Specialist Skills</h4>
                  <p className="text-sm text-muted">Mastery in Primavera P6, Earned Value Management (EVM), and Delay Analysis.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 text-primary"><MapPin size={20} /></div>
                <div>
                  <h4 className="font-bold mb-1">Global Reach</h4>
                  <p className="text-sm text-muted">Successfully trained engineers for roles in top Multi-National Companies in Gulf & India.</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-border flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-white glass px-4 py-2 rounded-full">
                <CheckCircle size={14} className="text-primary" />
                ADNOC PROJECTS
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-white glass px-4 py-2 rounded-full">
                <CheckCircle size={14} className="text-primary" />
                ARAMCO PROJECTS
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-white glass px-4 py-2 rounded-full">
                <CheckCircle size={14} className="text-primary" />
                EPC SPECIALIST
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
