import { socialLinksService } from '../lib/api'
import type { ExternalLink } from '../types/index'

export async function getExternalLinks(): Promise<ExternalLink | null> {
  try {
    const links = await socialLinksService.getAll()
    const publishedLinks = links.filter(l => l.published).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    return {
      id: 'social-links',
      links: publishedLinks.map(l => ({
        id: l.id,
        name: l.name,
        url: l.url,
        icon: l.icon,
        order: l.order ?? 0,
        published: l.published
      }))
    }
  } catch (error) {
    console.error('Error fetching external links:', error)
    return null
  }
}
