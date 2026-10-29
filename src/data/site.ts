// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Royston Akash Dsouza",
  firstName: "Royston",
  lastName: "Akash Dsouza",
  role: "Software Engineer",
  location: "India",
  timezone: "Asia/Kolkata",
  email: "roystonad2004@gmail.com",
  // Drop your CV at public/resume.pdf
  resume: "/resume.pdf",
  headline:
    "I build full-stack products and the systems underneath them — clean interfaces, solid code, real impact.",
  bio: [
    "I'm a software engineer who likes working across the whole stack: Next.js storefronts and React Native apps on the front, Go services, data pipelines and permissioned blockchains behind them.",
    "Most recently I was a software engineering intern on HPE's NetSA backend team, building sustainability goal-tracking, alerting and reporting in Python and Go — after stints in AI/ML at Zephyr and cloud & IT at Siemens Energy. These days I'm deep into agentic development — MCP servers, AI-assisted workflows, and shipping production apps with AI in the loop.",
  ],
  publicRepos: 64,
  focus: [
    "Full-stack web",
    "Distributed systems",
    "Data engineering",
    "Applied ML",
    "Blockchain",
    "Agentic AI",
  ],
};

export const socials = [
  { label: "GitHub", handle: "roystondz", href: "https://github.com/roystondz" },
  { label: "LinkedIn", handle: "royston-akash-dsouza", href: "https://www.linkedin.com/in/royston-akash-dsouza" },
  { label: "X", handle: "@roy_dz_", href: "https://x.com/roy_dz_" },
];

export type Project = {
  title: string;
  kind: string;
  year: string;
  summary: string;
  stack: string[];
  repo?: string;
  live?: string;
};

const gh = (repo: string) => `https://github.com/roystondz/${repo}`;

export const projects: Project[] = [
  {
    title: "Lisière",
    kind: "Full-stack commerce",
    year: "2026",
    summary:
      "An editorial, monochrome luxury fashion storefront with a real Postgres catalogue, email/password accounts and a shopping bag that follows you across devices. Built with agentic AI in the loop.",
    stack: ["Next.js 16", "React 19", "Neon Postgres", "Better Auth", "Playwright"],
    repo: gh("Lisi-re-Luxury"),
  },
  {
    title: "Interoperable EHRs on Hyperledger",
    kind: "Blockchain · Healthcare",
    year: "2025",
    summary:
      "A permissioned-blockchain platform for sharing electronic health records across hospitals, labs, pharmacies and insurers — role-based access, immutable audit trails and IPFS for large medical files.",
    stack: ["Hyperledger Fabric", "Go", "Node.js", "IPFS", "React"],
    repo: gh("Interoperability-of-EHRs-using-Hyperledger-Fabric-based-Blockchain-Network"),
    live: "https://blockchain-frontend-cyan.vercel.app",
  },
  {
    title: "Docs MCP Server",
    kind: "AI tooling",
    year: "2026",
    summary:
      "A Model Context Protocol server exposing a get_docs tool that searches official documentation, strips pages to clean text and feeds an LLM client grounded context for LangChain, Chroma, OpenAI, uv, Docker and Redis.",
    stack: ["Python", "MCP", "Serper", "trafilatura", "Groq"],
    repo: gh("mcp-server"),
  },
  {
    title: "EV Station Finder",
    kind: "Algorithms · Maps",
    year: "2025",
    summary:
      "Finds the best nearby EV charging station by racing four strategies against each other — Dijkstra, A*, a genetic algorithm and a machine-learning ranker.",
    stack: ["Graph search", "Genetic algorithms", "ML"],
    repo: gh("EV-Charging_Location_Finder"),
    live: "https://ev-clf-location-finder-royston.vercel.app/",
  },
  {
    title: "Spark × Airflow Pipeline",
    kind: "Data engineering",
    year: "2026",
    summary:
      "An orchestrated pipeline that validates input, submits a PySpark cleaning and feature-engineering job from Airflow, summarises insights and archives results — all on a custom Astro runtime image.",
    stack: ["Apache Airflow", "PySpark", "Docker", "Astro CLI"],
    repo: gh("spark-airflow"),
  },
  {
    title: "Termi-Notes",
    kind: "Terminal app",
    year: "2026",
    summary:
      "A fast, good-looking TUI for taking notes without leaving the terminal. Notes are plain Markdown in a local vault, with fuzzy search, timestamps and keyboard-first controls.",
    stack: ["Go", "Bubble Tea", "Lip Gloss"],
    repo: gh("CLI-notesapp"),
  },
  {
    title: "Distributed Cache Simulator",
    kind: "Systems · Visualisation",
    year: "2025",
    summary:
      "An interactive in-memory cache that visualises LRU, LFU, FIFO and MRU eviction in real time, with live hit-rate stats, an eviction log and capacity you can change on the fly.",
    stack: ["React", "Data structures"],
    repo: gh("Distributed-Cache-Simulator"),
  },
  {
    title: "Sign Language Recognition",
    kind: "Computer vision",
    year: "2026",
    summary:
      "Real-time ASL hand-gesture recognition from a webcam feed: MediaPipe for hand detection, a Keras classifier for letters, plus a data-collection tool for training new gestures.",
    stack: ["Python", "MediaPipe", "TensorFlow", "OpenCV"],
    repo: gh("Sign-Language-Recognition"),
  },
];

