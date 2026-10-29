import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";

// A soft ring that trails the (still visible) system cursor and swells over links.
export function CursorRing() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [shown, setShown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    setEnabled(!reduce && matchMedia("(pointer: fine)").matches);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setShown(true);
      setActive(!!(e.target as Element).closest?.("a, button, input, textarea, [data-cursor]"));
    };
    const leave = () => setShown(false);
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full border border-lime mix-blend-difference"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ width: active ? 52 : 28, height: active ? 52 : 28, opacity: shown ? 1 : 0, backgroundColor: active ? "rgba(198,255,61,0.15)" : "rgba(198,255,61,0)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    />
  );
}
