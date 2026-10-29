import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[61] h-[2px] origin-left bg-lime" style={{ scaleX }} />;
}
