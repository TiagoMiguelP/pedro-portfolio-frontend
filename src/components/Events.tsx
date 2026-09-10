import { CalendarDays } from 'lucide-react'
import type { EventData } from '../types/index'
import { EventItem } from './EventItem'

export function Events({ events }: { events: EventData[] }) {
  console.log('Events component received events:', events) // Debugging line
  const upcoming = events.filter((event) => new Date(event.end_date) >= new Date()).sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
  const past = events
    .filter((event) => new Date(event.end_date) < new Date())
    .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())

  if (!events.length) {
    return (
      <section id="events" className="mx-auto max-w-[1200px] px-4 py-16">
        <p>No events available yet.</p>
      </section>
    )
  }

  return (
    <section id="events" className="mx-auto max-w-[1200px] px-4 py-16">
      <div className="mb-6 flex items-center gap-3 pb-4">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2a2a2a] text-[#f15a24]"><CalendarDays className="h-4 w-4" /></span>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Events</h2>
      </div>

      <div className="space-y-10">
        {upcoming.length ? (
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#737b88]">Upcoming</h3>
            <div className="grid gap-4">
              {upcoming.map((event) => (
                <EventItem key={event.id} event={event} />
              ))}
            </div>
          </div>
        ) : null}

        {past.length ? (
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#737b88]">Past</h3>
            <div className="grid gap-4">
              {past.map((event) => (
                <EventItem key={event.id} event={event} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
