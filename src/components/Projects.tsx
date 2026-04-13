import { useMemo, useState } from 'react'
import type { JSX } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects, type Project } from '../data/resume'
import { SectionHeading } from './SectionHeading'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/* ─── Category banner config ─────────────────────────────────────────────── */

type BannerConfig = {
  gradient: string
  accent: string
  Icon: () => JSX.Element
}

const CATEGORY_BANNERS: Record<Project['category'], BannerConfig> = {
  ml: {
    gradient: 'from-emerald-950 via-teal-900/80 to-emerald-900/50',
    accent: '#34d399',
    // Eye / object-detection icon — represents computer vision
    Icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-12 w-12 drop-shadow-lg"
        aria-hidden={true}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    ),
  },
  data: {
    gradient: 'from-sky-950 via-cyan-900/80 to-sky-900/50',
    accent: '#38bdf8',
    // Bar-chart icon — represents data analytics
    Icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-12 w-12 drop-shadow-lg"
        aria-hidden={true}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
        />
      </svg>
    ),
  },
  ai: {
    gradient: 'from-violet-950 via-purple-900/80 to-violet-900/50',
    accent: '#a78bfa',
    // Microphone icon — represents voice AI / interviews
    Icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-12 w-12 drop-shadow-lg"
        aria-hidden={true}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
        />
      </svg>
    ),
  },
  fullstack: {
    gradient: 'from-orange-950 via-amber-900/80 to-orange-900/50',
    accent: '#fb923c',
    // Code-brackets icon — represents full-stack development
    Icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-12 w-12 drop-shadow-lg"
        aria-hidden={true}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
        />
      </svg>
    ),
  },
}

/** Gradient banner with subtle dot-grid and a category SVG icon */
function ProjectBanner({ category }: { category: Project['category'] }) {
  const { gradient, accent, Icon } = CATEGORY_BANNERS[category]
  return (
    <div
      className={`relative h-28 w-full overflow-hidden bg-gradient-to-br ${gradient}`}
      aria-hidden={true}
    >
      {/* subtle dot-grid texture */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.08]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`dot-${category}`}
            x="0"
            y="0"
            width="18"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.2" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dot-${category})`} />
      </svg>
      {/* bottom gradient fade into card body */}
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/30 to-transparent" />
      {/* centred icon */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ color: accent }}
      >
        <Icon />
      </div>
    </div>
  )
}

/* ─── Tech-logo strip ─────────────────────────────────────────────────────── */

const DEVICON_BASE =
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

