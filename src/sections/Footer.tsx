import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { profile } from "../data/site";
import { useLocalTime } from "../lib/useLocalTime";

export function Footer() {
  const time = useLocalTime(profile.timezone);
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 120, 0]);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:flex-row sm:items-center md:px-10">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="flex items-center gap-2 sm:mx-auto">
          <span className="size-1.5 animate-pulse rounded-full bg-lime" />
          {profile.location} · {time} local
        </span>
        <a href="#top" className="transition-colors hover:text-ink">
          Back to top ↑
        </a>
      </div>
      <motion.div
        aria-hidden
        style={{ y }}
        className="select-none whitespace-nowrap text-center text-[23vw] font-semibold leading-[0.75] tracking-[-0.07em] text-outline"
      >
        royston<span className="text-lime [-webkit-text-stroke:0]">.</span>
      </motion.div>
    </footer>
  );
}
