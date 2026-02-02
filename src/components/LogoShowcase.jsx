import React from "react";

// --- Data (Cleaned up) ---
const logoIconsList = [
  { imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-1.png", name: "Logo 1" },
  { imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-2.png", name: "Logo 2" },
  { imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-3.png", name: "Logo 3" },
  { imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-4.png", name: "Logo 4" },
  { imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-5.png", name: "Logo 5" },
  { imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-6.png", name: "Logo 6" },
  { imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-7.png", name: "Logo 7" },
  { imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-8.png", name: "Logo 8" },
];

const LogoShowcase = ({ direction = "left", speed = 30 }) => {
  // We triple the list to ensure smooth infinite looping on wide screens
  const seamlessList = [...logoIconsList, ...logoIconsList, ...logoIconsList];

  return (
    <div className="relative w-full py-10 overflow-hidden">
      
      {/* --- 1. RAINBOW GLOW BACKDROP --- */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 opacity-20 blur-3xl animate-pulse"></div>

      {/* --- 2. GLASS CONTAINER --- */}
      <div className="relative z-10 w-full h-28 flex items-center bg-white/5 backdrop-blur-xl border-y border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
        
        {/* Matrix/Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

        {/* Gradient Fade Edges */}
        <div className="absolute top-0 left-0 z-20 h-full w-32 bg-gradient-to-r from-[#050816] to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 z-20 h-full w-32 bg-gradient-to-l from-[#050816] to-transparent pointer-events-none" />

        {/* --- 3. MARQUEE TRACK --- */}
        <div
          className="flex gap-16 shrink-0 select-none will-change-transform"
          style={{
            animation: `marquee-${direction} ${speed}s linear infinite`,
            width: "max-content",
          }}
        >
          {seamlessList.map((icon, index) => (
            <div 
              key={index} 
              className="group relative w-32 h-16 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              {/* Logo Glow on Hover */}
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <img
                src={icon.imgPath}
                alt={icon.name}
                className="relative z-10 w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* --- 4. STANDARD CSS (Fixed JSX Error) --- */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); } /* Adjusted for 3x list duplication */
        }
        @keyframes marquee-right {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default LogoShowcase;