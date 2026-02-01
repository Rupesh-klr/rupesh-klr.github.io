import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useMotionValue } from "framer-motion";

const GlassScrollbar = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // --- 1. SCROLL SYNC LOGIC ---
  const { scrollYProgress } = useScroll();
  
  // Smooth spring for the filling line (visual only)
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  // MotionValue for the Thumb Position (0% to 100%)
  const thumbTop = useMotionValue("0%");

  // Sync Thumb with Page Scroll (When NOT dragging)
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (!isDragging) {
        // Keep thumb within screen bounds (subtract thumb height approx 5-10%)
        thumbTop.set(`${v * 94}%`); 
      }
    });
  }, [isDragging, scrollYProgress, thumbTop]);

  // --- 2. ROBUST DRAG LOGIC (The Fix) ---
  const handlePointerDown = (e) => {
    setIsDragging(true);
    e.preventDefault(); // Prevent text selection
    
    const onPointerMove = (moveEvent) => {
      // Get vertical position of mouse (0 to window height)
      const clientY = moveEvent.clientY;
      const windowHeight = window.innerHeight;
      
      // Calculate percentage (0.0 to 1.0)
      const percentage = Math.max(0, Math.min(1, clientY / windowHeight));
      
      // Immediate Visual Update (Snappy feel)
      thumbTop.set(`${percentage * 94}%`);
      
      // Scroll the Page
      const totalScrollable = document.documentElement.scrollHeight - windowHeight;
      window.scrollTo({
        top: percentage * totalScrollable,
        behavior: "auto" // Instant response
      });
    };

    const onPointerUp = () => {
      setIsDragging(false);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    // Attach to window so you can drag even if mouse leaves the bar
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  // --- 3. FASTER PARTICLES CONFIG (8 Lights, 1.5s - 3s speed) ---
  const particles = [
    { color: "#ff0080", duration: 1.5, delay: 0, direction: 1 },  // Pink Fast
    { color: "#00ffcc", duration: 3.0, delay: 1, direction: -1 }, // Cyan Slow
    { color: "#915eff", duration: 2.0, delay: 0.5, direction: 1 }, // Purple Med
    { color: "#ffff00", duration: 2.5, delay: 0.2, direction: -1 }, // Yellow
    { color: "#0088ff", duration: 1.8, delay: 1.5, direction: 1 },  // Blue
    { color: "#ff5500", duration: 2.8, delay: 0.8, direction: -1 }, // Orange
    { color: "#ffffff", duration: 1.2, delay: 2.0, direction: 1 },  // White Flash
    { color: "#00ff00", duration: 2.2, delay: 1.2, direction: -1 }, // Green
  ];

  return (
    <div className="fixed right-0 top-0 bottom-0 z-[9999] w-8 flex flex-col items-center justify-center mix-blend-screen touch-none user-select-none">
      
      {/* A. THE TRACK BACKGROUND (Clipped for Lights) */}
      <div className="absolute top-2 bottom-2 w-1.5 rounded-full overflow-hidden bg-black/10 backdrop-blur-[1px]">
        
        {/* Track Line */}
        <div className="absolute inset-0 bg-white/5 w-full h-full"></div>

        {/* The Racing Lights */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute left-0 right-0 h-16 blur-[4px]"
            style={{ 
              backgroundColor: p.color,
              opacity: 0.8
            }}
            animate={{
              y: p.direction === 1 ? ["-100vh", "100vh"] : ["100vh", "-100vh"],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay
            }}
          />
        ))}

        {/* Progress Fill Line */}
        <motion.div
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 origin-top opacity-50"
          style={{ height: thumbTop }} 
        />
      </div>

      {/* B. THE INTERACTIVE THUMB (Outside overflow-hidden so it can POP) */}
      <motion.div
        className="absolute w-4 h-16 cursor-grab active:cursor-grabbing"
        style={{ 
          top: thumbTop,
        }}
        // Handlers
        onPointerDown={handlePointerDown}
        onPointerEnter={() => setIsHovering(true)}
        onPointerLeave={() => setIsHovering(false)}
        
        // Pop Animations
        animate={{
          scale: isDragging ? 0.95 : isHovering ? 1.5 : 1, // Pop to 1.5x on hover
          filter: isHovering ? "brightness(1.5)" : "brightness(1)"
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {/* Visual Core */}
        <div className="w-full h-full rounded-full border border-white/60 backdrop-blur-md shadow-[0_0_20px_rgba(145,94,255,0.8)] bg-black/40 overflow-hidden relative">
          
          {/* Inner Plasma */}
          <div className={`absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/90 to-transparent transition-opacity duration-300 ${isDragging ? "animate-pulse" : ""}`}></div>
          
          {/* Bright Core Line */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[2px] h-8 bg-white rounded-full shadow-[0_0_15px_#fff]"></div>
        </div>
      </motion.div>

    </div>
  );
};

export default GlassScrollbar;