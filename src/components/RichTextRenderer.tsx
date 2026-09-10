export function RichTextRenderer({ content }: { content?: string | null }) {
  if (!content) return null

  // Render plain text content with line breaks
  return (
    <div className="prose prose-sm">
      {content.split('\n').map((paragraph, idx) => (
        <p key={idx}>{paragraph}</p>
      ))}
    </div>
  )
}
