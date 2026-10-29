import { motion, useReducedMotion, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

type Props = { children: ReactNode; className?: string; tilt?: boolean };

// Card with a lime spotlight that follows the cursor, plus optional 3D tilt.
export function SpotlightCard({ children, className = "", tilt = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const spring = { stiffness: 160, damping: 18 };
  const rx = useSpring(0, spring);
  const ry = useSpring(0, spring);

  return (
    <motion.div
      ref={ref}
      className={`spotlight relative ${className}`}
      style={tilt ? { rotateX: rx, rotateY: ry, transformPerspective: 900 } : undefined}
      onPointerMove={(e) => {
        const el = ref.current!;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--x", `${px * 100}%`);
        el.style.setProperty("--y", `${py * 100}%`);
        if (tilt && !reduce && e.pointerType === "mouse") {
          ry.set((px - 0.5) * 9);
          rx.set(-(py - 0.5) * 9);
        }
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
