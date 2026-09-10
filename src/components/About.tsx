import { ArrowRight, FileText, Mail } from 'lucide-react'
import { RichTextRenderer } from './RichTextRenderer'
import type { AboutData, ExternalLinkItem } from '../types/index'

export function About({ about, links }: { about: AboutData | null; links: ExternalLinkItem[] }) {
  if (!about) {
    return <section id="about" className="mx-auto max-w-[1200px] px-4 py-16"><p>About information is not available yet.</p></section>
  }

  return (
    <section id="about" className="mx-auto max-w-[1200px] px-4 pb-20 pt-24 sm:pb-28 sm:pt-32">
      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#f15a24]">Mathematician & researcher</p>
        <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">Dr. Pedro Pinto</h1>

        <div className="mt-7 space-y-5 text-[15px] leading-7 text-[#aeb4bf]">
          <RichTextRenderer content={about.content} />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href="#contact" className="inline-flex items-center gap-2 rounded-md bg-[#f15a24] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#ff7542]">
            <Mail className="h-4 w-4" />
            Get in touch
          </a>
          <a href="#publications" className="inline-flex items-center gap-2 text-sm font-bold text-[#f4f0e9] transition hover:text-[#f15a24]">
            <FileText className="h-4 w-4" />
            Read my articles
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
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
        </div>
    </section>
  )
}
