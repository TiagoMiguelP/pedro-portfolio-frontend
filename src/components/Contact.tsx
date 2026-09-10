import { ArrowUpRight, Building2, Mail, MapPin } from 'lucide-react'
import type { ContactData, ExternalLinkItem } from '../types/index'

export function Contact({ contact, links }: { contact: ContactData | null; links: ExternalLinkItem[] }) {
  if (!contact && !links.length) return null

  return (
    <section id="contact" className="mx-auto max-w-[1200px] px-4 py-16 sm:py-20">
      <div className="mb-6 flex items-center gap-3 border-t border-[#292929] pt-6">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2a2a2a] text-[#f15a24]"><Mail className="h-4 w-4" /></span>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Get in touch</h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-lg border border-[#414141] bg-[#2d2d2d] p-6">
          {contact?.email ? (
            <div className="flex gap-3">
              <Mail className="mt-1 h-4 w-4 shrink-0 text-[#f15a24]" />
              <div>
                <h3 className="text-base font-bold">Email</h3>
                <a className="mt-1 block break-words text-sm text-[#aeb4bf] hover:text-[#f15a24]" href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
            </div>
          ) : null}
          {contact?.institution ? (
            <div className="mt-6 flex gap-3">
              <Building2 className="mt-1 h-4 w-4 shrink-0 text-[#f15a24]" />
              <div>
                <h3 className="text-base font-bold">Institution</h3>
                <p className="mt-1 text-sm leading-6 text-[#aeb4bf]">{contact.institution}</p>
              </div>
            </div>
          ) : null}
          {contact?.address ? (
            <div className="mt-6 flex gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#f15a24]" />
              <div>
                <h3 className="text-base font-bold">Address</h3>
                <p className="mt-1 whitespace-pre-line text-sm leading-6 text-[#aeb4bf]">{contact.address}</p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="rounded-lg border border-[#414141] bg-[#2d2d2d] p-6">
          <h3 className="text-base font-bold">Research profiles</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {links.map((link) => (
              <a key={`${link.name}-${link.url}`} href={link.url} target="_blank" rel="noreferrer" className="rounded-md bg-[#151515] px-3 py-2 text-xs font-bold text-[#f4f0e9] transition hover:text-[#f15a24]">
                {link.name} <ArrowUpRight className="inline h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}