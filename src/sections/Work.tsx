import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import { projects, type Project } from "../data/site";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { ArrowUpRight } from "../components/Icons";

export function Work() {
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 350, damping: 30 });
  const sy = useSpring(y, { stiffness: 350, damping: 30 });

  return (
    <section id="work" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <SectionHeading index="01" label="Selected work" title="Things I've built" aside={`${projects.length} projects`} />
      <ol
        className="relative border-b border-line"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - r.left);
          y.set(e.clientY - r.top);
        }}
        onPointerLeave={() => setHovered(null)}
      >
        {projects.map((p, i) => (
          <Reveal key={p.title}>
            <ProjectRow project={p} index={i} onHover={() => setHovered(i)} />
          </Reveal>
        ))}

        {/* cursor-following label (mouse only) */}
        <AnimatePresence>
          {hovered !== null && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
              style={{ x: sx, y: sy }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <div className="-translate-x-1/2 -translate-y-[140%] whitespace-nowrap rounded-full bg-lime px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-on-lime">
                {projects[hovered].live ? "Open live ↗" : "View code ↗"}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ol>
    </section>
  );
}

function ProjectRow({ project: p, index, onHover }: { project: Project; index: number; onHover: () => void }) {
  const primary = p.live ?? p.repo;
  return (
    <li
      onPointerEnter={onHover}
      className="group relative isolate grid gap-4 border-t border-line px-2 py-8 md:grid-cols-12 md:gap-8 md:px-4 md:py-10"
    >
      {/* hover sweep */}
      <span aria-hidden className="absolute inset-0 -z-10 origin-left scale-x-0 bg-card transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
      <span aria-hidden className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-lime transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />

      <div className="font-mono text-xs text-muted transition-colors group-hover:text-accent md:col-span-1 md:pt-3">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="md:col-span-6">
        <h3 className="flex items-center gap-3 text-3xl font-semibold tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-2 md:text-[2.75rem] md:leading-none">
          {primary ? (
            <a href={primary} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
              {p.title}
            </a>
          ) : (
            p.title
          )}
          <ArrowUpRight className="size-6 -translate-x-2 text-accent opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
        </h3>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">{p.summary}</p>
      </div>

      <div className="flex flex-wrap content-start gap-2 md:col-span-3 md:pt-2">
        {p.stack.map((s) => (
          <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted transition-colors group-hover:border-muted/50">
            {s}
          </span>
        ))}
      </div>

      <div className="flex items-start justify-between gap-4 md:col-span-2 md:flex-col md:items-end md:pt-2">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:text-right">
          <div className="text-ink">{p.kind}</div>
          <div>{p.year}</div>
        </div>
        <div className="relative z-10 flex gap-4 text-sm">
          {p.live && <ExtLink href={p.live}>Live</ExtLink>}
          {p.repo && <ExtLink href={p.repo}>Code</ExtLink>}
        </div>
      </div>
    </li>
  );
}

export function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
    >
      {children}
      <ArrowUpRight className="size-3.5" />
    </a>
  );
}
