import type { ArticleData } from '../types/strapi'
import { getMediaUrl } from '../api/client'

export function PublicationItem({ article }: { article: ArticleData }) {
  const authors = article.authors ?? []
  const pdfUrl = getMediaUrl(article.pdf?.url) || article.pdfLink

  return (
    <article className="group relative rounded-lg border border-[#414141] bg-[#2d2d2d] p-5 transition hover:border-[#626262] sm:p-6 cursor-pointer" onClick={() => {
      if (pdfUrl) {
        window.open(pdfUrl, '_blank')
      }
    }}>
      <p className="text-xs text-[#9da5b2]">{article.journal ?? 'Research article'} · {new Date(article.date).getFullYear()}</p>
      <h3 className="mt-3 pr-8 text-lg font-bold leading-snug tracking-tight transition group-hover:text-[#f15a24] sm:text-xl">{article.title}</h3>

      {authors.length ? (
        <p className="mt-3 text-sm text-[#9da5b2]">{authors.map((author, index) => <span key={author.id ?? author.name}>{index > 0 ? ' · ' : ''}{author.link ? <a className="hover:text-[#f15a24]" href={author.link} target="_blank" rel="noreferrer">{author.name}</a> : author.name}</span>)}</p>
      ) : null}

      <div className="absolute right-5 top-5 text-xl text-[#9da5b2] transition group-hover:text-[#f15a24]">↗</div>
      <div className="mt-5 flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider">
        {article.doi ? (
          <a
            href={article.doi.startsWith('http') ? article.doi : `https://doi.org/${article.doi}`}
            target="_blank"
            rel="noreferrer"
            className="text-[#f15a24] hover:text-[#ff8756]"
            onClick={(e) => e.stopPropagation()}
          >
            DOI ↗
          </a>
        ) : null}
      </div>
    </article>
  )
}
