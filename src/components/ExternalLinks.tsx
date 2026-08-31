import type { ExternalLinkItem } from '../types/strapi'

export function ExternalLinks({ links }: { links: ExternalLinkItem[] }) {
  if (!links.length) return null

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-10">
      <div className="flex flex-wrap gap-x-5 gap-y-3 border-t border-[#292929] pt-6">
        {links.map((link) => (
          <a
            key={`${link.name}-${link.url}`}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#9da5b2] transition hover:text-[#f15a24]"
          >
            {link.name}
          </a>
        ))}
      </div>
    </section>
  )
}
