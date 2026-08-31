import { fetchStrapi } from './client'
import type { ExperienceData, StrapiListResponse } from '../types/strapi'

export async function getExperiences(): Promise<ExperienceData[]> {
  const payload = await fetchStrapi<StrapiListResponse<ExperienceData>>('/api/experiences?sort=startDate:desc')
  return payload.data ?? []
}
