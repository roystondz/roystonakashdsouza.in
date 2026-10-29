import { motion, useReducedMotion, type Variants } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  text: string;
  by?: "word" | "char";
  className?: string;
  delay?: number;
  stagger?: number;
  /** animate on mount instead of when scrolled into view */
  immediate?: boolean;
};

// Masked slide-up reveal, per word or per character.
export function SplitText({ text, by = "word", className, delay = 0, stagger, immediate }: Props) {
  const reduce = useReducedMotion();
  const parts = by === "char" ? Array.from(text) : text.split(" ");
  const step = stagger ?? (by === "char" ? 0.04 : 0.07);

  const variants: Variants = {
    hidden: { y: "115%", rotate: 4 },
    show: (i: number) => ({ y: "0%", rotate: 0, transition: { duration: 1, ease, delay: delay + i * step } }),
  };
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-60px" } };

  return (
    <motion.span className={className} aria-label={text} initial={reduce ? false : "hidden"} {...trigger}>
      {parts.map((p, i) => (
        <span key={i}>
          <span aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span className="inline-block origin-bottom-left" custom={i} variants={variants}>
              {p === " " ? " " : p}
            </motion.span>
          </span>
          {by === "word" && i < parts.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}
