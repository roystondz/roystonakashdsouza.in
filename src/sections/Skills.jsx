import React from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "JavaScript", icon: "devicon-javascript-plain" },
  { name: "TypeScript", icon: "devicon-typescript-plain" },
  { name: "React", icon: "devicon-react-original" },
  { name: "Next.js", icon: "devicon-nextjs-original" },
  { name: "Node.js", icon: "devicon-nodejs-plain" },
  { name: "Python", icon: "devicon-python-plain" },
  { name: "MongoDB", icon: "devicon-mongodb-plain" },
  { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
  { name: "Docker", icon: "devicon-docker-plain" },
  { name: "AWS", icon: "devicon-amazonwebservices-plain" },
  { name: "Git", icon: "devicon-git-plain" },
  { name: "Figma", icon: "devicon-figma-plain" },
  { name: "HTML", icon: "devicon-html5-plain" },
  { name: "CSS", icon: "devicon-css3-plain" },
  { name: "Tailwind", icon: "devicon-tailwindcss-plain" },
  { name: "Express", icon: "devicon-express-original" },
  { name: "Prisma", icon: "devicon-prisma-plain" },
  { name: "Vercel", icon: "devicon-vercel-plain" },
  { name: "GitHub", icon: "devicon-github-original" },
  { name: "Postman", icon: "devicon-postman-plain" },
  { name: "VSCode", icon: "devicon-vscode-plain" },
  { name: "Linux", icon: "devicon-linux-plain" },
];


const Skills = () => {
  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center w-full min-h-[20vh] overflow-hidden bg-black text-white py-10"
    >
      {/* Background soft glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-[-10%] w-[400px] h-[400px] rounded-full bg-[#1cd8d2]/30 blur-[160px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-[-10%] w-[400px] h-[400px] rounded-full bg-[#00bf8f]/30 blur-[160px] animate-pulse delay-500"></div>
      </div>

      {/* Title */}
      <motion.div className="relative z-10 text-center mb-8"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#1cd8d2]  via-[#00bf8f] to-[#302b63] bg-clip-text text-transparent">
          My Skills
        </h2>
        <p className="mt-2 text-white/70 text-base sm:text-lg tracking-wide">
          Modern Applications | Modern Technologies
        </p>
      </motion.div>

      {/* Infinite Scrolling Skills */}
      <div className="relative z-10 w-full max-w-7xl overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap gap-16"
          animate={{ x: ["0%", "-120%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration: 5,
          }}
        >
          {[...skills, ...skills].map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center min-w-[150px] group"
            >
              <i
                className={`${skill.icon} text-[64px] transition-transform duration-300 group-hover:scale-110 bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] bg-clip-text text-transparent`}
              ></i>
              <p className="text-sm mt-1 text-white/80 group-hover:text-white">
                {skill.name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Fading edges */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
    </section>
  );
};

export default Skills;
