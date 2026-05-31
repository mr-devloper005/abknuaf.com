'use client'

import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

function getTone(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'visual') {
    return {
      soft: 'bg-white',
      accent: 'bg-[var(--slot4-accent)] text-white',
    }
  }
  return {
    soft: 'bg-white',
    accent: 'bg-[var(--slot4-accent)] text-white',
  }
}

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const tone = getTone(productKind)

  const lanes =
    productKind === 'visual'
      ? [
          { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss visual campaigns, features, and media-friendly partnerships.' },
          { icon: Sparkles, title: 'Usage questions', body: 'Ask about rights, placements, and public presentation details.' },
          { icon: Mail, title: 'Media notes', body: 'Share a pitch, update, or request for a more visible placement.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
            { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships and collaboration requests.' },
            { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and workflow questions.' },
          ]
        : productKind === 'directory'
          ? [
              { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify details, and bring your business profile online.' },
              { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing and local growth questions.' },
              { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can help shape it.' },
            ]
          : [
              { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
              { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
              { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
            ]

  return (
    <EditableSiteShell>
      <main className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-black leading-[0.96] tracking-[-0.06em] sm:text-5xl">{pagesContent.contact.title}</h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[var(--slot4-muted-text)]">{pagesContent.contact.description}</p>
            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className={`rounded-[1.5rem] border border-[var(--editable-border)] p-5 shadow-[0_12px_32px_rgba(16,23,40,0.06)] ${tone.soft}`}>
                  <lane.icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                  <h2 className="mt-3 text-xl font-black tracking-[-0.04em]">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[var(--editable-border)] bg-white p-6 shadow-[0_18px_45px_rgba(16,23,40,0.08)] sm:p-8">
            <h2 className="text-2xl font-black tracking-[-0.04em]">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
