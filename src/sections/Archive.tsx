import { archive, socials } from "../data/site";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { SpotlightCard } from "../components/fx/SpotlightCard";
import { ExtLink } from "./Work";

export function Archive() {
  const github = socials.find((s) => s.label === "GitHub")!;
  return (
    <section id="archive" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <SectionHeading index="04" label="Archive" title="More from the workshop" aside="Smaller builds & experiments" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {archive.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 0.06}>
            <SpotlightCard tilt className="flex h-full flex-col rounded-2xl border border-line bg-card/40 p-6 transition-colors hover:border-muted/60">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <span>{p.kind}</span>
                <span>{p.year}</span>
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
              <div className="mt-6 flex items-center justify-between gap-4">
                <span className="truncate font-mono text-[11px] text-muted">{p.stack.join(" · ")}</span>
                <div className="flex shrink-0 gap-4 text-sm">
                  {p.live && <ExtLink href={p.live}>Live</ExtLink>}
                  {p.repo && <ExtLink href={p.repo}>Code</ExtLink>}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10 text-center">
        <ExtLink href={github.href}>Everything else on GitHub</ExtLink>
      </Reveal>
    </section>
  );
}
