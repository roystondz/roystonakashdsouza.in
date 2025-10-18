import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { FiX } from 'react-icons/fi'

const OverlayMenu = ({ isOpen, onClose }) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 1024;
  const origin = isMobile ? "95% 8%" : "50% 8%";

  // Function to scroll to an element by ID and center it
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center", // <-- centers vertically
      });
    }
    onClose(); // close overlay after click
  };

  const menuItems = [
    "Home",
    "About",
    "Skills",
    "Projects",
    "Experience",
    "Testimonials",
    "Contact"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 flex items-center justify-center bg-black z-50 bg-opacity-85'
          initial={{ clipPath: `circle(0% at ${origin})` }}
          animate={{ clipPath: `circle(150% at ${origin})` }}
          exit={{ clipPath: `circle(0% at ${origin})` }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
        >
          <button
            className='absolute top-6 right-5 text-white text-3xl'
            aria-label='closemenu'
            onClick={onClose}
          >
            <FiX />
          </button>

          <ul className='space-y-6 text-center'>
            {menuItems.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <button
                  className='text-4xl text-white font-semibold hover:text-pink-400 transition-colors duration-300'
                  onClick={() => handleScroll(item.toLowerCase())}
                >
                  {item}
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OverlayMenu;
