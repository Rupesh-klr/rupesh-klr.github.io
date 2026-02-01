import React, { useState, useEffect, useRef } from "react";
import { 
  FaHome, 
  FaUser, 
  FaCode, 
  FaBriefcase, 
  FaEnvelope, 
  FaFileAlt 
} from "react-icons/fa";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("home");
  
  // 1. State to track which item is currently hovered
  const [hoveredId, setHoveredId] = useState(null);
  
  // 2. Ref to store the timer so we can clear it if needed
  const timeoutRef = useRef(null);

  const navItems = [
    { id: "hero", label: "Home", icon: <FaHome /> },
    { id: "about", label: "About", icon: <FaUser /> },
    { id: "tech", label: "Skills", icon: <FaCode /> },
    { id: "projects", label: "Work", icon: <FaBriefcase /> },
    { id: "resume", label: "Resume", icon: <FaFileAlt /> },
    { id: "contact", label: "Contact", icon: <FaEnvelope /> },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // --- Logic for Auto-Hide ---
  const handleMouseEnter = (id) => {
    // Clear any existing timer
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    // Show the tooltip immediately
    setHoveredId(id);

    // Set a timer to hide it after 1000ms (1 second)
    timeoutRef.current = setTimeout(() => {
      setHoveredId(null);
    }, 1000); // <--- Change this to 3000 for 3 seconds, etc.
  };

  const handleMouseLeave = () => {
    // Clear timer and hide immediately when mouse leaves
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredId(null);
  };
  // ---------------------------

  return (
    <div className="fixed left-5 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-6">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          // 3. Attach Mouse Handlers
          onMouseEnter={() => handleMouseEnter(item.id)}
          onMouseLeave={handleMouseLeave}
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-black-100/80 border border-white/10 backdrop-blur-md hover:bg-tertiary transition-all duration-300 shadow-lg"
        >
          <span className={`text-xl transition-colors duration-300 ${
            activeSection === item.id ? "text-purple-400" : "text-secondary group-hover:text-white"
          }`}>
            {item.icon}
          </span>

          {/* 4. Conditional Rendering based on State instead of CSS group-hover */}
          <span 
            className={`absolute left-14 py-1 px-3 rounded-lg bg-tertiary text-white text-sm font-medium border border-white/10 whitespace-nowrap shadow-xl transition-all duration-300 ${
              // If this item is the one in state, show it. Otherwise, hide it.
              hoveredId === item.id 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 translate-x-4 pointer-events-none"
            }`}
          >
            {item.label}
            {/* Arrow */}
            <span className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-tertiary rotate-45 border-r border-t border-white/10"></span>
          </span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;