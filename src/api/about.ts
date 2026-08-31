import { fetchStrapi } from './client'
import type { AboutData, StrapiSingleResponse } from '../types/strapi'

export async function getAbout(): Promise<AboutData | null> {
  const payload = await fetchStrapi<StrapiSingleResponse<AboutData>>('/api/about')

  return payload.data ?? null
}
