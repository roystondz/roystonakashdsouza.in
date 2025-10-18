import React, { useEffect, useRef } from "react";

const Projects = () => {
  const projectRefs = [useRef(null), useRef(null), useRef(null)];
  const buttonRef = useRef(null);
  const sectionRef = useRef(null);

  const projects = [
    {
      name: "NK Studio",
      imgMobile: "/assets/img1-mobile.JPG",
      imgDesktop: "/assets/img1-desktop.JPG",
      link: "https://www.nk.studio/"
    },
    {
      name: "Gamily",
      imgMobile: "/assets/img2-mobile.JPG",
      imgDesktop: "/assets/img2-desktop.JPG",
      link: "#"
    },
    {
      name: "Hungry Tiger",
      imgMobile: "/assets/img3-mobile.JPG",
      imgDesktop: "/assets/img3-desktop.JPG",
      link: "https://www.eathungrytiger.com/"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const scrollTop = window.scrollY;
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const progress = (scrollTop - sectionTop) / sectionHeight;

      projectRefs.forEach((ref, i) => {
        if (!ref.current) return;
        if (progress >= i / projectRefs.length && progress < (i + 1) / projectRefs.length) {
          ref.current.style.opacity = 1;
          ref.current.style.transform = "scale(1) translateY(0)";
        } else {
          ref.current.style.opacity = 0;
          ref.current.style.transform = "scale(0.95) translateY(40px)";
        }
      });

      if (buttonRef.current) {
        if (progress > 0.9) {
          buttonRef.current.style.opacity = 1;
          buttonRef.current.style.transform = "translateY(0) scale(1.1)";
        } else {
          buttonRef.current.style.opacity = 0;
          buttonRef.current.style.transform = "translateY(40px) scale(1)";
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialize animations

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#0d4d3d] text-white min-h-[300vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center tracking-wide">My Work</h2>

        <div className="relative w-full flex-1 flex items-center justify-center h-[70vh]">
          {projects.map((proj, i) => (
            <div
              key={i}
              ref={projectRefs[i]}
              className="absolute w-full max-w-5xl transition-all duration-700 scale-95 opacity-0 transform translate-y-10"
            >
              <h3 className="text-[clamp(2rem,6vw,5rem)] font-bangers italic mb-6 text-center">
                {proj.name}
              </h3>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl h-full border border-white/10">
                <picture>
                  <source media="(min-width: 768px)" srcSet={proj.imgDesktop} />
                  <img
                    src={proj.imgMobile}
                    alt={proj.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent"></div>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={buttonRef}
          className="opacity-0 mt-12 transition-all duration-700 transform translate-y-10"
        >
          <a
            href="https://www.nk.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 font-bold rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 text-black shadow-lg hover:scale-110 transform transition-transform duration-500"
          >
            🚀 View More Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
