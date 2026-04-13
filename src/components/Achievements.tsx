import { motion } from 'framer-motion'
import { awards, certifications, extracurricular } from '../data/resume'
import { SectionHeading } from './SectionHeading'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function Achievements() {
  const reduced = usePrefersReducedMotion()

  return (
    <section
      id="achievements"
      className="scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8"
      aria-labelledby="achievements-heading"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Achievements"
          title="Credentials, wins, and momentum"
          subtitle="Certifications from Oracle, Cisco, and Infosys—plus competition outcomes and community work."
        />
        <h3 id="achievements-heading" className="sr-only">
          Certifications and awards
        </h3>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="font-display text-lg font-bold text-white">
              Certifications
            </h4>
            <ul className="mt-4 space-y-3">
              {certifications.map((c) => (
                <li
                  key={c.name}
                  className="glass flex flex-col gap-1 rounded-2xl px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-slate-200">{c.name}</p>
                    <p className="text-sm text-slate-500">{c.issuer}</p>
                  </div>
                  <span className="font-mono text-xs text-cyan-400/90">
                    {c.date}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.06 }}
          >
            <h4 className="font-display text-lg font-bold text-white">
              Awards & highlights
            </h4>
            <ul className="mt-4 space-y-3">
              {awards.map((a) => (
                <li key={a.title} className="glass rounded-2xl px-5 py-4">
                  <p className="font-semibold text-violet-200">{a.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{a.body}</p>
                </li>
              ))}
            </ul>

            <h4 className="font-display mt-10 text-lg font-bold text-white">
              Extracurricular
            </h4>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-400">
              {extracurricular.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
