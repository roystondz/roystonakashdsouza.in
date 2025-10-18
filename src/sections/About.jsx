import React from "react";
import { motion } from "framer-motion";
import Profile from "../assets/about.png";

const About = () => {
  return (
    <div
  id="about"
  className="w-full min-h-screen bg-black relative overflow-hidden py-16"
>
  <div className="absolute inset-0">
    {/* gradient orbs */}
    <div className="absolute -top-32 -left-32 w-[70vw] md:w-[40vw] h-[70vw] md:h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse"></div>
    <div className="absolute -bottom-32 -right-32 w-[70vw] md:w-[40vw] h-[70vw] md:h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse"></div>
  </div>

  <div className="relative flex flex-col items-center w-full h-full px-4 text-center">
    <motion.h1
      className="mb-2"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] ">
        About Me
      </span>
    </motion.h1>

    <p className="text-gray-400 text-sm sm:text-base mb-10">
      A quick look at who I am and what I love doing.
    </p>

    <motion.div className="flex flex-col md:flex-row justify-center items-center md:space-x-20 space-y-8 md:space-y-0">
      <motion.img
        src={Profile}
        className="rounded-lg w-[250px] sm:w-[300px] md:w-[350px] object-contain"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />

      <div className="flex flex-col justify-center space-y-4 max-w-3xl text-center md:text-left">
        <h2 className="text-3xl sm:text-4xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f]">Royston Akash Dsouza</span>
        </h2>
        <motion.p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed px-4 md:px-0"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        >
        I am a passionate and dedicated software developer with a strong foundation in computer science and a keen interest in building innovative solutions. With experience in various programming languages and frameworks, I enjoy tackling complex problems and continuously learning new technologies. My goal is to create impactful applications that enhance user experiences and drive business success.
        </motion.p>

        <motion.div className="flex flex-row justify-center md:justify-start space-x-6 mt-6"
        initial={{y:50,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{duration:0.5,delay:0.7}}
        >
          <a href="#projects" className="px-6 py-3 bg-white rounded-lg text-black font-semibold text-sm hover:scale-105 transition">
            View Projects
          </a>
          <a href="#contact" className="px-6 py-3 border border-gray-700 rounded-lg text-white font-semibold text-sm hover:scale-105 transition">
            Get In Touch
          </a>
        </motion.div>
      </div>
    </motion.div>
  </div>
</div>

  );
};

export default About;
