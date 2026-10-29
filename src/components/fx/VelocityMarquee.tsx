import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef, type ReactNode } from "react";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

type Props = { children: ReactNode; baseVelocity?: number; className?: string };

// Endless marquee that speeds up — and flips direction — with scroll velocity.
export function VelocityMarquee({ children, baseVelocity = -2, className = "" }: Props) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    const move = direction.current * baseVelocity * (delta / 1000);
    baseX.set(baseX.get() + move + move * Math.abs(f));
  });

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden>
      <motion.div className="flex w-max whitespace-nowrap" style={{ x }}>
        <div className="flex">{children}{children}</div>
        <div className="flex">{children}{children}</div>
      </motion.div>
    </div>
  );
}
