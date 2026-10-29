import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { profile } from "../data/site";
import { ArrowUpRight } from "../components/Icons";
import { PortraitStage } from "../components/PortraitStage";
import { Magnetic } from "../components/fx/Magnetic";
import { Scramble } from "../components/fx/Scramble";
import { SplitText } from "../components/fx/SplitText";
import { VelocityMarquee } from "../components/fx/VelocityMarquee";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0.15]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);

  const rise = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } };

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden pt-28 md:pt-36"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {/* backdrop: cursor-lit grid + lime haze */}
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 opacity-70" />
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[640px] rounded-full bg-lime/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <motion.span {...rise(0)} className="flex items-center gap-2 rounded-full border border-line bg-card/60 px-3 py-1.5 text-ink backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-lime" />
            </span>
            <Scramble text="Open to opportunities" delay={0.2} />
          </motion.span>
          <Scramble text={profile.role} delay={0.5} />
          <Scramble text={`Based in ${profile.location}`} delay={0.7} />
        </div>

        <div className="mt-8 grid items-end gap-12 md:grid-cols-12 md:gap-8">
          <motion.div className="md:col-span-7" style={{ y: nameY, opacity: nameOpacity }}>
            <h1 className="font-display font-semibold leading-[0.85] tracking-[-0.055em]">
              <SplitText
                by="char"
                immediate
                delay={0.15}
                text={profile.firstName}
                className="block whitespace-nowrap text-[clamp(4rem,19vw,10.5rem)] md:text-[clamp(4.5rem,10vw,10.5rem)]"
              />
              <SplitText
                immediate
                delay={0.55}
                text={profile.lastName}
                className="block font-serif text-[clamp(2.8rem,8.5vw,7.5rem)] font-normal italic tracking-[-0.02em] text-muted md:text-[clamp(2.8rem,6.8vw,7rem)]"
              />
            </h1>

            <motion.div {...rise(0.8)} className="mt-12 border-t border-line pt-8">
              <p className="max-w-xl text-2xl leading-snug tracking-tight md:text-[1.75rem]">{profile.headline}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Magnetic>
                  <a
                    href="#work"
                    className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-on-lime shadow-[0_0_40px_-8px] shadow-lime/60 transition-shadow hover:shadow-lime"
                  >
                    See selected work
                    <ArrowUpRight className="size-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-paper/40 px-6 py-3 text-sm font-medium backdrop-blur transition-colors hover:border-ink"
                  >
                    Résumé
                    <ArrowUpRight />
                  </a>
                </Magnetic>
              </div>
            </motion.div>
          </motion.div>

          <motion.div {...rise(0.3)} style={{ y: portraitY }} className="md:col-span-5">
            <PortraitStage />
          </motion.div>
        </div>
      </div>

      <VelocityMarquee className="relative mt-20 border-y border-line py-5" baseVelocity={-1.5}>
        {profile.focus.map((f) => (
          <span key={f} className="flex items-center gap-10 pr-10 text-3xl font-medium tracking-[-0.03em] text-muted md:text-5xl">
            {f}
            <span className="text-2xl text-accent md:text-3xl">✦</span>
          </span>
        ))}
      </VelocityMarquee>
    </section>
  );
}
