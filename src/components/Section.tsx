import type { ReactNode } from 'react'

export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow?: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-[1400px] px-4 py-16">
      <div className="mb-8 flex items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          {eyebrow ? (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {title}
          </h2>
        </div>
      </div>
      {children}
    </section>
  )
}
