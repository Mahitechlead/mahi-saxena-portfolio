import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects, type Project } from '../data/resume'
import { SectionHeading } from './SectionHeading'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

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
                  aria-hidden
                />
                <div className="relative flex flex-1 flex-col p-7">
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
