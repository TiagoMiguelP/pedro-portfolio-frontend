import { socialLinksService } from '../lib/api'
import type { ExternalLink } from '../types/index'

export async function getExternalLinks(): Promise<ExternalLink | null> {
  try {
    const links = await socialLinksService.getAll()
    const publishedLinks = links
      .filter(l => l.published)
      .sort((a, b) => a.order_index - b.order_index)
    return {
      id: 'social-links',
      links: publishedLinks.map(l => ({
        id: l.id,
        name: l.name,
        url: l.url,
        icon: l.icon_url,
        order: l.order_index,
        published: l.published
      }))
    }
  } catch (error) {
    console.error('Error fetching external links:', error)
    return null
  }
}
