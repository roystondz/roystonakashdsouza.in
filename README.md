# roystonakashdsouza — portfolio v4

Personal site of **Royston Akash Dsouza**, software engineer.

**Stack:** Vite 7 · React 19 · TypeScript · Tailwind CSS v4 · Motion · Three.js · EmailJS

## Develop

```bash
npm install
cp .env.example .env   # add EmailJS keys (optional — form falls back to mailto)
npm run dev
```

`npm run build` type-checks and outputs a static site to `dist/` (deploys as-is to Vercel/Netlify).

## Editing content

Everything — bio, projects, archive, experience, toolkit, socials — lives in
[`src/data/site.ts`](src/data/site.ts). Put your CV at `public/resume.pdf`.

## Features

- Graphite + acid-lime palette, Geist / Geist Mono with Instrument Serif accents
- Dark by default with a light theme toggle; no flash on load
- 3D particle portrait (Three.js) — hover to disturb, click to scatter
- Split-text reveals, scramble labels, magnetic buttons, spotlight/tilt cards,
  scroll-velocity marquees, scroll-drawn timeline, count-up stats, cursor ring
- ⌘K / Ctrl K command menu (navigation, links, copy email, theme) — doubles as the mobile menu
- Scroll-reveal motion that respects `prefers-reduced-motion`
- Contact form via EmailJS with a `mailto:` fallback
- Live local time in the footer
