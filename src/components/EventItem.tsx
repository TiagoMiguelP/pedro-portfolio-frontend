import { MapPin } from 'lucide-react'
import type { EventData } from '../types/index'

export function EventItem({ event }: { event: EventData }) {
  const startDate = new Date(event.start_date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
  const endDate = new Date(event.end_date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <article className="rounded-lg border border-[#383838] bg-[#202020] p-5 transition hover:border-[#555] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-bold tracking-tight">{event.title}</h3>
          {event.description ? <p className="mt-2 text-sm text-[#aeb4bf]">{event.description}</p> : null}
          {event.location ? (
            <div className="mt-4 flex items-center gap-2 text-xs text-[#737b88]">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          ) : null}
        </div>


        <div className="flex gap-3 items-center align-center">
          <p className="text-xs font-bold text-[#737b88]">
            {startDate} — {endDate}
          </p>
          {event.role ? (
            <p className="inline-flex rounded-full px-3 py-1 text-xs font-bold tracking-[0.18em] text-[#f15a24]"  style={{ backgroundColor: "color-mix(in oklab, #f15a24 10%, transparent)" }}>
              {event.role}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  )
}
