import React from "react";
import { motion } from "framer-motion";
import BubbleLoader from "./BubbleLoader"; 

const GlobalModal = ({ isOpen, onClose, type, data }) => {
  if (!isOpen) return null;

  const getModalTitle = () => {
    if (type === "legal") return data?.title || "Legal";
    if (type === "resume-sample-template") return "Resume Collection";
    return "Details";
  };

  return (
    // 1. BACKDROP: z-[200] ensures the whole overlay is on top
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center">
      
      {/* 2. MODAL CONTAINER */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        
        // ADDED CLASS: 'mobile-modal-fix' (Logic is now in your CSS file)
        className="bg-[#1d1836] rounded-2xl border border-white/10 shadow-card flex flex-col
                   mobile-modal-fix 
                   w-auto mx-[30px] h-auto max-h-[65vh] p-[15px]
                   md:fixed md:w-auto md:h-auto md:max-h-none md:mx-0 md:inset-auto
                   md:top-[15%] md:bottom-[18%] md:left-[15%] md:right-[10%] md:p-8"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-secondary hover:text-white text-xl z-10 bg-white/5 rounded-full w-8 h-8 flex items-center justify-center transition-all"
        >
          ✕
        </button>

        {/* --- HEADER --- */}
        <div className="mt-1 mb-3 shrink-0 pr-8"> 
          <h2 className="text-white text-2xl sm:text-3xl font-bold">
            {getModalTitle()}
          </h2>
        </div>

        {/* --- BODY CONTENT --- */}
        <div className="flex-1 text-secondary text-[15px] sm:text-[16px] leading-[26px] sm:leading-[30px] overflow-y-auto pr-2 custom-scrollbar">
          
          {/* CONTENT LOGIC (Legal, Resume, etc.) */}
          {type === "legal" && data && (
            <div className="space-y-4">
              <p className="text-sm text-gray-400 border-b border-white/10 pb-2">
                Last Updated: {data.lastUpdated}
              </p>
              <div className="space-y-6">
                {data.content?.map((point, index) => (
                  <div key={index}>
                    <h4 className="text-white font-bold text-lg mb-1">
                      {point.heading}
                    </h4>
                    <p className="text-secondary text-sm leading-relaxed text-justify">
                      {point.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {type === "resume-sample-template" && (
            <div>
              <p>Viewing Data for: <span className="text-white">{data?.name}</span></p>
              <p>Role: <span className="text-white">{data?.roles}</span></p>

              <div className="mt-5 p-5 bg-black-100 rounded-xl border border-white/5 min-h-[200px] flex items-center justify-center">
                 <span className="text-gray-500">
                    [Template Content for key: {data?.modelKey}]
                 </span>
              </div>
            </div>
          )}
          
          {data?.isComingSoon && (
             <div className="flex flex-col items-center justify-center py-10 gap-4">
                <div className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg shadow-yellow-500/20">
                  Coming Soon
                </div>
                <div className="h-32 w-full relative">
                   <BubbleLoader />
                </div>
                <p>We are working hard to bring this feature to you!</p>
             </div>
          )}

        </div>

        {/* --- FOOTER --- */}
        <div className="mt-4 flex justify-end gap-4 shrink-0 pt-3 border-t border-white/5">
          <button
            onClick={onClose}
            className="py-2 text-red px-6 text-sm sm:text-base outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl bg-tertiary hover:bg-white/10 transition-colors"
          >
            Close
          </button>
        </div>

      </motion.div>
    </div>
  );
};

export default GlobalModal;


