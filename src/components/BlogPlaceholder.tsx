import { motion } from 'framer-motion'
import { SectionHeading } from './SectionHeading'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function BlogPlaceholder() {
  const reduced = usePrefersReducedMotion()

  return (
    <section
      id="blog"
      className="scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8"
      aria-labelledby="blog-heading"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Writing"
          title="Blog — coming soon"
          subtitle="Long-form notes on systems, ML pipelines, and interview prep will live here."
        />
        <h3 id="blog-heading" className="sr-only">
          Blog
        </h3>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-10 text-center ring-glow"
        >
          <p className="text-slate-400">
            Placeholder section — swap this component for MDX or a CMS-driven
            feed when you are ready to publish.
          </p>
          <button
            type="button"
            disabled
            className="mt-6 cursor-not-allowed rounded-2xl border border-white/10 px-6 py-3 text-sm font-semibold text-slate-500"
          >
            Subscribe (soon)
          </button>
        </motion.div>
      </div>
    </section>
  )
}
