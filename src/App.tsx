import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { ExperienceTimeline } from './components/ExperienceTimeline'
import { Achievements } from './components/Achievements'
import { BlogPlaceholder } from './components/BlogPlaceholder'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { CursorGlow } from './components/CursorGlow'
import { useActiveSection } from './hooks/useActiveSection'
function App() {
  const active = useActiveSection()

  return (
    <div className="relative min-h-svh">
      <a
        href="#main"
        className="text-void absolute top-4 left-[-9999px] z-[100] rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold shadow-lg focus:left-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        Skip to content
      </a>
      <CursorGlow />
      <Navbar active={active} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ExperienceTimeline />
        <Achievements />
        <BlogPlaceholder />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
