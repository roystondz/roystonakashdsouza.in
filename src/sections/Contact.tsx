import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { profile, socials } from "../data/site";
import { Reveal } from "../components/Reveal";
import { ArrowUpRight } from "../components/Icons";
import { Magnetic } from "../components/fx/Magnetic";
import { SplitText } from "../components/fx/SplitText";
import { VelocityMarquee } from "../components/fx/VelocityMarquee";

const env = {
  service: import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined,
  template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined,
  key: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined,
};
const emailjsReady = Boolean(env.service && env.template && env.key);

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!emailjsReady) {
      const data = new FormData(form);
      const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Hello from your portfolio")}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      await emailjs.sendForm(env.service!, env.template!, form, { publicKey: env.key! });
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full border-b border-line bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-muted/70 focus:border-lime";

  return (
    <section id="contact" className="py-24 md:py-32">
      <VelocityMarquee baseVelocity={2} className="mb-20 border-y border-line py-6">
        {["Available for new roles", "Let's talk", "Internships & full-time"].map((t) => (
          <span key={t} className="flex items-center gap-10 pr-10 text-5xl font-semibold tracking-[-0.05em] md:text-8xl">
            <span className="text-outline">{t}</span>
            <span className="text-3xl text-accent md:text-5xl">✦</span>
          </span>
        ))}
      </VelocityMarquee>

      <div className="mx-auto max-w-7xl px-5 md:px-10">
      <Reveal>
        <div className="flex items-center gap-3 border-t border-line pt-4 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span className="text-accent">05</span>
          <span>Contact</span>
        </div>
      </Reveal>
      <h2 className="mt-8 text-[clamp(3.2rem,10vw,9rem)] font-semibold leading-[0.9] tracking-[-0.055em]">
        <SplitText text="Let's build" />{" "}
        <SplitText text="something" delay={0.15} className="font-serif font-normal italic tracking-[-0.02em] text-accent" />{" "}
        <SplitText text="together." delay={0.25} />
      </h2>

      <div className="mt-16 grid gap-16 md:grid-cols-12">
        <Reveal className="space-y-8 md:col-span-5">
          <p className="text-lg leading-relaxed text-muted">
            Have a role, a project, or just an idea worth talking through? My inbox is open — I usually reply within a day.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-2 text-xl tracking-tight underline decoration-line underline-offset-8 transition-colors hover:text-accent hover:decoration-accent md:text-2xl"
          >
            {profile.email}
            <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <ul className="space-y-3 border-t border-line pt-8">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-sm"
                >
                  <span className="font-mono uppercase tracking-[0.14em] text-muted">{s.label}</span>
                  <span className="flex items-center gap-1 transition-colors group-hover:text-accent">
                    {s.handle}
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <form ref={formRef} onSubmit={onSubmit} className="space-y-8">
            <div className="grid gap-8 sm:grid-cols-2">
              <label className="block">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Name</span>
                <input required name="name" autoComplete="name" placeholder="Jane Doe" className={field} />
              </label>
              <label className="block">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Email</span>
                <input required type="email" name="email" autoComplete="email" placeholder="jane@company.com" className={field} />
              </label>
            </div>
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Message</span>
              <textarea required name="message" rows={4} placeholder="Tell me about it…" className={`${field} resize-none`} />
            </label>
            <div className="flex flex-wrap items-center gap-5">
              <Magnetic>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 rounded-full bg-lime px-7 py-3.5 text-sm font-semibold text-on-lime shadow-[0_0_40px_-8px] shadow-lime/60 transition-shadow hover:shadow-lime disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                  <ArrowUpRight />
                </button>
              </Magnetic>
              <p role="status" aria-live="polite" className="text-sm">
                {status === "sent" && <span className="text-ink">Thanks — message received. I'll be in touch soon.</span>}
                {status === "error" && (
                  <span className="text-accent">Something went wrong. Please email me directly.</span>
                )}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
      </div>
    </section>
  );
}
