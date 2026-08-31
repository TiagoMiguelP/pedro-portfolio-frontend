import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer'

export function RichTextRenderer({ content }: { content?: BlocksContent | null }) {
  if (!content?.length) return null

  return <BlocksRenderer content={content} />
}
