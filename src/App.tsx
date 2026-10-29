import { MotionConfig } from "motion/react";
import { useEffect, useState } from "react";
import { CommandMenu } from "./components/CommandMenu";
import { Header } from "./components/Header";
import { CursorRing } from "./components/fx/CursorRing";
import { ScrollProgress } from "./components/fx/ScrollProgress";
import { useTheme } from "./lib/theme";
import { About } from "./sections/About";
import { Archive } from "./sections/Archive";
import { Contact } from "./sections/Contact";
import { Experience } from "./sections/Experience";
import { Footer } from "./sections/Footer";
import { Hero } from "./sections/Hero";
import { Stack } from "./sections/Stack";
import { Work } from "./sections/Work";

export default function App() {
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMenuOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-on-lime">
        Skip to content
      </a>
      <ScrollProgress />
      <CursorRing />
      <Header theme={theme} onToggleTheme={toggle} onOpenMenu={() => setMenuOpen(true)} />
      <main>
        <Hero />
        <About />
        <Work />
        <Experience />
        <Stack />
        <Archive />
        <Contact />
      </main>
      <Footer />
      <CommandMenu open={menuOpen} onClose={() => setMenuOpen(false)} onToggleTheme={toggle} />
    </MotionConfig>
  );
}
