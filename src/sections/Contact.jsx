import React from "react";
import { motion } from "framer-motion";
import ContactImg from "../assets/Astra.png"; // adjust path
import ParticlesBackground from "../components/ParticlesBackground";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

const Contact = () => {
  return (
    <div>
    <section
      id="contact"
      className="relative min-h-screen bg-black text-white py-24 px-6 md:px-20 flex flex-col md:flex-row items-center justify-center overflow-hidden"
    >
      {/* <ParticlesBackground /> */}
      {/* Gradient glow background */}
      <div className="absolute inset-0 gradient opacity-30 blur-3xl -z-10" />

      {/* Left image */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        custom={1}
        className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0"
      >
        <div className="relative">
          <div className="absolute inset-0 gradient opacity-40 blur-2xl rounded-full -z-10" />
          <img
            src={ContactImg}
            alt="Contact illustration"
            className="rounded-2xl shadow-[0_0_40px_rgba(28,216,210,0.5)] object-cover w-80 md:w-[400px]"
          />
        </div>
      </motion.div>

      {/* Right form */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        custom={2}
        className="w-full md:w-1/2 bg-white/10 backdrop-blur-2xl p-8 rounded-2xl shadow-lg border border-white/10"
      >
        <motion.h2
          variants={fadeUp}
          custom={2.2}
          className="text-4xl font-extrabold mb-8 text-center md:text-left bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] bg-clip-text text-transparent"
        >
          Let’s Build Something Great Together!
        </motion.h2>

        <motion.form
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message sent successfully!");
          }}
        >
          {/* Name */}
          <motion.div variants={fadeUp} custom={2.4} className="relative">
            <input
              required
              type="text"
              name="name"
              placeholder="Your Name"
              className="peer w-full p-3 bg-white/10 border border-gray-500 text-white rounded-md focus:outline-none focus:border-[#1cd8d2] placeholder-transparent"
            />
            <label
  className="absolute left-3 top-3 text-gray-400 text-sm transition-all duration-300
    peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base
   peer-placeholder-shown:top-[-22px] peer-focus:text-[#1cd8d2] peer-focus:text-sm
   px-1 pointer-events-none"
pl
>
  Your Name
</label>


          </motion.div>

          {/* Email */}
          <motion.div variants={fadeUp} custom={2.6} className="relative">
            <input
              required
              type="email"
              name="email"
              placeholder="Your Email"
              className="peer w-full p-3 bg-white/10 border border-gray-500 text-white rounded-md focus:outline-none focus:border-[#1cd8d2] placeholder-transparent"
            />
            <label
  className="absolute left-3 top-3 text-gray-400 text-sm transition-all duration-300
  peer-placeholder-shown:top-[-22px] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base
   peer-focus:text-[#1cd8d2] peer-focus:text-sm
  px-1 pointer-events-none"
>
  Your Email
</label>

          </motion.div>

         
          
          {/* Message */}
          <motion.div variants={fadeUp} custom={3}>
            <label className="text-sm text-gray-400 mb-1 block">
              Your Message
            </label>
            <textarea
              rows="5"
              name="message"
              placeholder="Tell me more about your project..."
              className="w-full p-3 rounded-md bg-white/10 border border-gray-500 text-white focus:outline-none focus:border-[#1cd8d2]"
            ></textarea>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            variants={fadeUp}
            custom={3.2}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-2"
          >
            <button
              type="submit"
              className="w-full gradient text-white py-3 rounded-md font-semibold shadow-[0_0_20px_rgba(28,216,210,0.4)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(28,216,210,0.6)]"
            >
              Send Message 🚀
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
    </div>
  );
};

export default Contact;
