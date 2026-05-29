import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2rem] border border-[var(--editable-border)] bg-white p-6 shadow-[0_18px_45px_rgba(16,23,40,0.08)] sm:p-8 lg:p-10">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.about.badge}</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-black leading-[0.96] tracking-[-0.06em] sm:text-5xl">
              About {SITE_CONFIG.name}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.about.description}</p>
            <div className="mt-8 space-y-4 text-sm leading-8 text-[var(--slot4-page-text)]">
              {pagesContent.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
          <aside className="space-y-4">
            {pagesContent.about.values.map((value) => (
              <div key={value.title} className="rounded-[1.75rem] border border-[var(--editable-border)] bg-white p-5 shadow-[0_12px_32px_rgba(16,23,40,0.06)]">
                <h2 className="text-xl font-black tracking-[-0.04em]">{value.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
