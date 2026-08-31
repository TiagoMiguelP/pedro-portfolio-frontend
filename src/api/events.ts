import { fetchStrapi } from './client'
import type { EventData, StrapiListResponse } from '../types/strapi'

export async function getEvents(): Promise<EventData[]> {
  const payload = await fetchStrapi<StrapiListResponse<EventData>>('/api/events?sort=startDate:desc')
  return payload.data ?? []
}
