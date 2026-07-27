"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  
  // Spring physics for smooth ring filling
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Only show the button after the user scrolls down a bit
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest > 0.05) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50 cursor-pointer"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.5,
        y: isVisible ? 0 : 20,
        pointerEvents: isVisible ? "auto" : "none"
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
    >
      <div className="relative flex items-center justify-center w-14 h-14 bg-background/80 backdrop-blur-xl rounded-full border border-primary/20 shadow-[0_0_30px_rgba(234,179,8,0.15)] group">
        
        {/* Subtle background glow that pulses on hover */}
        <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />

        {/* SVG Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="46"
            className="stroke-primary/10"
            strokeWidth="4"
            fill="none"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            className="stroke-primary drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>
        
        {/* Center Icon with subtle animation */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowUp className="text-primary z-10 w-5 h-5 drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
        </motion.div>
      </div>
    </motion.div>
  );
}
