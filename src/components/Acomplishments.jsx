import React, { useState, useEffect, useRef,useMemo } from "react";
import { motion, useInView, animate } from "framer-motion";

// --- 1. CUSTOM HOOK: SCRAMBLED INCREMENT EFFECT ---
// Combines "Count Up" + "Cyber Glitch" text
const useScrambledIncrement = (finalValue, inView) => {
  const [displayValue, setDisplayValue] = useState("0");
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  useEffect(() => {
    if (!inView) return;

    // Framer Motion 'animate' handles the smooth number counting
    const controls = animate(0, finalValue, {
      duration: 2.5, // Total animation time
      ease: "easeOut",
      onUpdate: (latest) => {
        const currentNum = Math.floor(latest);
        const progress = latest / finalValue;
        
        // Add "Glitch" characters based on progress
        // Early stage = More glitches. Late stage = Less glitches.
        let glitch = "";
        if (progress < 1) {
            const glitchLength = Math.max(0, Math.floor(3 * (1 - progress))); 
            for (let i = 0; i < glitchLength; i++) {
                glitch += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        
        // Format with commas (e.g., 1,500) + Glitch
        setDisplayValue(currentNum.toLocaleString() + glitch);
      },
      onComplete: () => {
        // Ensure clean final output
        setDisplayValue(finalValue.toLocaleString());
      }
    });

    return () => controls.stop();
  }, [inView, finalValue]);

  return displayValue;
};

// --- 2. GLASS STAT CARD COMPONENT ---
const GlassStatCard = ({ label, value, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const displayValue = useScrambledIncrement(value, isInView);
  const randomWidth = useMemo(() => {
    return Math.floor(Math.random() * (90 - 70) + 70); // Random between 70% and 90%
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
      whileHover={{ 
        scale: 1.05, 
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        boxShadow: "0 0 30px rgba(145, 94, 255, 0.2)" 
      }}
      className="relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden group flex flex-col items-center justify-center min-h-[160px] cursor-default"
    >
      {/* Dynamic Background Pulse */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>

      {/* Floating Tech Icon (Decoration) */}
      <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
         <span className="text-xl">⚡</span>
      </div>

      {/* The Number (Increments + Glitches) */}
      <h3 className="relative z-10 text-4xl md:text-5xl font-bold text-white mb-2 font-mono tracking-tighter drop-shadow-lg">
        {displayValue}
        <span className="text-purple-400 text-3xl align-top ml-1">+</span>
      </h3>

      {/* The Label */}
      <p className="relative z-10 text-secondary text-sm md:text-base font-medium uppercase tracking-wider text-center group-hover:text-white transition-colors">
        {label}
      </p>

      {/* Interactive Bottom Line */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"
        initial={{ width: 0 }}
        animate={isInView ? { width: `${randomWidth}%` } : {}} // ✅ Use the memoized value
        transition={{ delay: 0.5 + index * 0.1, duration: 1.5, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

// --- 3. MAIN COMPONENT ---
const Acomplishments = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // RECRUITER-FOCUSED DATA
      // These metrics show activity, skill breadth, and problem solving.
      setStats([
        { id: "s1", label: "Projects Deployed", value: 25 },    // Shows you ship code
        { id: "s2", label: "Code Commits", value: 1450 },       // Shows consistency
        { id: "s3", label: "DSA Problems Solved", value: 450 }, // Shows algorithmic skill
        { id: "s4", label: "Tech Stack Tools", value: 15 }      // Shows versatility
      ]);
      setLoading(false);
    };

    fetchStats();
  }, []);

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto relative z-0">
      
      {/* Title Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        className="mb-12"
      >
        <h2 className="text-white text-[40px] font-bold">
          Key Metrics<span className="text-purple-500">.</span>
        </h2>
        <p className="text-secondary text-[17px] max-w-3xl leading-[30px]">
          Quantifiable milestones from my engineering journey.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          // SKELETON LOADER
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-[160px] bg-white/5 rounded-2xl animate-pulse border border-white/5 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
            </div>
          ))
        ) : (
          stats.map((item, index) => (
            <GlassStatCard 
              key={item.id} 
              label={item.label} 
              value={item.value} 
              index={index} 
            />
          ))
        )}
      </div>

    </section>
  );
};

export default Acomplishments;