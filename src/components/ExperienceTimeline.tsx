import { motion } from 'framer-motion'
import { timeline } from '../data/resume'
import { SectionHeading } from './SectionHeading'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const kindStyles: Record<
  (typeof timeline)[number]['kind'],
  { label: string; bar: string }
> = {
  education: {
    label: 'Education',
    bar: 'from-cyan-400 to-cyan-600',
  },
  project: {
    label: 'Project',
    bar: 'from-violet-400 to-fuchsia-500',
  },
  milestone: {
    label: 'Milestone',
    bar: 'from-slate-400 to-slate-600',
  },
}

export function ExperienceTimeline() {
  const reduced = usePrefersReducedMotion()

  return (
    <section
      id="experience"
      className="scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Journey"
          title="Experience & timeline"
          subtitle="Education and flagship builds, ordered the way the story unfolded."
        />
        <h3 id="experience-heading" className="sr-only">
          Timeline of education and projects
        </h3>

        <ol className="relative ms-2 border-s border-white/10 ps-8 md:ps-12">
          <span
            className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-cyan-500/50 via-violet-500/30 to-transparent"
            aria-hidden
          />
          {timeline.map((item, i) => {
            const ks = kindStyles[item.kind]
            return (
              <motion.li
                key={item.id}
                className="relative pb-14 last:pb-2"
                initial={reduced ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: reduced ? 0 : i * 0.07 }}
              >
                <span
                  className={`absolute -start-[5px] top-1 flex h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gradient-to-br ${ks.bar} ring-4 ring-void`}
                  aria-hidden
                />
                <div className="glass rounded-2xl p-6 transition hover:border-cyan-400/20">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] tracking-wider text-slate-400 uppercase">
                      {ks.label}
                    </span>
                    <span className="text-xs text-slate-500">{item.period}</span>
                  </div>
                  <h4 className="font-display mt-2 text-xl font-bold text-white">
                    {item.title}
                  </h4>
                  <p className="text-sm font-medium text-violet-300/90">
                    {item.org}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {item.detail}
                  </p>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
