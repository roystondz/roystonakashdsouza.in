import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { profile, socials } from "../data/site";
import { navLinks } from "./Header";

type Command = { id: string; group: string; label: string; hint?: string; run: () => void };

type Props = { open: boolean; onClose: () => void; onToggleTheme: () => void };

export function CommandMenu({ open, onClose, onToggleTheme }: Props) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Command[]>(() => {
    const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    return [
      { id: "top", group: "Navigate", label: "Home", run: go("top") },
      ...navLinks.map((l) => ({ id: l.id, group: "Navigate", label: l.label, run: go(l.id) })),
      ...socials.map((s) => ({
        id: s.label,
        group: "Links",
        label: s.label,
        hint: s.handle,
        run: () => window.open(s.href, "_blank", "noopener"),
      })),
      { id: "resume", group: "Links", label: "Résumé", hint: "PDF", run: () => window.open(profile.resume, "_blank", "noopener") },
      {
        id: "email",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        run: () => {
          navigator.clipboard?.writeText(profile.email);
          setCopied(true);
        },
      },
      { id: "theme", group: "Actions", label: "Toggle theme", run: onToggleTheme },
    ];
  }, [onToggleTheme]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? commands.filter((c) => `${c.label} ${c.hint ?? ""} ${c.group}`.toLowerCase().includes(q)) : commands;
  }, [commands, query]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    setCopied(false);
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const run = (c: Command) => {
    c.run();
    if (c.id !== "email") onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      run(results[active]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-ink/20 px-4 pt-[14vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-paper shadow-2xl"
            initial={{ y: 12, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 8, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onKeyDown={onKeyDown}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search…"
              className="w-full border-b border-line bg-transparent px-5 py-4 text-base outline-none placeholder:text-muted"
            />
            <ul className="max-h-[50vh] overflow-y-auto p-2" role="listbox">
              {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No results.</li>}
              {results.map((c, i) => {
                const header = c.group !== lastGroup;
                lastGroup = c.group;
                return (
                  <li key={c.id}>
                    {header && (
                      <div className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        {c.group}
                      </div>
                    )}
                    <button
                      role="option"
                      aria-selected={i === active}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => run(c)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm ${
                        i === active ? "bg-card text-ink" : "text-muted"
                      }`}
                    >
                      <span>{c.id === "email" && copied ? "Copied ✓" : c.label}</span>
                      {c.hint && <span className="truncate pl-4 font-mono text-xs text-muted">{c.hint}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="flex gap-4 border-t border-line px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span className="ml-auto">esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
