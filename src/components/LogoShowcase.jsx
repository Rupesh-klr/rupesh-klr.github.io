import React from "react";

// --- Data ---
const logoIconsList = [
  { imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-1.png", name: "Logo 1" },
  { imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-2.png", name: "Logo 2" },
  { imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-3.png", name: "Logo 3" },
  { imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-4.png", name: "Logo 4" },
  { imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-5.png", name: "Logo 5" }, {
    imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-1.png",
  },
  {
    imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-2.png",
  },
  {
    imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-3.png",
  },
  {
    imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-4.png",
  },
  {
    imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-5.png",
  },
  {
    imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-6.png",
  },
  {
    imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-7.png",
  },
  {
    imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-8.png",
  },
  {
    imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-9.png",
  },
  {
    imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-10.png",
  },
  {
    imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-11.png",
  },
];

const LogoShowcase = ({ direction = "left", speed = 25 }) => {
  return (
    // 1. Changed h-52 to h-24 (much shorter height)
    // 2. Added bg-white to ensure no transparent gaps if you don't want them
    <div className="w-full h-20 relative overflow-hidden flex items-center">

      {/* Gradient Edges (Optional: Remove if you want a hard edge) */}
      <div className="absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r  to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l to-transparent pointer-events-none" />

      {/* Marquee Track */}
      <div
        className="flex gap-12 shrink-0 select-none"
        style={{
          // Use inline style for dynamic animation variables
          animation: `marquee-${direction} ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        {/* Render the list twice to create the seamless loop */}
        {[...logoIconsList, ...logoIconsList].map((icon, index) => (
          <div key={index} className="flex-none w-32 flex items-center justify-center">
            <img
              src={icon.imgPath}
              alt={icon.name}
              className="w-full h-auto object-contain max-h-16 opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>

      {/* Styles for the animation */}
      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default LogoShowcase;