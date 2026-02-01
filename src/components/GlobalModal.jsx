import React from "react";
import { motion } from "framer-motion";
import BubbleLoader from "./BubbleLoader";

const GlobalModal = ({ isOpen, onClose, type, data }) => {
  if (!isOpen) return null;

  return (
    // z-[101] as requested, with a semi-transparent mask
    <div className="fixed inset-0 z-[101] flex items-center justify-center bg-black/60 backdrop-blur-sm">

      {/* Modal Window */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-[#1d1836] w-[90%] max-w-4xl p-8 rounded-2xl relative border border-white/10 shadow-card"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary hover:text-white text-xl"
        >
          ✕
        </button>

        {/* Dynamic Content based on Type */}
        <div className="mt-4">
          <h2 className="text-white text-3xl font-bold mb-4">
            {type === "resume-sample-template" ? "Resume Collection" : "Details"}
          </h2>

          <div className="text-secondary text-[16px] leading-[30px]">
            {/* Render your data here */}
            <p>Viewing Data for: <span className="text-white">{data?.name}</span></p>
            <p>Role: <span className="text-white">{data?.roles}</span></p>

            {/* You can switch logic here later for complex designs */}
            <div className="mt-5 p-5 bg-black-100 rounded-xl border border-white/5">
              [Resume Template Content Will Load Here based on Key: {data?.modelKey}]
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl bg-tertiary hover:bg-white/10 transition-colors"
          >
            Close
          </button>
        </div>
        {data?.isComingSoon && (
          <>
            <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
              Coming Soon
            </div>
            <BubbleLoader />
          </>
        )}
      </motion.div>
    </div>
  );
};

export default GlobalModal;