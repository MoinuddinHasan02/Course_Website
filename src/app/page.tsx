import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Curriculum } from "@/components/Curriculum";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { CTA, Footer } from "@/components/CTA";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      <Curriculum />
      <About />
      <Testimonials />
      <CTA />
      <Footer />

    </main>
  );
}
