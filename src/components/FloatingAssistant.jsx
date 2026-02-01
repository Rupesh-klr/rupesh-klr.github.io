import React, { useState, useEffect, useRef } from "react";
import { FaRobot, FaPhoneAlt, FaComments, FaTimes, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// --- CONFIGURATION CONSTANTS ---
// Easily modify emoji behavior here
const EMOJI_CONFIG = {
  minBatch: 4,        // Minimum emojis to throw at once
  maxBatch: 17,        // Maximum emojis to throw at once
  intervalMin: 1000,  // Minimum time between bursts (ms)
  intervalMax: 30000, // Maximum time between bursts (ms)
  // The pool of emojis to choose from
  pool: ["🎵", "👋", "🤖", "⚡", "❤️", "👀", "🚀", "✨", "🔥", "💻", "🎉"],
  // Explosion Radius (how far they fly)
  spread: 210, 
};

// --- CHAT DATA ---
const chatFlow = {
  start: {
    text: "Hello! I'm your virtual assistant. How can I help you today?",
    options: [
      { label: "I need a website", next: "service_web" },
      { label: "Hire a Developer", next: "service_hire" },
      { label: "Contact Support", next: "support" },
    ],
  },
  // ... (Rest of your existing chatFlow stays the same) ...
  service_web: {
    text: "Great! What kind of website do you need?",
    options: [
      { label: "E-commerce Store", next: "quote_high" },
      { label: "Portfolio/Personal", next: "quote_low" },
      { label: "Corporate Business", next: "quote_mid" },
    ],
  },
  service_hire: {
    text: "We have experts available. Which tech stack?",
    options: [
      { label: "React / Next.js", next: "contact_form" },
      { label: "Java / Spring Boot", next: "contact_form" },
      { label: "DevOps / Cloud", next: "contact_form" },
    ],
  },
  quote_high: {
    text: "E-commerce projects typically start around $2000. Would you like to book a call?",
    options: [
      { label: "Yes, let's talk", next: "action_call" },
      { label: "No, just looking", next: "end" },
    ],
  },
  quote_mid: {
    text: "Corporate sites usually range from $1000-$1500. Interested?",
    options: [
      { label: "Yes, schedule a meeting", next: "action_call" },
      { label: "Send me a brochure", next: "contact_form" },
    ],
  },
  quote_low: {
    text: "Personal portfolios are affordable, starting at $500. Want to see samples?",
    options: [
      { label: "Show Samples", next: "end_samples" },
      { label: "Start Project", next: "action_call" },
    ],
  },
  support: {
    text: "Please describe your issue or call us directly for urgent matters.",
    options: [
      { label: "Call Support", next: "action_call" },
      { label: "Leave a message", next: "contact_form" },
    ],
  },
  contact_form: {
    text: "Please email us at rupesh@example.com with your requirements.",
    options: [{ label: "Start Over", next: "start" }],
  },
  action_call: {
    text: "Redirecting you to the phone dialer...",
    action: "call",
    options: [{ label: "Back to menu", next: "start" }],
  },
  end: {
    text: "Thanks for chatting! Have a great day.",
    options: [{ label: "Start Over", next: "start" }],
  },
  end_samples: {
    text: "Check out our Projects section above!",
    options: [{ label: "Close Chat", next: "close" }],
  },
};

const FloatingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState("start");
  const chatEndRef = useRef(null);

  // --- ALIVE STATES ---
  const [robotScale, setRobotScale] = useState(1);
  const [robotRotate, setRobotRotate] = useState(0);
  
  // New: Array to hold the "Rocket Spray" particles
  const [explodingEmojis, setExplodingEmojis] = useState([]);

  // --- BLIND FLASH STATE ---
  const [flashEffect, setFlashEffect] = useState(false);

  // Initialize chat
  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      addBotMessage(chatFlow.start.text);
    }
  }, [isChatOpen]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- ROBOT ALIVE & ROCKET BURST LOGIC ---
  useEffect(() => {
    // 1. Robot Breathing (Scale/Rotate)
    const aliveInterval = setInterval(() => {
      setRobotScale(0.9 + Math.random() * 0.3);
      setRobotRotate(Math.random() * 20 - 10);
    }, 2500);

    // 2. Rocket Emoji Burst (Random Interval)
    const triggerBurst = () => {
      if (!isOpen) { // Only burst if menu is closed (optional preference)
        const batchSize = Math.floor(Math.random() * (EMOJI_CONFIG.maxBatch - EMOJI_CONFIG.minBatch + 1)) + EMOJI_CONFIG.minBatch;
        
        const newBurst = Array.from({ length: batchSize }).map(() => ({
          id: Date.now() + Math.random(),
          emoji: EMOJI_CONFIG.pool[Math.floor(Math.random() * EMOJI_CONFIG.pool.length)],
          // Random direction for spray
          xDir: (Math.random() - 0.5) * EMOJI_CONFIG.spread,
          yDir: (Math.random() - 1) * EMOJI_CONFIG.spread, // Mostly upwards (-1)
          rotation: Math.random() * 360,
          scale: 0.5 + Math.random(),
        }));

        setExplodingEmojis(newBurst);

        // Cleanup after animation (2s)
        setTimeout(() => setExplodingEmojis([]), 2000);
      }
      
      // Schedule next burst
      const nextDelay = Math.random() * (EMOJI_CONFIG.intervalMax - EMOJI_CONFIG.intervalMin) + EMOJI_CONFIG.intervalMin;
      burstTimeout.current = setTimeout(triggerBurst, nextDelay);
    };

    const burstTimeout = { current: setTimeout(triggerBurst, 3000) };

    return () => {
      clearInterval(aliveInterval);
      clearTimeout(burstTimeout.current);
    };
  }, [isOpen]);

  const addBotMessage = (text) => {
    setMessages((prev) => [...prev, { sender: "bot", text }]);
  };

  const handleOptionClick = (option) => {
    setMessages((prev) => [...prev, { sender: "user", text: option.label }]);
    if (option.next === "close") {
      setIsChatOpen(false);
      return;
    }
    const nextNode = chatFlow[option.next];
    if (nextNode) {
      setCurrentStep(option.next);
      setTimeout(() => {
        addBotMessage(nextNode.text);
        if (nextNode.action === "call") {
          window.location.href = "tel:+9170756068796";
        }
      }, 600);
    }
  };

  const handleScroll = (direction) => {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const currentScroll = window.scrollY;

    if (direction === "up") {
      if (currentScroll <= 10) triggerBlindEffect();
      else window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (direction === "down") {
      if (Math.ceil(currentScroll + clientHeight) >= scrollHeight - 10) triggerBlindEffect();
      else window.scrollTo({ top: scrollHeight, behavior: "smooth" });
    }
  };

  const triggerBlindEffect = () => {
    setFlashEffect(true);
    setTimeout(() => setFlashEffect(false), 200);
  };

  return (
    <>
      <AnimatePresence>
        {flashEffect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
        
        {/* --- CHAT WINDOW --- */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="w-80 h-96 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden origin-bottom-right mb-4 mr-2"
            >
              <div className="bg-tertiary p-4 flex justify-between items-center border-b border-white/10">
                <div className="flex items-center gap-2">
                  <FaRobot className="text-purple-400" />
                  <span className="text-white font-bold">Assistant</span>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white">
                  <FaTimes />
                </button>
              </div>
              <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-3">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`max-w-[80%] p-3 rounded-xl text-sm ${
                      msg.sender === "user"
                        ? "bg-purple-600 text-white self-end rounded-br-none"
                        : "bg-white/10 text-gray-200 self-start rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="p-3 bg-black/40 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  {chatFlow[currentStep]?.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(opt)}
                      className="text-xs bg-white/10 hover:bg-purple-500 text-white px-3 py-2 rounded-full transition-colors border border-white/5"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- ACTION BUTTONS --- */}
        <div className="relative flex items-center justify-end">
          
          {/* 1. Chat Button (Left - x: -70) */}
          <AnimatePresence>
            {isOpen && (
              <motion.button
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: -70, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                onClick={() => setIsChatOpen(true)}
                className="absolute right-0 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white shadow-lg border border-white/20 backdrop-blur-md"
                title="Chat with us"
              >
                <FaComments />
              </motion.button>
            )}
          </AnimatePresence>

          {/* 2. Call Button (Diagonal - x: -50, y: -50) */}
          <AnimatePresence>
            {isOpen && (
              <motion.a
                href="tel:+9170756068796"
                initial={{ y: 20, x: 20, opacity: 0 }}
                animate={{ y: -50, x: -50, opacity: 1 }}
                exit={{ y: 20, x: 20, opacity: 0 }}
                className="absolute right-0 w-12 h-12 rounded-full bg-green-600 hover:bg-green-500 flex items-center justify-center text-white shadow-lg border border-white/20 backdrop-blur-md"
                title="Call Now"
              >
                <FaPhoneAlt />
              </motion.a>
            )}
          </AnimatePresence>

          {/* 3. SCROLL UP (Top - y: -80) */}
          <AnimatePresence>
            {isOpen && (
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: -80, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                onClick={() => handleScroll("up")}
                className="absolute right-0 top-0 w-10 h-10 rounded-full bg-black-100 hover:bg-tertiary flex items-center justify-center text-white shadow-lg border border-white/20 backdrop-blur-md z-[-1]"
              >
                <FaArrowUp />
              </motion.button>
            )}
          </AnimatePresence>

          {/* 4. SCROLL DOWN (UPDATED: Left of Chat - x: -130) */}
          <AnimatePresence>
            {isOpen && (
              <motion.button
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: -130, opacity: 1 }} // Moved to Left of Chat (-70 - 60 = -130)
                exit={{ x: 20, opacity: 0 }}
                onClick={() => handleScroll("down")}
                className="absolute right-0 w-10 h-10 rounded-full bg-black-100 hover:bg-tertiary flex items-center justify-center text-white shadow-lg border border-white/20 backdrop-blur-md z-[-1]"
              >
                <FaArrowDown />
              </motion.button>
            )}
          </AnimatePresence>

          {/* --- MAIN FLOATING TRIGGER --- */}
          <div className="relative">
             
             {/* ROCKET SPRAY / EXPLOSION EFFECT */}
             <AnimatePresence>
              {explodingEmojis.map((particle) => (
                <motion.div
                  key={particle.id}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 0.2 }}
                  animate={{ 
                    opacity: 0, 
                    x: particle.xDir, 
                    y: particle.yDir, 
                    scale: particle.scale,
                    rotate: particle.rotation
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute top-0 left-0 text-2xl pointer-events-none"
                  style={{ zIndex: -1 }}
                >
                  {particle.emoji}
                </motion.div>
              ))}
             </AnimatePresence>

            <button
              onClick={() => setIsOpen(!isOpen)}
              onMouseEnter={() => setIsOpen(true)}
              className="relative w-16 h-16 rounded-full bg-tertiary border border-white/20 shadow-xl flex items-center justify-center group overflow-visible"
            >
              <span className="absolute inset-0 rounded-full border-2 border-purple-500/50 animate-ping"></span>
              
              <motion.div 
                animate={{ 
                  scale: isOpen ? 1 : robotScale, 
                  rotate: isOpen ? 0 : robotRotate 
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative z-10"
              >
                {isOpen ? <FaTimes className="text-2xl text-white" /> : <FaRobot className="text-3xl text-purple-400" />}
              </motion.div>

              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-full"></div>
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default FloatingAssistant;