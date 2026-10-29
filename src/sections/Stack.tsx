import { motion } from "motion/react";
import { stack } from "../data/site";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { SpotlightCard } from "../components/fx/SpotlightCard";

export function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <SectionHeading index="03" label="Toolkit" title="What I work with" />
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
        {stack.map((g, gi) => (
          <Reveal key={g.group} delay={gi * 0.06} className="bg-paper">
            <SpotlightCard className="h-full p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{g.group}</h3>
              <ul className="mt-5 space-y-2">
                {g.items.map((it, i) => (
                  <motion.li
                    key={it}
                    className="group/item flex items-center gap-2 text-lg tracking-tight"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.06 + i * 0.05, duration: 0.5 }}
                  >
                    <span className="h-px w-0 bg-lime transition-all duration-300 group-hover/item:w-4" />
                    <span className="transition-colors group-hover/item:text-accent">{it}</span>
                  </motion.li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
