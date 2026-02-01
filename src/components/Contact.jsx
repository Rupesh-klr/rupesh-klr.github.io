import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

// --- 1. MOVED OUTSIDE: Service Toggle ---
const ServiceToggle = ({ method, setMethod }) => (
  <div className="flex gap-4 mb-6 bg-tertiary p-2 rounded-xl w-fit">
    <button
      type="button"
      onClick={() => setMethod("emailjs")}
      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
        method === "emailjs"
          ? "bg-purple-600 text-white shadow-lg scale-105"
          : "text-secondary hover:text-white"
      }`}
    >
      EmailJS
    </button>
    <button
      type="button"
      onClick={() => setMethod("formsubmit")}
      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
        method === "formsubmit"
          ? "bg-green-600 text-white shadow-lg scale-105"
          : "text-secondary hover:text-white"
      }`}
    >
      FormSubmit.co
    </button>
  </div>
);

// --- 2. MOVED OUTSIDE: Input Field (Pass 'onChange' as a prop) ---
const InputField = ({ label, name, type = "text", placeholder, value, onChange }) => (
  <motion.label 
    className="flex flex-col gap-2"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <span className="text-white font-medium text-sm ml-1">{label}</span>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange} // Use the prop here
      placeholder={placeholder}
      className="bg-tertiary py-3 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-transparent focus:border-purple-500 transition-all font-medium"
      required
    />
  </motion.label>
);

const Contact = () => {
  const formRef = useRef();
  
  // State
  const [submissionMethod, setSubmissionMethod] = useState("emailjs");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    name: "",
    intro: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Standard React state update
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Feedback Logic
  const triggerDelayedFeedback = (userName) => {
    console.log("⏳ Timer started: Feedback email will trigger in 30 seconds...");
    setTimeout(() => {
      alert(`30 Seconds Passed! 🚀\nFeedback email logic executed for ${userName}.`);
    }, 30000); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (submissionMethod === "emailjs") {
        await emailjs.send(
          import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
          {
            title: form.title,
            name: form.name,
            intro: form.intro,
            phone: form.phone,
            email: form.email,
            message: form.message,
            time: new Date().toLocaleString(),
          },
          import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
        );
        alert("Success! Email sent via EmailJS.");
        triggerDelayedFeedback(form.name);

      } else {
        // FormSubmit.co
        const response = await fetch(
          `https://formsubmit.co/ajax/${import.meta.env.VITE_APP_FORMSUBMIT_EMAIL}`,
          {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              _subject: `New Query: ${form.title}`,
              name: form.name,
              email: form.email,
              intro: form.intro,
              phone: form.phone,
              message: form.message,
              _template: "table"
            }),
          }
        );

        if (response.ok) {
           alert("Success! Form sent via FormSubmit.co.");
           triggerDelayedFeedback(form.name);
        } else {
           throw new Error("FormSubmit failed");
        }
      }

      setForm({ title: "", name: "", intro: "", phone: "", email: "", message: "" });

    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
      
      {/* Left Side: Form */}
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <div className="mt-4">
           <span className="text-secondary text-xs mb-2 block">Select Service Provider:</span>
           <ServiceToggle method={submissionMethod} setMethod={setSubmissionMethod} />
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
              label="Title/Role" 
              name="title" 
              placeholder="e.g. Recruiter" 
              value={form.title} 
              onChange={handleChange} 
            />
            <InputField 
              label="Full Name" 
              name="name" 
              placeholder="What's your name?" 
              value={form.name} 
              onChange={handleChange} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <InputField 
               label="Short Intro" 
               name="intro" 
               placeholder="One liner about you" 
               value={form.intro} 
               onChange={handleChange} 
             />
             <InputField 
               label="Phone Number" 
               name="phone" 
               type="tel" 
               placeholder="+91 000..." 
               value={form.phone} 
               onChange={handleChange} 
             />
          </div>

          <InputField 
            label="Email Address" 
            name="email" 
            type="email" 
            placeholder="email@address.com" 
            value={form.email} 
            onChange={handleChange} 
          />

          <motion.label 
            className="flex flex-col gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-white font-medium text-sm ml-1">Your Message</span>
            <textarea
              rows={5}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your feedback or query here..."
              className="bg-tertiary py-3 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-transparent focus:border-green-500 transition-all font-medium resize-none"
              required
            />
          </motion.label>

          <button
            type="submit"
            disabled={loading}
            className={`py-3 px-8 rounded-xl outline-none w-fit font-bold shadow-md shadow-primary transition-all duration-300 transform active:scale-95 ${
              loading ? "bg-gray-600 text-gray-300" : "bg-white text-tertiary hover:bg-purple-500 hover:text-white"
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </motion.div>

      {/* Right Side: Earth */}
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");