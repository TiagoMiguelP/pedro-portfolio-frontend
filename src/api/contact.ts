import { fetchStrapi } from './client'
import type { ContactData, StrapiSingleResponse } from '../types/strapi'

export async function getContact(): Promise<ContactData | null> {
  const payload = await fetchStrapi<StrapiSingleResponse<ContactData>>('/api/contact')
  return payload.data ?? null
}