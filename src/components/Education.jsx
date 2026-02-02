import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc"; // Assuming you have this HOC
import { styles } from "../styles";

// --- 1. YOUR REAL DATA ---
const educationData = [
  {
    degree: "Bachelor of Technology (B.Tech)",
    major: "Computer Science & Engineering", // Assumed based on Full Stack role
    school: "Mother Theresa Institute Of Engineering And Technology",
    year: "June 2019 – June 2023",
    grade: "Graduated", 
    icon: "🎓", 
  },
  {
    degree: "Intermediate (12th Grade)",
    major: "Science / Mathematics",
    school: "RK Vidyalaya And Junior College",
    year: "June 2017 – June 2019",
    grade: "Completed",
    icon: "🏫",
  },
  {
    degree: "Secondary School (10th Grade)",
    major: "General Education",
    school: "Vijaya English Medium School",
    year: "June 2016 – June 2017",
    grade: "Completed",
    icon: "🎒",
  },
];

// --- 2. SPOTLIGHT CARD COMPONENT ---
const SpotlightCard = ({ index, edu }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Update mouse position relative to the card
  const handleMouseMove = (e) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      
      // Animation: Fade in up
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      
      className="relative w-full rounded-2xl border border-white/10 bg-[#100d25] overflow-hidden group"
    >
      {/* A. SPOTLIGHT EFFECT (The "Flashlight") */}
      {/* This div follows the mouse and reveals the border/bg color */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(145, 94, 255, 0.15), transparent 40%)`,
        }}
      />
      
      {/* B. BORDER GLOW (Follows Mouse) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.1), transparent 40%)`,
          zIndex: 1
        }}
      />

      {/* C. CARD CONTENT */}
      <div className="relative h-full p-6 sm:p-8 flex flex-col justify-between z-10">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
            <div>
                <span className="inline-block px-3 py-1 mb-3 text-xs font-medium text-purple-300 bg-purple-900/20 border border-purple-500/20 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                    {edu.year}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {edu.degree}
                </h3>
                <p className="text-sm text-secondary mt-1 font-mono">
                    {edu.major}
                </p>
            </div>
            
            {/* Icon Circle */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
                <span className="text-2xl">{edu.icon}</span>
            </div>
        </div>

        {/* School Info */}
        <div className="mt-6 pt-6 border-t border-white/5">
            <h4 className="text-lg font-semibold text-gray-200">
                {edu.school}
            </h4>
            <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-sm text-gray-400">
                   Status: <span className="text-white">{edu.grade}</span>
                </p>
            </div>
        </div>

      </div>
    </motion.div>
  );
};

const Education = () => {
  return (
    // ✅ FIX: Changed 'md:pl-24' to 'md:pl-32' (more space) and added 'relative'
    // This ensures the text starts 128px from the left on desktop, clearing the sidebar
    <div className="w-full flex flex-col relative md:pl-32"> 
      
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My Academic Journey</p>
        <h2 className={`${styles.sectionHeadText}`}>Education.</h2>
      </motion.div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {educationData.map((edu, index) => (
          <SpotlightCard key={index} index={index} edu={edu} />
        ))}
      </div>
    </div>
  );
};

// export default SectionWrapper(Education, "education");

// Helper for simple text animation (if you don't have utils/motion)
const textVariant = (delay) => {
  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.25,
        delay: delay,
      },
    },
  };
};

export default SectionWrapper(Education, "education");