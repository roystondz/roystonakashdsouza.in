import React from "react";
import { FaXTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa6";
import ParticlesBackground from "../components/ParticlesBackground";

const Footer = () => {
  return (
    <>
    <footer className="relative overflow-hidden bg-black text-white">
      
      {/* Gradient glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_70%_35%,rgba(28,216,210,0.25),transparent_70%)]"></div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_55%_at_30%_70%,rgba(0,191,143,0.25),transparent_70%)]"></div>

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-10 py-16 md:py-20 flex flex-col items-center text-center space-y-6">
        {/* Name / Branding */}
        <h1
          className="font-extrabold select-none text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f]
          text-[clamp(2.8rem,6vw,5rem)] tracking-wide"
          style={{ textShadow: "rgba(0,0,0,0.4) 0px 2px 18px" }}
        >
          Royston Akash Dsouza
        </h1>

        {/* Line accent */}
        <div className="h-[3px] w-24 md:w-32 rounded-full bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]" />

        {/* Social icons */}
        <div className="flex gap-6 text-2xl md:text-3xl">
          <a
            href="https://x.com/"
            aria-label="X / Twitter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#1cd8d2] transition-all duration-300 hover:scale-110"
          >
            <FaXTwitter />
          </a>

          <a
            href="https://www.linkedin.com/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#00bf8f] transition-all duration-300 hover:scale-110"
          >
            <FaLinkedinIn />
          </a>

          <a
            href="https://github.com/"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#00bf8f] transition-all duration-300 hover:scale-110"
          >
            <FaGithub />
          </a>
        </div>

        {/* Quote */}
        <p className="text-gray-400 italic max-w-xl px-4">
          “Success starts when you start trying!”
        </p>

        {/* Footer note */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Royston Akash Dsouza. All rights reserved.
        </p>
      </div>
    </footer>
    </>
  );
};

export default Footer;
