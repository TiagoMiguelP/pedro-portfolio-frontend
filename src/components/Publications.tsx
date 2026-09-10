import { FileText } from 'lucide-react'
import type { ArticleData } from '../types/index'
import { PublicationItem } from './PublicationItem'

export function Publications({ articles }: { articles: ArticleData[] }) {
  const grouped = articles.reduce<Record<string, ArticleData[]>>((acc, article) => {
    const year = new Date(article.date).getFullYear().toString()
    acc[year] = [...(acc[year] ?? []), article]
    return acc
  }, {})

  const years = Object.keys(grouped).sort((a, b) => {
    return Number(b) - Number(a)
  })

  if (!articles.length) {
    return (
      <section id="publications" className="mx-auto max-w-[1200px] px-4 py-16">
        <p>No publications available yet.</p>
      </section>
    )
  }

  return (
    <section id="publications" className="mx-auto max-w-[1200px] px-4 py-16">
      <div className="mb-6 flex items-center gap-3 pb-4">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2a2a2a] text-[#f15a24]"><FileText className="h-4 w-4" /></span>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Selected articles</h2>
      </div>

      <div className="space-y-10">
        {years.map((year) => (
          <div key={year}>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#737b88]">{year}</h3>
            <div className="space-y-4">
              {grouped[year].map((article) => (
                <PublicationItem key={article.id} article={article} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
