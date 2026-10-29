import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { experience } from "../data/site";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";

export function Experience() {
  const listRef = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });

  return (
    <section id="experience" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <SectionHeading index="02" label="Experience" title="Where I've worked" aside={`${experience.length} internships`} />
      <ul ref={listRef} className="relative">
        {/* timeline rail, drawn as you scroll */}
        <span aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-line" />
        <motion.span aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-lime" style={{ scaleY }} />

        {experience.map((e, i) => (
          <Reveal key={e.company} delay={i * 0.05}>
            <li className="relative grid gap-4 py-10 pl-10 md:grid-cols-12 md:gap-8 md:pl-14">
              <motion.span
                aria-hidden
                className="absolute left-0 top-12 size-[15px] rounded-full border border-line bg-paper"
                whileInView={{ backgroundColor: "var(--lime)", borderColor: "var(--lime)", boxShadow: "0 0 24px var(--lime)" }}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                transition={{ duration: 0.4 }}
              />

              <div className="space-y-1 font-mono text-xs uppercase tracking-[0.14em] text-muted md:col-span-3 md:pt-3">
                <div className="text-ink">{e.period}</div>
                <div>{e.location}</div>
              </div>

              <div className="md:col-span-4">
                <h3 className="text-3xl font-semibold tracking-[-0.04em] md:text-4xl">{e.company}</h3>
                <p className="mt-2 text-sm text-muted">
                  {e.role}
                  {e.team && <span className="text-accent"> · {e.team}</span>}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {e.skills.map((s) => (
                    <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="space-y-3 md:col-span-5 md:pt-2">
                {e.highlights.map((h) => (
                  <li key={h} className="flex gap-3 leading-relaxed text-muted">
                    <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-lime" />
                    {h}
                  </li>
                ))}
              </ul>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
