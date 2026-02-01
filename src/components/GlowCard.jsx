// import { useRef } from "react";

// const GlowCard = ({ card, children }) => {
//   const cardRef = useRef(null);

//   const handleMouseMove = (e) => {
//     const card = cardRef.current;
//     if (!card) return;

//     const rect = card.getBoundingClientRect();
//     const mouseX = e.clientX - rect.left - rect.width / 2;
//     const mouseY = e.clientY - rect.top - rect.height / 2;

//     // Calculate angle
//     let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
//     angle = (angle + 360) % 360;

//     // Set the variable
//     card.style.setProperty("--start", angle + 60);
//   };

//   return (
//     <div
//       ref={cardRef}
//       onMouseMove={handleMouseMove}
//       className="card relative card-border timeline-card rounded-xl p-10 mb-5 break-inside-avoid-column overflow-hidden group"
//     >
//       <div 
//         className="glow absolute inset-0 -z-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//         style={{
//           background: `conic-gradient(from var(--start, 0deg) at 50% 50%, transparent 0deg, #ffffff 45deg, transparent 90deg)`
//         }}
//       ></div>
//       <div className="relative z-10">
//         <div className="flex items-center gap-1 mb-5">
//           {Array.from({ length: 5 }, (_, i) => (
//             <img key={i} src="/images/star.png" alt="star" className="size-5" />
//           ))}
//         </div>
//         <div className="mb-5">
//           <p className="text-white-50 text-lg">{card.review}</p>
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default GlowCard;

import { useRef } from "react";

const GlowCard = ({ card, index, children }) => {
  // refs for all the cards
  const cardRefs = useRef([]);

  // when mouse moves over a card, rotate the glow effect
  const handleMouseMove = (index) => (e) => {
    console.log("Mouse moved on card index:", index);
    // get the current card
    const card = cardRefs.current[index];
    if (!card) return;

    // get the mouse position relative to the card
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    // calculate the angle from the center of the card to the mouse
    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);

    // adjust the angle so that it's between 0 and 360
    angle = (angle + 360) % 360;

    // set the angle as a CSS variable
    card.style.setProperty("--start", angle + 60);
  };

  // return the card component with the mouse move event
  return (
    <div
      ref={(el) => (cardRefs.current[index] = el)}
      onMouseMove={handleMouseMove(index)}
      className="card card-border timeline-card rounded-xl p-10 mb-5 break-inside-avoid-column"
    >
      {/* 1. WE ADD THE STYLES DIRECTLY HERE */}
      <style>{`
       .glow-card {
    position: relative;
    overflow: hidden;
    /* Optional: Add a border color fallback */
    border: 1px solid rgba(255, 255, 255, 0.1); 
  }

  .glow-card::before {
    content: "";
    position: absolute;
    inset: -2px; /* Make it slightly larger than the card */
    z-index: -1;
    
    /* 1. THE SPINNING GRADIENT (Background) */
    background: conic-gradient(
      from calc(var(--start) * 1deg), 
      transparent 0deg, 
      #ffffff 45deg, 
      transparent 100deg
    );

    /* 2. THE MASK (Cuts out the center to make it a border) */
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, /* Inner box (transparent) */
      linear-gradient(#fff 0 0);             /* Outer box (opaque) */
    -webkit-mask-composite: xor;             /* Remove inner from outer */
    mask-composite: exclude;                 /* Standard version */
    
    padding: 2px; /* Thickness of the border */
    opacity: 0;
    transition: opacity 0.5s ease;
  }
    .glow-card::before{
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #ec008c !important;
}

  .glow-card:hover::before {
    opacity: 1;
  }
      `}</style>
      <div className="glow"></div>
      <div className="flex items-center gap-1 mb-5">
        {Array.from({ length: 5 }, (_, i) => (
          <img key={i} src="/images/star.png" alt="star" className="size-5 " />
        ))}
      </div>
      <div className="mb-5">
        <p className="text-white-50 text-lg">{card.review}</p>
      </div>
      {children}
    </div>
  );
};

export default GlowCard;
