import { fetchStrapi } from './client'
import type { ArticleData, StrapiListResponse } from '../types/strapi'

export async function getArticles(): Promise<ArticleData[]> {
  const payload = await fetchStrapi<StrapiListResponse<ArticleData>>('/api/articles?sort=date:desc&populate[authors]=*&populate[pdf][fields][0]=url&populate[pdf][fields][1]=alternativeText')
  return payload.data ?? []
}
