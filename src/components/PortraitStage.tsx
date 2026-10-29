import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { lazy, Suspense, useState } from "react";
import { profile } from "../data/site";

const ParticlePortrait = lazy(() => import("./ParticlePortrait"));

const SRC = "/portrait.jpg";

export function PortraitStage() {
  const reduce = useReducedMotion() ?? false;
  const [mode, setMode] = useState<"3d" | "photo">("3d");
  const [count, setCount] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const show3d = mode === "3d" && !failed;

  const photo = (
    <img
      src={SRC}
      alt={`Portrait of ${profile.name}`}
      width={864}
      height={1184}
      className="absolute inset-0 h-full w-full object-cover object-top grayscale"
    />
  );

  return (
    <figure>
      <div className="group/stage relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#060708] text-[#f2f4f7]">
        {/* soft glow behind the figure */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_40%,rgba(198,255,61,0.10),transparent_70%)]" />

        <AnimatePresence initial={false}>
          {show3d ? (
            <motion.div key="3d" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Suspense fallback={null}>
                <ParticlePortrait src={SRC} reducedMotion={reduce} onReady={setCount} onError={() => setFailed(true)} />
              </Suspense>
            </motion.div>
          ) : (
            <motion.div key="photo" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {photo}
            </motion.div>
          )}
        </AnimatePresence>

        {/* HUD */}
        <div className="pointer-events-none absolute inset-0 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f2f4f7]/60">
          {(["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "left-3 bottom-3 border-l border-b", "right-3 bottom-3 border-r border-b"] as const).map((c) => (
            <span key={c} className={`absolute size-4 border-[#f2f4f7]/40 ${c}`} />
          ))}
          <div className="absolute left-6 top-5 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#c6ff3d]" />
            {show3d ? "Live render" : "Photograph"}
          </div>
          {show3d && count !== null && (
            <div className="absolute right-6 top-5 tabular-nums">{count.toLocaleString()} pts</div>
          )}
          {show3d && (
            <div className="absolute bottom-5 left-6 transition-opacity duration-500 group-hover/stage:opacity-0">
              Hover to disturb · click to scatter
            </div>
          )}
        </div>

        <button
          onClick={() => setMode((m) => (m === "3d" ? "photo" : "3d"))}
          disabled={failed}
          className="absolute bottom-4 right-4 rounded-full border border-[#f2f4f7]/25 bg-[#060708]/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#f2f4f7]/80 backdrop-blur transition-colors hover:border-[#f2f4f7]/60 hover:text-[#f2f4f7] disabled:hidden"
        >
          {show3d ? "View photo" : "View 3D"}
        </button>
      </div>
      <figcaption className="mt-3 flex justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        <span>Fig. 01</span>
        <span>{profile.name}</span>
      </figcaption>
    </figure>
  );
}
