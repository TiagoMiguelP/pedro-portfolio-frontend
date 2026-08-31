import type { BlocksContent } from '@strapi/blocks-react-renderer'

export type StrapiMedia = {
  id?: number
  url?: string
  alternativeText?: string | null
  name?: string
  mime?: string
  formats?: Record<string, unknown>
}

export type StrapiRichTextNode = {
  type: string
  children?: StrapiRichTextNode[]
  text?: string
  url?: string
  level?: number
  format?: string
  bold?: boolean
  italic?: boolean
}

export type StrapiRichText = {
  type: 'root'
  children: StrapiRichTextNode[]
}

export type AboutData = {
  id: number
  content: BlocksContent
}

export type ArticleData = {
  id: number
  title: string
  journal?: string | null
  pdf?: StrapiMedia | null
  pdfLink?: string | null
  doi?: string | null
  authors?: AuthorData[] | null
  date: string
}

export type AuthorData = {
  id?: number
  name: string
  link?: string | null
}

export type EventData = {
  id: number
  title: string
  description?: string | null
  location?: string | null
  role?: string | null
  startDate: string
  endDate: string
}

export type ExperienceData = {
  id: number
  position: string
  startDate: string
  endDate?: string | null
  description?: string | null
  location?: string | null
}

export type ExternalLinkItem = {
  id?: number
  name: string
  url: string
  icon?: StrapiMedia[] | null
}

export type ExternalLinksData = {
  id: number
  links?: ExternalLinkItem[]
}

export type ContactData = {
  id: number
  email?: string | null
  institution?: string | null
  address?: string | null
}

export type StrapiListResponse<T> = {
  data: T[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type StrapiSingleResponse<T> = {
  data: T
}
