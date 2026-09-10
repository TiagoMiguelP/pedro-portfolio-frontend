// Re-export Supabase types for portfolio data
export type { Article as ArticleData, Author } from '../lib/api'
export type { Event as EventData } from '../lib/api'
export type { Experience as ExperienceData } from '../lib/api'
export type { About as AboutData } from '../lib/api'
export type { Contact as ContactData } from '../lib/api'
export type { SocialLink as SocialLinkData } from '../lib/api'

// For social links in external links format
export type ExternalLinkItem = {
  id: string
  name: string
  url: string
  icon?: string
  order: number
  published: boolean
}

// For compatibility
export type ExternalLink = {
  id: string
  name?: string
  links?: ExternalLinkItem[]
}
