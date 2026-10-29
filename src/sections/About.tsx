import { archive, experience, profile, projects, stack } from "../data/site";
import { Reveal } from "../components/Reveal";
import { CountUp } from "../components/fx/CountUp";
import { SpotlightCard } from "../components/fx/SpotlightCard";

const stats = [
  { value: profile.publicRepos, suffix: "+", label: "Public repositories" },
  { value: projects.length + archive.length, suffix: "", label: "Shipped builds" },
  { value: experience.length, suffix: "", label: "Internships" },
  { value: stack[0].items.length, suffix: "", label: "Languages" },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <div className="grid gap-10 md:grid-cols-12">
        <Reveal className="font-mono text-xs uppercase tracking-[0.18em] text-muted md:col-span-3">
          <span className="text-accent">00</span> &nbsp;About
        </Reveal>
        <div className="space-y-6 md:col-span-8 md:col-start-5">
          {profile.bio.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className={i === 0 ? "text-2xl leading-snug tracking-tight md:text-[2rem]" : "text-lg leading-relaxed text-muted"}>
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} className="bg-paper">
            <SpotlightCard className="h-full p-6 md:p-8">
              <div className="text-5xl font-semibold tracking-[-0.05em] md:text-6xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{s.label}</div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
