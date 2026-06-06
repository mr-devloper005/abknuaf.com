import { SITE_CONFIG } from '@/lib/site-config'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Eye, Layers3, MapPinned } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#eef1f7] text-[#08132f]">
        <section className="bg-[#08132f] px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#ffd84d]">{pagesContent.about.badge} {SITE_CONFIG.name}</p>
              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.075em] sm:text-6xl lg:text-8xl">
                Local discovery should feel simple.
              </h1>
            </div>
            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6">
              <p className="text-lg font-bold leading-8 text-white/75">{pagesContent.about.description}</p>
              <Link href="/classified" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#ffd84d] px-5 py-3 text-sm font-black text-[#08132f]">
                Explore classifieds <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-[2.5rem] bg-[#ffd84d] p-7 sm:p-9 lg:p-11">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#4d63ff]">Our purpose</p>
              <h2 className="mt-4 text-4xl font-black leading-[0.95] tracking-[-0.06em]">A useful marketplace, without the clutter.</h2>
              <div className="mt-8 space-y-5 text-base font-semibold leading-8 text-[#08132f]/75">
              {pagesContent.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              </div>
            </article>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {pagesContent.about.values.map((value, index) => {
                const Icon = [Eye, Layers3, MapPinned][index] || CheckCircle2
                return (
                  <div key={value.title} className="flex h-full gap-5 rounded-[2rem] border border-[#d8deeb] bg-white p-6 shadow-[0_16px_38px_rgba(8,19,47,0.07)]">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#4d63ff] text-white"><Icon className="h-5 w-5" /></span>
                    <div>
                      <h2 className="text-xl font-black tracking-[-0.04em]">{value.title}</h2>
                      <p className="mt-2 text-sm leading-7 text-[#63708a]">{value.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
