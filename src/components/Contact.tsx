import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/resume'
import { SectionHeading } from './SectionHeading'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type Field = 'name' | 'email' | 'message'

const initial = { name: '', email: '', message: '' }

function validate(values: typeof initial): Partial<Record<Field, string>> {
  const e: Partial<Record<Field, string>> = {}
  if (!values.name.trim()) e.name = 'Please add your name.'
  if (!values.email.trim()) e.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    e.email = 'Enter a valid email address.'
  if (values.message.trim().length < 12)
    e.message = 'Message should be at least 12 characters.'
  return e
}

export function Contact() {
  const reduced = usePrefersReducedMotion()
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [sent, setSent] = useState(false)

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const next = validate(values)
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const subject = encodeURIComponent(`Portfolio inquiry from ${values.name}`)
    const body = encodeURIComponent(values.message)
    const mail = `mailto:${profile.email}?subject=${subject}&body=${body}`
    window.location.href = mail
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section
      id="contact"
      className="scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s build something sharp"
          subtitle="No backend required — this form opens your mail client with a prefilled message."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 id="contact-heading" className="sr-only">
              Contact Mahi Saxena
            </h3>
            <p className="text-slate-400">
              Prefer direct lines? Email{' '}
              <a
                className="font-medium text-cyan-300 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
                href={`mailto:${profile.email}`}
              >
                {profile.email}
              </a>{' '}
              or call{' '}
              <a
                className="font-medium text-cyan-300 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
                href={`tel:${profile.phone.replace(/\s/g, '')}`}
              >
                {profile.phone}
              </a>
              .
            </p>
            <div className="flex flex-wrap gap-3">
              {(
                [
                  ['LinkedIn', profile.social.linkedin],
                  ['GitHub', profile.social.github],
                  ['Portfolio', profile.social.portfolio],
                ] as const
              ).map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="glass rounded-xl px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            noValidate
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="glass rounded-3xl p-6 sm:p-8"
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-slate-300"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, name: e.target.value }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/30 focus:outline-none"
                  placeholder="Ada Lovelace"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'err-name' : undefined}
                />
                {errors.name ? (
                  <p id="err-name" className="mt-1 text-sm text-rose-400">
                    {errors.name}
                  </p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-slate-300"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, email: e.target.value }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/30 focus:outline-none"
                  placeholder="you@company.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'err-email' : undefined}
                />
                {errors.email ? (
                  <p id="err-email" className="mt-1 text-sm text-rose-400">
                    {errors.email}
                  </p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-slate-300"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, message: e.target.value }))
                  }
                  className="mt-1.5 w-full resize-y rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/30 focus:outline-none"
                  placeholder="What are we solving together?"
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? 'err-message' : undefined
                  }
                />
                {errors.message ? (
                  <p id="err-message" className="mt-1 text-sm text-rose-400">
                    {errors.message}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 text-sm font-semibold text-void shadow-lg transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              >
                Send via email
              </button>
              {sent ? (
                <span className="text-sm text-emerald-400" role="status">
                  Mail client should open shortly.
                </span>
              ) : null}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