/** Map of technology name → Devicon SVG URL */
const TECH_LOGOS: Record<string, string> = {
  Python: `${DEVICON_BASE}/python/python-original.svg`,
  React: `${DEVICON_BASE}/react/react-original.svg`,
  'React.js': `${DEVICON_BASE}/react/react-original.svg`,
  'Node.js': `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
  MongoDB: `${DEVICON_BASE}/mongodb/mongodb-original.svg`,
  PostgreSQL: `${DEVICON_BASE}/postgresql/postgresql-original.svg`,
  Pandas: `${DEVICON_BASE}/pandas/pandas-original.svg`,
  NumPy: `${DEVICON_BASE}/numpy/numpy-original.svg`,
  Streamlit: `${DEVICON_BASE}/streamlit/streamlit-original.svg`,
  Docker: `${DEVICON_BASE}/docker/docker-original.svg`,
  Git: `${DEVICON_BASE}/git/git-original.svg`,
  Java: `${DEVICON_BASE}/java/java-original.svg`,
}

function TechLogoStrip({ stack }: { stack: string[] }) {
  const logos = stack
    .map((tech) => ({ tech, url: TECH_LOGOS[tech] }))
    .filter((item): item is { tech: string; url: string } => Boolean(item.url))
    .slice(0, 5)

  if (logos.length === 0) return null

  return (
    <div className="mb-4 flex items-center gap-2.5">
      {logos.map(({ tech, url }) => (
        <img
          key={tech}
          src={url}
          alt={tech}
          title={tech}
          width={26}
          height={26}
          className="h-[26px] w-[26px] rounded object-contain opacity-85 transition-opacity group-hover:opacity-100"
        />
      ))}
    </div>
  )
}

const categoryLabels: Record<Project['category'], string> = {
  ml: 'ML & Vision',
  data: 'Data & Analytics',
  fullstack: 'Full stack',
  ai: 'AI & Backend',
}

const categories: Array<'all' | Project['category']> = [
  'all',
  'ml',
  'data',
  'ai',
  'fullstack',
]

export function Projects() {
  const reduced = usePrefersReducedMotion()
  const [cat, setCat] = useState<(typeof categories)[number]>('all')
  const [tag, setTag] = useState<string | null>(null)

  const allTags = useMemo(() => {
    const s = new Set<string>()
    projects.forEach((p) => p.stack.forEach((t) => s.add(t)))
    return [...s].sort((a, b) => a.localeCompare(b))
  }, [])

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const catOk = cat === 'all' || p.category === cat
      const tagOk = !tag || p.stack.includes(tag)
      return catOk && tagOk
    })
  }, [cat, tag])

  return (
    <section
      id="projects"
      className="scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projects"
          title="Systems I have shipped"
          subtitle="Filter by domain or technology. Each card links out when you wire URLs in `resume.ts`."
        />
        <h3 id="projects-heading" className="sr-only">
          Project portfolio
        </h3>

        <div className="mb-8 flex flex-col gap-4">
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter by category"
          >
            {categories.map((c) => {
              const label =
                c === 'all' ? 'All' : categoryLabels[c] ?? c
              const count =
                c === 'all'
                  ? projects.length
                  : projects.filter((p) => p.category === c).length
              if (c !== 'all' && count === 0) return null
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-wide uppercase transition focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
                    cat === c
                      ? 'border-cyan-400/50 bg-cyan-500/15 text-cyan-200'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter by technology"
          >
            <button
              type="button"
              onClick={() => setTag(null)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:outline-none ${
                tag === null
                  ? 'border-violet-400/40 bg-violet-500/15 text-violet-200'
                  : 'border-white/10 bg-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              Any tech
            </button>
            {allTags.slice(0, 14).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTag((prev) => (prev === t ? null : t))}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:outline-none ${
                  tag === t
                    ? 'border-fuchsia-400/40 bg-fuchsia-500/10 text-fuchsia-100'
                    : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <motion.ul
          layout
          className="grid gap-6 lg:grid-cols-2"
          role="list"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.li
                key={p.id}
                layout
                initial={reduced ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{
                  duration: 0.45,
                  delay: reduced ? 0 : i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  reduced
                    ? undefined
                    : { y: -6, transition: { duration: 0.22 } }
                }
                className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl ring-1 ring-white/5 transition-[box-shadow] hover:shadow-[0_0_50px_-18px_rgba(167,139,250,0.45)]"
                onMouseMove={(e) => {
                  const el = e.currentTarget
                  const r = el.getBoundingClientRect()
                  el.style.setProperty(
                    '--mx',
                    `${((e.clientX - r.left) / r.width) * 100}%`,
                  )
                  el.style.setProperty(
                    '--my',
                    `${((e.clientY - r.top) / r.height) * 100}%`,
                  )
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(600px circle at var(--mx,50%) var(--my,0%), rgba(34,211,238,0.12), transparent 42%)',
                  }}
                  aria-hidden={true}
                />
                <ProjectBanner category={p.category} />
                <div className="relative flex flex-1 flex-col p-7">
                  <TechLogoStrip stack={p.stack} />
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white/5 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-cyan-300 uppercase">
                      {categoryLabels[p.category]}
                    </span>
                    <span className="text-xs text-slate-500">{p.period}</span>
                  </div>
                  <h4 className="font-display mt-3 text-2xl font-bold text-white">
                    {p.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {p.description}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-300">
                    {p.highlights.slice(0, 4).map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400/80" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-lg border border-white/10 bg-black/25 px-2 py-0.5 font-mono text-[11px] text-slate-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap gap-3 pt-6">
                    {p.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        {...(l.external
                          ? { target: '_blank', rel: 'noreferrer noopener' }
                          : {})}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
                      >
                        {l.label}
                        <span aria-hidden>↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {filtered.length === 0 ? (
          <p className="mt-8 text-center text-slate-500">
            No projects match this filter.
          </p>
        ) : null}
      </div>
    </section>
  )
}
