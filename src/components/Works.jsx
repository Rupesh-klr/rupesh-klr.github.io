import React, { useState } from "react";
import { Tilt } from "react-tilt";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets"; 
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

// --- 1. SVG ICONS (For Diagonal Arrow & Details) ---
const ExternalLinkIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
);

const CodeIcon = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117.3 256l90.3-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.5-5.1 13.1 0 17.6l144.1 135.1c4.9 4.6 12.5 4.4 17-.4zm256.3-296.9l-43.5 46.4c-4.6 4.9-4.3 12.7.8 17.2L484.7 256l-90.3 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.8 12.1 5.1 17 .5l144.1-135.1c5.1-4.5 5.1-13.1 0-17.6L454.1 112c-4.9-4.6-12.5-4.4-17 .4z"></path></svg>
);

// --- 2. THE DETAILS MODAL (Glassmorphism + Animations) ---
const ProjectDetailsModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
        className="bg-[#151030] border border-white/10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-[0_0_50px_rgba(145,94,255,0.3)] relative custom-scrollbar flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT SIDE: Image & Quick Stats */}
        <div className="w-full md:w-2/5 relative h-[300px] md:h-auto">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#151030] via-transparent to-transparent" />
          
          <div className="absolute bottom-5 left-5 right-5">
             <h2 className="text-3xl font-bold text-white drop-shadow-md leading-tight mb-2">{project.name}</h2>
             <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag.name} className={`text-xs px-2 py-1 rounded bg-black/50 border border-white/10 ${tag.color}`}>
                    #{tag.name}
                  </span>
                ))}
             </div>
          </div>
        </div>

        {/* RIGHT SIDE: Details Content */}
        <div className="w-full md:w-3/5 p-8 flex flex-col gap-6 bg-[#151030]">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-500 p-2 rounded-full transition-all border border-white/5 hover:border-red-500/50"
          >
            &#10005;
          </button>

          {/* Description */}
          <div>
            <h3 className="text-white text-lg font-bold mb-2">About Project</h3>
            <p className="text-secondary text-[15px] leading-[26px] text-justify">
              {project.description}
            </p>
          </div>
          <ul className="mt-4 list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                          {project?.bullets?.map((b, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              {b}
                            </motion.li>
                          ))}
                        </ul>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="bg-tertiary/40 p-4 rounded-xl border border-white/5">
                <h4 className="text-white font-bold text-sm mb-1">My Role</h4>
                <p className="text-purple-400 text-sm">{project.my_role || "Full Stack Developer"}</p>
             </div>
             <div className="bg-tertiary/40 p-4 rounded-xl border border-white/5">
                 <h4 className="text-white font-bold text-sm mb-1">Contribution</h4>
                 <p className="text-secondary text-xs line-clamp-2">{project.contribution || "Core architecture & Implementation"}</p>
             </div>
          </div>

          {/* Team */}
          {project.team && (
            <div>
              <h3 className="text-white text-md font-bold mb-3">Team</h3>
              <div className="flex flex-wrap gap-3">
                {project.team.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-black/30 pr-3 rounded-full border border-white/5 hover:border-white/20 transition-all cursor-pointer" onClick={() => window.open(member.social, "_blank")}>
                    <img src={member.image} alt={member.name} className="w-8 h-8 rounded-full" />
                    <div className="flex flex-col">
                      <span className="text-white text-xs font-bold">{member.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-auto pt-6 border-t border-white/10 flex flex-wrap gap-3">
             <button onClick={() => window.open(project.source_code_link, "_blank")} className="flex-1 flex items-center justify-center gap-2 bg-black/40 hover:bg-black/60 border border-white/10 text-white px-4 py-3 rounded-xl font-bold transition-all hover:scale-[1.02]">
                <CodeIcon /> Source Code <span className="text-xs opacity-50">↗</span>
             </button>
             {project.live_url && (
               <button onClick={() => window.open(project.live_url, "_blank")} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-xl font-bold transition-all hover:scale-[1.02] shadow-lg shadow-purple-900/20">
                  Live Demo <ExternalLinkIcon />
               </button>
             )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- 3. THE UPDATED PROJECT CARD ---
const ProjectCard = ({ index, project, onOpenModal }) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{ max: 25, scale: 1, speed: 450 }}
        className="group relative rounded-2xl sm:w-[360px] w-full"
      >
        {/* Outlet Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-500" />
        
        {/* Main Card */}
        <div className="relative bg-tertiary p-5 rounded-2xl h-full flex flex-col border border-white/10 group-hover:border-white/30 transition-all duration-300">
          
          {/* Image Section */}
          <div className="relative w-full h-[230px] overflow-hidden rounded-2xl">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Github Float */}
            <div className="absolute top-0 right-0 m-3 card-img_hover">
              <div
                onClick={() => window.open(project.source_code_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer border border-white/10 hover:scale-110 transition-transform"
              >
                <img src={github} alt="github" className="w-1/2 h-1/2 object-contain" />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="mt-5 flex-1">
            <h3 className="text-white font-bold text-[22px] group-hover:text-purple-400 transition-colors">{project.name}</h3>
            <p className="mt-2 text-secondary text-[14px] line-clamp-3 leading-relaxed">
              {project.short_desc || project.description}
            </p>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2 mb-6">
            {project.tags.slice(0, 3).map((tag) => (
              <p key={tag.name} className={`text-[12px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>

          {/* --- ACTION BAR (The New Buttons) --- */}
          <div className="flex gap-2 mt-auto pt-4 border-t border-white/5">
            
            {/* 1. DETAILS BUTTON (Triggers Modal) */}
            <button 
              onClick={() => onOpenModal(project)}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white text-[13px] font-medium py-2 rounded-lg border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-1"
            >
              Details
            </button>

            {/* 2. VIEW CODE (Diagonal Arrow) */}
            <button 
              onClick={() => window.open(project.source_code_link, "_blank")}
              className="bg-black/20 hover:bg-black/40 text-secondary hover:text-white p-2 rounded-lg border border-white/5 hover:border-white/20 transition-all duration-300 hover:scale-105"
              title="View Code"
            >
              <CodeIcon />
            </button>

            {/* 3. LIVE DEMO (Diagonal Arrow) */}
            {project.live_url && (
              <button 
                onClick={() => window.open(project.live_url, "_blank")}
                className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 hover:from-purple-600 hover:to-blue-600 text-white p-2 rounded-lg border border-white/10 transition-all duration-300 hover:scale-105 shadow-lg"
                title="Live Demo"
              >
                <ExternalLinkIcon />
              </button>
            )}
            
          </div>

        </div>
      </Tilt>
    </motion.div>
  );
};

// --- 4. MAIN WRAPPER ---
const Works = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    // Optional: Disable body scroll when modal is open
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcase my skills and experience through real-world examples. 
          Use the buttons on the cards to explore details, code, and live demos.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard 
            key={`project-${index}`} 
            index={index} 
            project={project}
            onOpenModal={handleOpenModal}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal 
            project={selectedProject} 
            onClose={handleCloseModal} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SectionWrapper(Works, "work");