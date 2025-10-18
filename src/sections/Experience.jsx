import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const experiences = [
  {
    title: "Intern",
    company: "Siemens Engergy",
    period: "June 2024 - Aug 2024",
    description:
      "Onboarded as a Software Engineering Intern, contributing to internal tools and applications.",
  },
  {
    title: "AI/ML Intern",
    company: "Zephyr Tech",
    period: "June 2025 - July 2025",
    description:
      "Developed and deployed machine learning models for predictive analytics in energy consumption, improving accuracy by 15%.",
  }
];

const Experience = () => {
  const sectionRef = useRef(null);

  // Center the section in viewport when linked via navbar
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#experience" && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-black text-white py-16 px-4 md:px-10"
    >
      <h2 className="text-4xl sm:text-5xl font-semibold text-center mb-12">
        Experience
      </h2>

      {/* Desktop Horizontal Timeline */}
      <div className="hidden md:flex relative w-full max-w-7xl mx-auto justify-between items-center">
        {/* Timeline bar */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-white/15 -translate-y-1/2 rounded"></div>

        {experiences.map((exp, index) => (
          <TimelineItem key={index} experience={exp} index={index} />
        ))}
      </div>

      {/* Mobile Vertical Timeline */}
      <div className="md:hidden relative w-full max-w-md mx-auto">
        {/* Vertical bar */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-white/15 rounded"></div>

        <div className="relative flex flex-col gap-12 mt-8">
          {experiences.map((exp, index) => (
            <TimelineItem
              key={index}
              experience={exp}
              index={index}
              vertical
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ experience, index, vertical = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: { duration: 0.7, ease: "easeOut" },
      });
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: vertical ? 30 : 0, x: vertical ? 0 : index % 2 === 0 ? 0 : 0, scale: 0 }}
      animate={controls}
      className={`relative flex ${
        vertical ? "flex-col items-center" : "flex-col items-center"
      } z-10`}
    >
      {/* Marker */}
      <div
        className={`z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)] mb-4 ${
          vertical ? "" : ""
        }`}
      ></div>

      {/* Connector for vertical timeline */}
      {vertical && index < experiences.length - 1 && (
        <div className="absolute top-7 left-1/2 -translate-x-1/2 h-full w-[3px] bg-white/40"></div>
      )}

      {/* Card */}
      <article
        className={`bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-6 w-[300px] shadow-lg ${
          vertical ? "mt-4" : ""
        }`}
      >
        <h3 className="text-xl font-semibold">{experience.title}</h3>
        <p className="text-gray-400 text-sm mb-2">{experience.company} | {experience.period}</p>
        <p className="text-gray-300 text-sm">{experience.description}</p>
      </article>
    </motion.div>
  );
};

export default Experience;
