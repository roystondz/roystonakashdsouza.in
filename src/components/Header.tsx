import { useEffect, useState } from "react";
import { profile } from "../data/site";
import type { Theme } from "../lib/theme";
import { Magnetic } from "./fx/Magnetic";
import { Scramble } from "./fx/Scramble";
import { Moon, Search, Sun } from "./Icons";

export const navLinks = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

type Props = { theme: Theme; onToggleTheme: () => void; onOpenMenu: () => void };

export function Header({ theme, onToggleTheme, onOpenMenu }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled ? "border-b border-line bg-paper/75 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-5 md:px-10">
        <a href="#top" className="flex items-baseline gap-3">
          <span className="text-xl font-semibold tracking-[-0.04em]">
            royston<span className="text-accent">.</span>
          </span>
          <Scramble
            text={`/ ${profile.role}`}
            delay={0.4}
            className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-muted sm:inline"
          />
        </a>

        <nav className="ml-auto hidden items-center gap-7 md:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink">
              <Scramble text={l.label} onHover />
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Magnetic>
            <button
              onClick={onOpenMenu}
              className="flex h-9 items-center gap-2 rounded-full border border-line px-3 text-sm text-muted transition-colors hover:border-ink hover:text-ink"
              aria-label="Open command menu"
            >
              <Search className="size-3.5" />
              <span className="md:hidden">Menu</span>
              <kbd className="hidden font-mono text-[11px] md:inline">{isMac ? "⌘" : "Ctrl"} K</kbd>
            </button>
          </Magnetic>
          <Magnetic>
            <button
              onClick={onToggleTheme}
              className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:text-ink"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}