export const archive: Project[] = [
  { title: "Eventify", kind: "Web app", year: "2026", summary: "Event discovery and booking platform.", stack: ["JavaScript"], repo: gh("eventify"), live: "https://eventify-kw.vercel.app" },
  { title: "File Organizer CLI", kind: "CLI", year: "2025", summary: "Sorts messy folders into tidy ones from the command line.", stack: ["Node.js"], repo: gh("FileOrganizerCLI"), live: "https://file-organizer-cli.vercel.app" },
  { title: "Hotel Ops PWA", kind: "PWA", year: "2025", summary: "Table orders, receipts, reservations and notifications for a hotel.", stack: ["Node.js", "SQLite"], repo: gh("PWA"), live: "https://pwa-steel-gamma.vercel.app" },
  { title: "Finance PWA", kind: "PWA", year: "2025", summary: "Installable personal-finance tracker.", stack: ["JavaScript"], repo: gh("Finance_pwa"), live: "https://finance-pwa-blush.vercel.app" },
  { title: "MiniBlog", kind: "Web app", year: "2025", summary: "Full-stack blogging platform with role-based access.", stack: ["Next.js 14", "Tailwind"], repo: gh("Blog.v2"), live: "https://blog-v2-nu-ruby.vercel.app" },
  { title: "Customer Churn Model", kind: "ML", year: "2025", summary: "Predicts telecom customer churn from usage patterns.", stack: ["Python", "scikit-learn"], repo: gh("Customer-Churn-Prediction-Model-using-Telco") },
  { title: "Bank Iron Ledger", kind: "API", year: "2026", summary: "Express + MongoDB backend with JWT authentication.", stack: ["Express", "MongoDB", "JWT"], repo: gh("bankironledger") },
  { title: "quick-utils-lib", kind: "Library", year: "2026", summary: "Utility library for strings, arrays, math, validation and colours.", stack: ["JavaScript"], repo: gh("quick-utils-lib") },
  { title: "Campus Connect", kind: "Web app", year: "2024", summary: "A social hub for students on campus.", stack: ["JavaScript"], repo: gh("campusConnect"), live: "https://campus-connect-rp.vercel.app/" },
];

export type Role = {
  role: string;
  company: string;
  team?: string;
  period: string;
  location: string;
  highlights: string[];
  skills: string[];
};

export const experience: Role[] = [
  {
    role: "Software Engineering Intern",
    company: "Hewlett Packard Enterprise",
    team: "NetSA · Backend",
    period: "Mar 2026 — Aug 2026",
    location: "Bangalore · Hybrid",
    highlights: [
      "Designed and implemented a goal-tracking system that lets users set sustainability targets at organization and site level, with live telemetry compared against goals in near real time.",
      "Built proactive alerting that flags at-risk sustainability goals before quarter-end, paired with a recommendation engine that delivers targeted, goal-linked suggestions.",
      "Developed quarterly reporting and historical trend analysis to support data-driven sustainability planning across the organization.",
    ],
    skills: ["Python", "Go"],
  },
  {
    role: "AI/ML Intern",
    company: "Zephyr Technologies & Solutions",
    period: "Jun 2025 — Aug 2025",
    location: "Mangaluru, India · Hybrid",
    highlights: [
      "Worked with a cross-functional team to clean, preprocess and analyse large datasets using Python, Pandas and NumPy.",
      "Prepared data for ML models with StandardScaler, label encoding and one-hot encoding.",
      "Took part in model evaluation and optimization using accuracy, F1-score and confusion matrices.",
    ],
    skills: ["Python", "Pandas", "NumPy", "Machine Learning"],
  },
  {
    role: "Intern",
    company: "Siemens Energy",
    period: "May 2024 — Jun 2024",
    location: "Kuwait · On-site",
    highlights: [
      "Managed the IT ticketing system, resolving hardware, software and network issues to minimise downtime.",
      "Provided technical support and troubleshooting for system issues, user access requests and software installs.",
      "Assisted with Microsoft Azure administration — cloud resource management, security configuration and access control.",
      "Streamlined onboarding by setting up development environments, installing tooling and ensuring security compliance.",
    ],
    skills: ["Microsoft Azure", "IT Service Management"],
  },
];

export const stack: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["JavaScript", "Python", "Go", "C++", "SQL"] },
  { group: "Frontend", items: ["React", "Next.js", "React Native / Expo", "Tailwind CSS", "Motion"] },
  { group: "Backend", items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Prisma"] },
  { group: "Data & AI", items: ["PySpark", "Airflow", "Kafka", "Elasticsearch", "TensorFlow", "MCP"] },
  { group: "Infra", items: ["Docker", "Kubernetes", "Microsoft Azure", "GitHub Actions", "Vercel", "Hyperledger Fabric", "Linux"] },
];
