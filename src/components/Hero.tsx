import { motion } from 'framer-motion'
import { profile } from '../data/resume'
import { useTypewriter } from '../hooks/useTypewriter'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import profilePhoto from '../assets/hero.png'

export function Hero() {
  const reduced = usePrefersReducedMotion()
  const typed = useTypewriter(profile.taglines)

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center px-4 pt-28 pb-16 sm:px-6 lg:px-8"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute right-[10%] bottom-1/4 h-48 w-48 rounded-full bg-violet-500/10 blur-[90px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        {/* Two-column layout: text left, photo right */}
        <div className="flex flex-col-reverse items-center gap-10 md:flex-row md:items-center md:justify-between">

          {/* ── Left: text content ── */}
          <div className="flex-1">
            <motion.p
              className="font-mono text-sm tracking-[0.2em] text-cyan-400/90 uppercase"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {profile.location}
            </motion.p>

            <motion.h1
              id="hero-heading"
              className="font-display mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-gradient">{profile.name}</span>
            </motion.h1>

            <motion.p
              className="mt-4 max-w-2xl text-lg text-slate-400 sm:text-xl"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
            >
              {profile.headline}
            </motion.p>

            <motion.div
              className="mt-8 flex min-h-[3.5rem] items-center"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              <p className="font-mono text-base text-slate-300 sm:text-lg">
                <span className="text-cyan-400/80">{'>'}</span>{' '}
                {typed}
                <span
                  className="ml-0.5 inline-block h-5 w-0.5 translate-y-0.5 bg-cyan-400 animate-pulse"
                  aria-hidden={true}
                />
              </p>
            </motion.div>

            <motion.div
              className="mt-10 flex flex-wrap gap-3"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                className="ring-glow rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 text-sm font-semibold text-void shadow-lg transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              >
                View projects
              </button>
              <a
                href={profile.resumePdfPath}
                download
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 backdrop-blur transition hover:border-cyan-400/40 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              >
                Download resume
              </a>
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="rounded-2xl border border-transparent px-6 py-3 text-sm font-semibold text-slate-300 transition hover:text-white focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:outline-none"
              >
                Contact me
              </button>
            </motion.div>
          </div>

          {/* ── Right: circular profile photo ── */}
          <motion.div
            className="shrink-0"
            initial={reduced ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* outer glow ring */}
            <div className="relative h-52 w-52 sm:h-64 sm:w-64 lg:h-72 lg:w-72">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    'conic-gradient(from 180deg, #22d3ee, #7c3aed, #22d3ee)',
                  padding: '3px',
                }}
              >
                {/* inner circle that masks the gradient, creating a visible border ring */}
                <div className="h-full w-full rounded-full bg-void" />
              </div>
              {/* inner pulse ring */}
              <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-xl" />
              {/* photo */}
              <img
                src={profilePhoto}
                alt={`${profile.name} — profile photo`}
                className="absolute inset-[4px] h-[calc(100%-8px)] w-[calc(100%-8px)] rounded-full object-cover object-top shadow-xl"
                draggable={false}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
