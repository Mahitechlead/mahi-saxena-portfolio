import { motion } from 'framer-motion'
import { skillGroups } from '../data/resume'
import { SectionHeading } from './SectionHeading'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function Skills() {
  const reduced = usePrefersReducedMotion()

  return (
    <section
      id="skills"
      className="scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Skills"
          title="Stack & fundamentals"
          subtitle="Grouped the way recruiters scan: languages, backend, data, and core CS."
        />
        <h3 id="skills-heading" className="sr-only">
          Technical skills
        </h3>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <motion.article
              key={group.title}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: reduced ? 0 : gi * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                reduced
                  ? undefined
                  : { y: -4, transition: { duration: 0.2 } }
              }
              className={`glass group relative overflow-hidden rounded-3xl p-6 transition-shadow hover:shadow-[0_0_40px_-12px_rgba(34,211,238,0.35)]`}
            >
              <div
                className={`pointer-events-none absolute inset-0 opacity-80 ${group.gradientClass}`}
                aria-hidden
              />
              <div className="relative">
                <h4 className="font-display text-lg font-bold text-white">
                  {group.title}
                </h4>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <span className="inline-flex rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur transition group-hover:border-cyan-400/30">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
