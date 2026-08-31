import { fetchStrapi } from './client'
import type { ExternalLinksData, StrapiSingleResponse } from '../types/strapi'

export async function getExternalLinks(): Promise<ExternalLinksData | null> {
  const payload = await fetchStrapi<StrapiSingleResponse<ExternalLinksData>>('/api/link?populate[links][populate]=*')
  return payload.data ?? null
}
