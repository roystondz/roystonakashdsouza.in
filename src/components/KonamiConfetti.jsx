import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

// Utility to generate particles
const createParticle = (x, y) => ({
  x,
  y,
  vx: (Math.random() - 0.5) * 2,
  vy: (Math.random() - 1.5) * 2,
  size: Math.random() * 4 + 2,
  color: `hsl(${Math.random() * 360}, 100%, 60%)`,
});

const UltimateEasterEgg = ({ name = "Your Name" }) => {
  const canvasRef = useRef(null);
  const [activated, setActivated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [particles, setParticles] = useState([]);

  // Detect mobile
  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, []);

  // --- Desktop: Konami Code ---
  useEffect(() => {
    if (isMobile) return;
    const code = [
      "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
      "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"
    ];
    let index = 0;
    const handler = (e) => {
      if (e.key === code[index]) {
        index++;
        if (index === code.length) activateEgg();
      } else index = 0;
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isMobile]);

  // --- Mobile tap trigger ---
  const handleTap = () => {
    if (!isMobile) return;
    setTapCount((t) => {
      const newCount = t + 1;
      if (newCount >= 5) activateEgg();
      return newCount >= 5 ? 0 : newCount;
    });
  };

  // Activate Easter Egg
  const activateEgg = () => {
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    setActivated(true);
  };

  // --- Canvas particle animation ---
  useEffect(() => {
    if (!activated) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;

    // Resize canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Add initial particles
    for (let i = 0; i < 100; i++) {
      particles.push(createParticle(Math.random() * canvas.width, Math.random() * canvas.height));
    }

    // Mouse/touch interaction
    const handleMove = (e) => {
      const x = e.clientX || (e.touches && e.touches[0].clientX);
      const y = e.clientY || (e.touches && e.touches[0].clientY);
      for (let i = 0; i < 5; i++) particles.push(createParticle(x, y));
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);

    // Animate
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        if (p.y > canvas.height + 10 || p.x < -10 || p.x > canvas.width + 10) particles.splice(i, 1);
      });

      // Optional: particles forming letters of your name
      if (particles.length < 150) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const text = name;
        ctx.font = "bold 50px monospace";
        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.fillText(text, centerX - text.length * 15, centerY); // invisible text for particle targets

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const buffer32 = new Uint32Array(imageData.data.buffer);
        for (let y = 0; y < canvas.height; y += 6) {
          for (let x = 0; x < canvas.width; x += 6) {
            if (buffer32[y * canvas.width + x]) {
              particles.push(createParticle(x, y));
            }
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("resize", resize);
    };
  }, [activated, particles, name]);

  return (
    <>
      {/* Mobile tap area */}
      {isMobile && !activated && (
        <div className="absolute top-0 left-0 w-full h-20 z-50" onClick={handleTap} />
      )}

      {/* Canvas */}
      {activated && (
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
        />
      )}

      {/* Secret message */}
      {activated && (
        <div className="fixed bottom-10 right-10 bg-indigo-600 text-white p-4 rounded-lg shadow-lg z-50 text-center animate-fadeIn">
          🎉 Secret Activated! Welcome to my Particle Playground!
        </div>
      )}
    </>
  );
};

export default UltimateEasterEgg;
