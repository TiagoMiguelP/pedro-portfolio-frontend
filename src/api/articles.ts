import { articlesService } from '../lib/api'
import type { ArticleData } from '../types/index'

export async function getArticles(): Promise<ArticleData[]> {
  try {
    const articles = await articlesService.getAll(true)
    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}
