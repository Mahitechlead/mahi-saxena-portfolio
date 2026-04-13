import { motion } from 'framer-motion'
import { profile } from '../data/resume'
import { SectionHeading } from './SectionHeading'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function About() {
  const reduced = usePrefersReducedMotion()

  return (
    <section
      id="about"
      className="scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title="Built for reliability, tuned for impact"
          subtitle="A concise snapshot of how I work and what I optimize for."
        />

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="glass rounded-3xl p-8 ring-glow"
          >
            <h3 id="about-heading" className="sr-only">
              About Mahi Saxena
            </h3>
            <p className="text-lg leading-relaxed text-slate-300">
              {profile.summary}
            </p>
          </motion.div>

          <motion.ul
            className="space-y-4"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            {profile.strengths.map((s, i) => (
              <li
                key={i}
                className="glass flex gap-4 rounded-2xl p-5 transition hover:border-cyan-400/25"
              >
                <span
                  className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-cyan-300"
                  aria-hidden
                >
                  ✦
                </span>
                <span className="text-slate-300">{s}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
