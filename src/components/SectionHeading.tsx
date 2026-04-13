import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type Props = {
  eyebrow: string
  title: string
  subtitle?: string
}

export function SectionHeading({ eyebrow, title, subtitle }: Props) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.div
      className="mb-12 max-w-2xl"
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="font-mono text-sm tracking-widest text-cyan-400/90 uppercase">
        {eyebrow}
      </p>
      <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-base leading-relaxed text-slate-400">
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  )
}
