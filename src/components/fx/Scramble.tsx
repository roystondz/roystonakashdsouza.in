import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#%&*+<>";

// Decoder-style text: random glyphs resolve left to right.
export function useScramble(text: string, { delay = 0, speed = 30, autoplay = true } = {}) {
  const reduce = useReducedMotion();
  const [run, setRun] = useState(autoplay ? 1 : 0);
  const [out, setOut] = useState(autoplay && !reduce ? text.replace(/\S/g, " ") : text);

  useEffect(() => {
    if (reduce || run === 0) {
      setOut(text);
      return;
    }
    let id = 0;
    const start = performance.now() + delay * 1000;
    const tick = (now: number) => {
      const t = now - start;
      if (t >= 0) {
        const revealed = Math.floor(t / speed);
        setOut(
          Array.from(text, (c, i) => (c === " " ? " " : i < revealed ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join(""),
        );
        if (revealed >= text.length) return;
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [text, delay, speed, reduce, run]);

  return { out, replay: () => setRun((r) => r + 1) };
}

type Props = { text: string; delay?: number; className?: string; onHover?: boolean };

export function Scramble({ text, delay, className, onHover }: Props) {
  const { out, replay } = useScramble(text, { delay, autoplay: !onHover });
  return (
    <span className={className} aria-label={text} onMouseEnter={onHover ? replay : undefined}>
      <span aria-hidden>{out}</span>
    </span>
  );
}
