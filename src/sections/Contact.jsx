import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import ContactImg from "../assets/Astra.png";

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState(null); // "loading" | "success" | "error" | null

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("loading");

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("success");
          formRef.current.reset();
          setTimeout(() => setStatus(null), 3500);
        },
        () => {
          setStatus("error");
          setTimeout(() => setStatus(null), 3500);
        }
      );
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-black text-white py-24 px-6 md:px-20 flex flex-col md:flex-row items-center justify-center overflow-hidden"
    >
      {/* Left image */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0"
      >
        <img
          src={ContactImg}
          alt="Contact"
          className="rounded-2xl shadow-[0_0_40px_rgba(28,216,210,0.5)] object-cover w-80 md:w-[400px]"
        />
      </motion.div>

      {/* Right form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 bg-white/10 backdrop-blur-2xl p-8 rounded-2xl shadow-lg border border-white/10 relative overflow-hidden"
      >
        <h2 className="text-4xl font-extrabold mb-8 text-center md:text-left bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] bg-clip-text text-transparent">
          Let’s Build Something Great Together!
        </h2>

        <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-6">
          {/* Name */}
<div className="relative">
  <input
    required
    type="text"
    name="name"
    placeholder=" "
    className="peer w-full p-3 pt-5 bg-white/10 border border-gray-500 text-white rounded-md 
               focus:outline-none focus:border-[#1cd8d2]"
  />
  <label
    className="absolute left-3 top-3 text-gray-400 text-sm transition-all duration-300 
               peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
               peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#1cd8d2] 
               peer-valid:top-1 peer-valid:text-xs peer-valid:text-[#1cd8d2] 
               pointer-events-none"
  >
    Your Name
  </label>
</div>

{/* Email */}
<div className="relative">
  <input
    required
    type="email"
    name="email"
    placeholder=" "
    className="peer w-full p-3 pt-5 bg-white/10 border border-gray-500 text-white rounded-md 
               focus:outline-none focus:border-[#1cd8d2]"
  />
  <label
    className="absolute left-3 top-3 text-gray-400 text-sm transition-all duration-300 
               peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
               peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#1cd8d2] 
               peer-valid:top-1 peer-valid:text-xs peer-valid:text-[#1cd8d2] 
               pointer-events-none"
  >
    Your Email
  </label>
</div>

{/* Message */}
<div className="relative">
  <textarea
    required
    rows="5"
    name="message"
    placeholder=" "
    className="peer w-full p-3 pt-6 rounded-md bg-white/10 border border-gray-500 text-white 
               focus:outline-none focus:border-[#1cd8d2] resize-none"
  />
  <label
    className="absolute left-3 top-3 text-gray-400 text-sm transition-all duration-300 
               peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
               peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#1cd8d2] 
               peer-valid:top-1 peer-valid:text-xs peer-valid:text-[#1cd8d2] 
               pointer-events-none"
  >
    Your Message
  </label>
</div>


          {/* Submit */}
          <motion.button
            type="submit"
            disabled={status === "loading"}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full gradient text-white py-3 rounded-md font-semibold shadow-[0_0_20px_rgba(28,216,210,0.4)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(28,216,210,0.6)] disabled:opacity-60"
          >
            {status === "loading" ? "Sending..." : "Send Message 🚀"}
          </motion.button>
        </form>

        {/* Animated Success / Error Overlay */}
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md rounded-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
                className="text-6xl mb-4"
              >
                ✅
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold text-[#1cd8d2]"
              >
                Message Sent!
              </motion.h3>
              <motion.p className="text-sm mt-2 text-gray-300">Thanks — I’ll get back to you soon.</motion.p>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md rounded-2xl"
            >
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 10 }}
                transition={{ repeat: Infinity, duration: 0.25, repeatType: "reverse" }}
                className="text-6xl mb-4"
              >
                ❌
              </motion.div>
              <h3 className="text-2xl font-bold text-red-400">Failed to Send</h3>
              <p className="text-sm mt-2 text-gray-300">Please try again or email me directly.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Contact;
