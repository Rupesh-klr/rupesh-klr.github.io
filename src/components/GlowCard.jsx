import React from "react";

const GlowCard = ({ children, className = "", glowColor }) => {
  const handleMouseMove = (e) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    
    // Calculate mouse position relative to the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set CSS variables for the spotlight effect
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`glass-glow-card ${className}`}
      // Allow overriding the glow color (e.g., specific brand color)
      style={glowColor ? { "--glow-color": glowColor } : {}}
    >
      {children}
    </div>
  );
};

export default GlowCard;