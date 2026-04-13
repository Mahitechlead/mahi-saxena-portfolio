import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { SectionId } from '../hooks/useActiveSection'
import { profile } from '../data/resume'

const links: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Timeline' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
]

type Props = { active: SectionId }

export function Navbar({ active }: Props) {
  const [open, setOpen] = useState(false)

  const scrollTo = (id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      <div className="glass mx-auto mt-3 flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-3 shadow-[var(--shadow-glow)] sm:px-6">
        <a
          href="#hero"
          className="font-display text-lg font-bold tracking-tight text-gradient"
          onClick={(e) => {
            e.preventDefault()
            scrollTo('hero')
          }}
        >
          {profile.name.split(' ')[0]}
          <span className="text-slate-500">.</span>
        </a>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary"
        >
          {links.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => scrollTo(l.id)}
              className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                active === l.id
                  ? 'bg-white/10 text-cyan-300'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">Menu</span>
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => scrollTo(l.id)}
                  className={`rounded-xl px-3 py-3 text-left text-sm font-medium ${
                    active === l.id
                      ? 'bg-white/10 text-cyan-300'
                      : 'text-slate-300'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
