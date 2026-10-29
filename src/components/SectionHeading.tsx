import { Reveal } from "./Reveal";
import { Scramble } from "./fx/Scramble";
import { SplitText } from "./fx/SplitText";

type Props = { index: string; label: string; title: string; aside?: string };

export function SectionHeading({ index, label, title, aside }: Props) {
  return (
    <div className="mb-12 md:mb-16">
      <Reveal>
        <div className="flex items-center gap-3 border-t border-line pt-4 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span className="text-accent">{index}</span>
          <Scramble text={label} onHover />
          {aside && <span className="ml-auto hidden sm:block">{aside}</span>}
        </div>
      </Reveal>
      <h2 className="mt-6 font-display text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl">
        <SplitText text={title} />
      </h2>
    </div>
  );
}
