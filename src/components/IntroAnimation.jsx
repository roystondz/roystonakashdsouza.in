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

  useEffect(() => {
    if (index < greetings.length - 1) {
      const id = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 1100);
      return () => clearTimeout(id);
    } else {
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 1300);
      return () => clearTimeout(timeout);
    }
  }, [index, greetings.length]);

  return (
    <AnimatePresence
      mode="popLayout"
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
            y: "-100%",
            transition:{duration:1.05,
            ease: [0.83, 0, 0.17, 1]
            }
          }}
          transition={{ duration: 1 }}
          className="fixed z-[9999] inset-0 flex items-center justify-center bg-black text-white overflow-hidden"
        >
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
