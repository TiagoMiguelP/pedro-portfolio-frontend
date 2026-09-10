import { eventsService } from '../lib/api'
import type { EventData } from '../types/index'

export async function getEvents(): Promise<EventData[]> {
  try {
    const all = await eventsService.getAll()
    return all.filter(e => e.published).sort((a, b) => {
      const dateA = new Date(a.start_date).getTime()
      const dateB = new Date(b.start_date).getTime()
      return dateB - dateA
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}
