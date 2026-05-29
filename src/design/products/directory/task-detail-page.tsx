import Link from 'next/link'
import { ArrowLeft, ArrowRight, ExternalLink, Globe, Mail, MapPin, Phone, ShieldCheck, Sparkles, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  if (task === 'classified') {
    return (
      <div className="min-h-screen bg-[#f7f8fb] text-slate-950">
        <SchemaJsonLd data={schemaPayload} />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <Link href={taskRoute} className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black transition hover:-translate-y-0.5">
            <ArrowLeft className="h-4 w-4" /> Back to {taskLabel}
          </Link>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="space-y-6">
              <article className="overflow-hidden rounded-[2.4rem] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(16,23,40,0.08)]">
                <div className="relative">
                  <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(8,16,38,0.92))] px-5 py-4 text-white sm:px-8">
                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/80">{category}</p>
                    <h1 className="mt-2 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.06em] sm:text-5xl lg:text-6xl">{post.title}</h1>
                  </div>
                </div>
              </article>

              <div className="grid gap-3 sm:grid-cols-2">
                {location ? <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600"><MapPin className="h-4 w-4" /> {location}</div> : null}
                {phone ? <a href={`tel:${phone}`} className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:-translate-y-0.5"><Phone className="h-4 w-4" /> {phone}</a> : null}
                {website ? <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:-translate-y-0.5"><ExternalLink className="h-4 w-4" /> Website</a> : null}
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-5 sm:p-6">
                <p className="text-sm leading-8 text-slate-700">{description}</p>
              </div>

              {highlights.length ? (
                <div className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#f9fbff_0%,#eef3ff_100%)] p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-xl font-black tracking-[-0.04em]">
                    <Sparkles className="h-5 w-5 text-[var(--slot4-accent)]" />
                    Quick summary
                  </div>
                  <ul className="mt-4 space-y-3">
                    {highlights.slice(0, 4).map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-7 text-slate-700">
                        <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--slot4-accent)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {related.length ? (
                <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(16,23,40,0.08)]">
                  <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Related posts</p>
                      <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Keep browsing nearby matches.</h2>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {related.map((item) => (
                      <TaskPostCard key={item.id || item.slug} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
                    ))}
                  </div>
                </section>
              ) : null}
            </div>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(16,23,40,0.08)]">
                <h3 className="text-xs font-black uppercase tracking-[0.24em] text-slate-500">Contact and details</h3>
                <div className="mt-4 grid gap-3 text-sm font-medium text-slate-600">
                  {location ? <p className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {location}</p> : null}
                  {phone ? <a href={`tel:${phone}`} className="inline-flex items-center gap-2 transition hover:text-slate-950"><Phone className="h-4 w-4" /> {phone}</a> : null}
                  {email ? <a href={`mailto:${email}`} className="inline-flex items-center gap-2 transition hover:text-slate-950"><Mail className="h-4 w-4" /> {email}</a> : null}
                  {website ? <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-slate-950"><ExternalLink className="h-4 w-4" /> Website</a> : null}
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#f7f9fc_0%,#eef3ff_100%)] p-5">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Tag className="h-4 w-4 text-[var(--slot4-accent)]" />
                  Safe browsing tip: verify details before any payment.
                </p>
              </div>

              {mapEmbedUrl ? (
                <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_12px_35px_rgba(16,23,40,0.08)]">
                  <div className="border-b border-slate-200 px-5 py-4">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-500">Location</p>
                  </div>
                  <iframe title={`${post.title} map`} src={mapEmbedUrl} className="h-64 w-full border-0" loading="lazy" />
                </div>
              ) : null}
            </aside>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href={taskRoute} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950">
          ← Back to {taskLabel}
        </Link>

        <section className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div>
            <div className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
              <div className="relative h-[420px] overflow-hidden bg-slate-100">
                <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
              </div>
              {images.length > 1 ? (
                <div className="grid grid-cols-4 gap-3 p-4">
                  {images.slice(1, 5).map((image) => (
                    <div key={image} className="relative h-24 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                      <ContentImage src={image} alt={post.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">About this {task}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Structured details instead of a generic content block.</h2>
              <p className="mt-4 text-sm leading-8 text-slate-600">{description}</p>
              {highlights.length ? (
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {highlights.slice(0, 4).map((item) => (
                    <div key={item} className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{category || taskLabel}</p>
                  <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">{post.title}</h1>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified
                </span>
              </div>

              <div className="mt-6 grid gap-3">
                {location ? <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><MapPin className="h-4 w-4" /> {location}</div> : null}
                {phone ? <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><Phone className="h-4 w-4" /> {phone}</div> : null}
                {email ? <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><Mail className="h-4 w-4" /> {email}</div> : null}
                {website ? <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><Globe className="h-4 w-4" /> {website}</div> : null}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {website ? <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">Visit website <ArrowRight className="h-4 w-4" /></a> : null}
                <Link href={taskRoute} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100">Browse more</Link>
              </div>
            </div>

            {mapEmbedUrl ? (
              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
                <div className="border-b border-slate-200 px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Location</p>
                </div>
                <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[320px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : null}

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Quick trust cues</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {['Clear contact details', 'Stronger business framing', 'Map and location cues', 'Related surfaces nearby'].map((item) => (
                  <div key={item} className="rounded-[1.3rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {related.length ? (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Related surfaces</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Keep browsing nearby matches.</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
