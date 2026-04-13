import { profile } from '../data/resume'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8"
      role="contentinfo"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-center text-sm text-slate-500 sm:text-left">
          © {year} {profile.name}. Crafted with React, Tailwind CSS, and Framer
          Motion.
        </p>
        <p className="font-mono text-xs text-slate-600">
          Kanpur · Open to internships & collaborations
        </p>
      </div>
    </footer>
  )
}
