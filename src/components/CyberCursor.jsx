import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CyberCursor = () => {
  // --- STATE MANAGEMENT ---
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState([]); // The Spray Bubbles
  
  // High Performance Mouse Tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Smooth spring animation for the Main Cursor
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Random "Breathing" size for the idle state
  const [randomScale, setRandomScale] = useState(1);

  // --- REFS ---
  const lastPosition = useRef({ x: 0, y: 0 });
  const trailRef = useRef([]);

  // --- MOUSE LOGIC ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // 1. Update Main Cursor
      mouseX.set(clientX - 16); 
      mouseY.set(clientY - 16);

      // 2. SPRAY LOGIC
      const distance = Math.hypot(
        clientX - lastPosition.current.x,
        clientY - lastPosition.current.y
      );

      // Density: Lower number = more bubbles. Keep around 8-15 for large bubbles.
      if (distance > 20) { 
        
        // --- UPDATED SIZE ---
        // Now significantly larger: range 20px to 60px
        const randomSize = Math.random() * 40 + 20; 
        const randomOffsetX = (Math.random() - 0.5) * 30; // Wider scatter
        const randomOffsetY = (Math.random() - 0.5) * 30;

        const newPoint = { 
          x: clientX + randomOffsetX, 
          y: clientY + randomOffsetY, 
          id: Date.now(),
          size: randomSize 
        };

        // Keep last 15 points
        const newTrail = [newPoint, ...trailRef.current].slice(0, 15);
        
        trailRef.current = newTrail;
        setTrail(newTrail);
        
        lastPosition.current = { x: clientX, y: clientY };
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      if (e.target.tagName === "A" || e.target.tagName === "BUTTON" || e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // --- ALIVE BREATHING EFFECT ---
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isClicking && !isHovering) {
        setRandomScale(0.9 + Math.random() * 0.3);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isClicking, isHovering]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      
      {/* 1. THE "POP-ABLE" TRANSPARENT BUBBLES */}
      {trail.map((point) => (
        <motion.div
          key={point.id}
          // --- THE POPPING ANIMATION ---
          initial={{ opacity: 0, scale: 0.5, borderWidth: "2px" }}
          animate={{ 
            opacity: [0.7, 0.7, 0], // Stay visible briefly, then fade
            scale: [0.8, 1, 1.8],   // Grow to normal, then "burst" larger
            borderWidth: ["2px", "2px", "0px"] // Border disappears on pop
          }}
          transition={{ duration: 0.6, ease: "easeOut", times: [0, 0.4, 1] }}
          
          // --- THE GLASS BUBBLE STYLE ---
          className="absolute rounded-full"
          style={{
            left: point.x,
            top: point.y,
            width: `${point.size}px`,
            height: `${point.size}px`,
            transform: "translate(-50%, -50%)",
            // Transparent center with purple tint
            backgroundColor: "rgba(145, 94, 255, 0.05)", 
            // Glowing purple rim
            borderColor: "rgba(145, 94, 255, 0.6)", 
            borderStyle: "solid",
            // Inset shadow gives it the 3D glass look
            boxShadow: "inset 0 0 15px rgba(145, 94, 255, 0.2), 0 0 5px rgba(255,255,255,0.1)"
          }}
        />
      ))}

      {/* 2. THE MAIN CURSOR */}
      <motion.div
        className="fixed top-0 left-0 rounded-full backdrop-blur-sm"
        style={{
          x: cursorX,
          y: cursorY,
          width: "32px",
          height: "32px",
          borderWidth: "2px",
          borderStyle: "solid",
          boxShadow: isClicking 
            ? "0 0 20px 5px rgba(145, 94, 255, 0.8)" 
            : "0 0 10px rgba(255, 255, 255, 0.2)",
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 2.5 : randomScale,
          borderColor: isClicking ? "#915eff" : isHovering ? "#ffffff" : "rgba(255, 255, 255, 0.3)",
        }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 25 },
          borderColor: { duration: 0.2 }
        }}
      >
        {/* 3. INNER CORE */}
        <div className={`absolute inset-0 rounded-full opacity-60 ${isClicking ? "bg-white" : "bg-transparent"}`}>
           {!isHovering && (
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"></div>
           )}
        </div>

      </motion.div>
    </div>
  );
};

export default CyberCursor;