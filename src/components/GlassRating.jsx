import React from "react";
import { motion } from "framer-motion";

const StarIcon = ({ filledPercentage, delay }) => {
  // filledPercentage is 0 to 100 (e.g., 100 for full, 20 for partial, 0 for empty)
  
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: delay, type: "spring", stiffness: 200, damping: 10 }}
      className="relative w-6 h-6"
    >
      {/* 1. BACKGROUND STAR (Glass/Empty container) */}
      <svg
        viewBox="0 0 24 24"
        className="absolute inset-0 w-full h-full text-white/10 drop-shadow-sm"
        fill="currentColor"
      >
         <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>

      {/* 2. FILL MASK (This handles the % filling) */}
      <div 
        className="absolute inset-0 overflow-hidden" 
        style={{ width: `${filledPercentage}%` }} // Dynamic Width
      >
        <svg
          viewBox="0 0 24 24"
          className={`w-6 h-6 drop-shadow-[0_0_5px_rgba(255,215,0,0.6)] ${
            filledPercentage < 100 && filledPercentage > 0 
              ? "text-red-400" // 4.2 Partial -> Red/Pink Fill
              : "text-yellow-400" // Full -> Gold Fill
          }`}
          fill="currentColor"
        >
           <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      </div>

      {/* 3. BLINKING GLOW EFFECT (Only for Full Stars) */}
      {filledPercentage === 100 && (
        <motion.div
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            delay: Math.random() * 2 // Random sparkle timing
          }}
          className="absolute inset-0 bg-white/40 blur-[2px] rounded-full mix-blend-overlay"
        />
      )}
    </motion.div>
  );
};

const GlassRating = ({ rating }) => {
  // 1. Safe Conversion: "4.2" -> 4.2
  const numericRating = parseFloat(rating) || 2;
  
  // 2. Total Stars config
  const totalStars = 5;

  return (
    <div className="flex items-center gap-1 mb-5 p-2 rounded-xl bg-white/5 border border-white/10 w-fit backdrop-blur-sm shadow-inner">
      {Array.from({ length: totalStars }, (_, index) => {
        const starIndex = index + 1; // 1, 2, 3, 4, 5
        
        let percentage = 0;
        
        if (numericRating >= starIndex) {
          percentage = 100; // Full Star
        } else if (numericRating > index) {
          // Partial Star (e.g., rating 4.2, index 4 => 0.2 * 100 = 20%)
          percentage = (numericRating - index) * 100;
        }

        return (
          <StarIcon 
            key={index} 
            filledPercentage={percentage} 
            delay={index * 0.1} // Staggered Animation (One by one)
          />
        );
      })}
      
      {/* Optional: Text Badge for clarity */}
      <span className="ml-2 text-xs font-bold text-white/80 bg-white/10 px-2 py-0.5 rounded-md">
        {numericRating.toFixed(1)}
      </span>
    </div>
  );
};

export default GlassRating;