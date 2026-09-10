import { BriefcaseBusiness } from 'lucide-react'
import type { ExperienceData } from '../types/index'
import { ExperienceItem } from './ExperienceItem'

export function Experience({ experiences }: { experiences: ExperienceData[] }) {
  const sorted = [...experiences].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())

  if (!sorted.length) {
    return (
      <section id="experience" className="mx-auto max-w-[1200px] px-4 py-16">
        <p>No experience entries yet.</p>
      </section>
    )
  }

  return (
    <section id="experience" className="mx-auto max-w-[1200px] px-4 py-16">
      <div className="mb-7 flex items-center gap-3 pb-4">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2a2a2a] text-[#f15a24]"><BriefcaseBusiness className="h-4 w-4" /></span>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Experience</h2>
      </div>

      <div className="relative space-y-7 border-l border-[#383838] pl-5">
        {sorted.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </div>
    </section>
  )
}
