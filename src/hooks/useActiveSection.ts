import { useEffect, useState } from 'react'

const sectionIds = [
  'hero',
  'about',
  'skills',
  'projects',
  'experience',
  'achievements',
  'blog',
  'contact',
] as const

export type SectionId = (typeof sectionIds)[number]

export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>('hero')

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const top = visible[0]?.target.id as SectionId | undefined
        if (top && sectionIds.includes(top)) setActive(top)
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.15, 0.35, 0.5] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return active
}
