import type { ExperienceData } from '../types/index'

function formatDate(dateString?: string | null) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export function ExperienceItem({ experience }: { experience: ExperienceData }) {
  const start = formatDate(experience.startDate)
  const end = experience.endDate ? formatDate(experience.endDate) : 'Present'
  const dateLabel = `${start} – ${end}`

  return (
    <article className="relative">
      <span className="absolute -left-[25px] top-[0.55rem] h-2 w-2 rounded-full bg-[#f15a24]" />
      <div className="flex flex-col gap-1 sm:grid sm:grid-cols-[minmax(0,1fr)_max-content] sm:items-baseline sm:gap-4">
        <h3 className="text-xl font-bold tracking-tight">{experience.position}</h3>
        <p className="text-xs font-bold text-[#f15a24]">{dateLabel}</p>
      </div>

      {experience.location ? <p className="mt-1 text-sm text-[#aeb4bf]">{experience.location}</p> : null}
      {experience.description ? (
        <div className="mt-3 text-sm leading-6 text-[#9da5b2]">
          {experience.description}
        </div>
      ) : null}
    </article>
  )
}
