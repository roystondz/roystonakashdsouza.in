import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

const IntroAnimation = ({ onFinish }) => {
  const greetings = useMemo(
    () => [
      "Welcome to My Portfolio",
      "Hi there! Glad you're here.",
      "Explore my work and projects.",
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [showWhite, setShowWhite] = useState(false);

  useEffect(() => {
    if (index < greetings.length - 1) {
      const id = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 1100);
      return () => clearTimeout(id);
    } else {
      // show white scroll after last text
      const timeout = setTimeout(() => {
        setShowWhite(true);
        setTimeout(() => {
          setVisible(false);
        }, 1800); // duration for scroll + fade
      }, 1300);
      return () => clearTimeout(timeout);
    }
  }, [index, greetings.length]);

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        if (onFinish) onFinish();
      }}
    >
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8 },
          }}
          className="fixed z-[9999] inset-0 flex items-center justify-center bg-black text-white overflow-hidden"
        >
          {/* Greeting text */}
          <motion.h1
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-center"
          >
            {greetings[index]}
          </motion.h1>

          {/* White scroll transition */}
          {showWhite && (
            <motion.div
              key="white-scroll"
              className="absolute inset-0 bg-white  z-[10000]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{
                duration: 1.8,
                ease: [0.76, 0, 0.24, 1],
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
