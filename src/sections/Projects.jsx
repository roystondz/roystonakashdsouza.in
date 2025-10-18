import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import p11 from "../assets/p11.png";
import p from "../assets/p.png";
import f from "../assets/f.png";
import f11 from "../assets/f11.png";
import e from "../assets/e.png";
import e11 from "../assets/e11.png";

const projects = [
  {
    name: "Portfolio Website",
    imgMobile: p11,
    imgDesktop: p,
    link: "#",
  },
  {
    name: "File Organizer CLI Tool",
    imgMobile: f11,
    imgDesktop: f,
    link: "https://file-organizer-cli.vercel.app/",
  },
  {
    name: "EV Charging Station Finder",
    imgMobile: e11,
    imgDesktop: e,
    link: "https://ev-clf-location-finder-royston.vercel.app/",
  },
];

const Projects = () => {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white py-24 px-6 md:px-12"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center tracking-wide">
        My Work
      </h2>

      <div className="flex flex-col items-center space-y-16">
        {projects.map((proj, i) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true, margin: "-50px" });

          return (
            <div
              key={i}
              ref={ref}
              className="w-full flex justify-center"
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <h3 className="text-[clamp(2rem,6vw,4rem)] font-bangers italic mb-6 text-center">
                  {proj.name}
                </h3>

                {/* Card mockup */}
                <div className="relative overflow-hidden shadow-2xl border border-white/20 hover:scale-105 transition-transform duration-500">
                  {/* Mobile / Desktop card size */}
                  <div className="w-[330px] h-[480px] md:w-[800px] md:h-[430px] rounded-3xl md:rounded-xl overflow-hidden">
                    <picture>
                      <source media="(min-width:768px)" srcSet={proj.imgDesktop} />
                      <img
                        src={proj.imgMobile}
                        alt={proj.name}
                        className="w-full h-full object-cover"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}

        {/* Button */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-12"
        >
          <a
            href="https://github.com/roystondz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 font-bold rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 text-black shadow-lg hover:scale-125 transform transition-transform duration-500"
          >
            🚀 View More Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
