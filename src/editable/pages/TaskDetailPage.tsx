import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Download, ExternalLink, Mail, MapPin, MessageCircle, Phone, Sparkles, Tag } from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { buildPostUrl, fetchArticleComments, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage } from '@/editable/cards/PostCards'

export const revalidate = 3

export async function generateEditableDetailMetadata(task: TaskKey, params: Promise<{ slug?: string; username?: string }>) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  return post ? await buildPostMetadata(task, post) : await buildTaskMetadata(task)
}

export async function EditableTaskDetailRoute({ task, params }: { task: TaskKey; params: Promise<{ slug?: string; username?: string }> }) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 7)).filter((item) => item.slug !== post.slug).slice(0, 4)
  const comments = task === 'article' ? await fetchArticleComments(post.slug, 50) : []
  return <TaskDetailView task={task} post={post} related={related} comments={comments} />
}

function getContent(post: SitePost) {
  return post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
}

function getField(post: SitePost, key: string) {
  const value = getContent(post)[key]
  return typeof value === 'string' ? value.trim() : ''
}

function bodyHtml(post: SitePost) {
  const c = getContent(post)
  const raw = (typeof c.body === 'string' && c.body) || (typeof c.description === 'string' && c.description) || post.summary || ''
  if (/<[a-z][\s\S]*>/i.test(raw)) return raw.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  return raw
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join('')
}

function splitSentences(text: string) {
  return text
    .split(/[.!?]+/g)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 4)
}

export function TaskDetailView({ task, post, related, comments = [] }: { task: TaskKey; post: SitePost; related: SitePost[]; comments?: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const taskConfig = getTaskConfig(task)
  const price = getField(post, 'price')
  const location = getField(post, 'location') || getField(post, 'address')
  const phone = getField(post, 'phone')
  const email = getField(post, 'email')
  const website = getField(post, 'website') || getField(post, 'url')
  const fileUrl = getField(post, 'fileUrl') || getField(post, 'pdfUrl')
  const payloadNumber = getField(post, 'payload') || getField(post, 'payloadNumber') || getField(post, 'payload_no')
  const summaryText = getEditableExcerpt(post, 220) || 'This post is ready to browse with safe fallbacks for missing details.'
  const bullets = splitSentences(summaryText)
  const backLabel = taskConfig?.label || task
  const relatedTitle =
    task === 'article'
      ? pagesContent.detailPages.article.relatedTitle
      : task === 'listing'
        ? pagesContent.detailPages.listing.relatedTitle
        : task === 'image'
          ? pagesContent.detailPages.image.relatedTitle
          : task === 'profile'
            ? pagesContent.detailPages.profile.relatedTitle
            : 'Related posts'

  if (task === 'classified') {
    const classifiedDescriptionHtml = bodyHtml(post) || `<p>${summaryText}</p>`
    const classifiedMapEmbedUrl = location
      ? `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`
      : null

    return (
      <EditableSiteShell>
        <main className="bg-[#f7f8fb] text-[var(--slot4-page-text)]">
          <section className="mx-auto max-w-[var(--editable-container)] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
            <Link
              href={taskConfig?.route || '/'}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-4 py-2 text-sm font-black transition hover:-translate-y-0.5"
            >
              ← Back to {backLabel}
            </Link>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
              <div className="space-y-6">
                <article className="overflow-hidden rounded-[2.4rem] border border-[var(--editable-border)] bg-white shadow-[0_18px_45px_rgba(16,23,40,0.08)]">
                  <div className="relative">
                    <img src={getEditablePostImage(post)} alt={post.title || 'Post image'} className="aspect-[16/10] w-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(8,16,38,0.92))] px-5 py-4 text-white sm:px-8">
                      <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/80">{getEditableCategory(post)}</p>
                      <h1 className="mt-2 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.06em] sm:text-5xl lg:text-6xl">{post.title || 'Untitled post'}</h1>
                    </div>
                  </div>
                </article>

                <div className="grid gap-3 sm:grid-cols-2">
                  {location ? <div className="inline-flex items-center gap-3 rounded-2xl border border-[var(--editable-border)] bg-white px-4 py-3 text-sm font-semibold text-[var(--slot4-muted-text)]"><MapPin className="h-4 w-4" /> {location}</div> : null}
                  {phone ? <a href={`tel:${phone}`} className="inline-flex items-center gap-3 rounded-2xl border border-[var(--editable-border)] bg-white px-4 py-3 text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:-translate-y-0.5"><Phone className="h-4 w-4" /> {phone}</a> : null}
                  {website ? <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-2xl border border-[var(--editable-border)] bg-white px-4 py-3 text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:-translate-y-0.5"><ExternalLink className="h-4 w-4" /> Website</a> : null}
                </div>

                <div className="rounded-[2rem] border border-[var(--editable-border)] bg-white p-5 sm:p-6">
                  <div className="article-content text-sm leading-8 text-[var(--slot4-page-text)]" dangerouslySetInnerHTML={{ __html: classifiedDescriptionHtml }} />
                </div>

                <section className="rounded-[2rem] border border-[var(--editable-border)] bg-[linear-gradient(180deg,#f9fbff_0%,#eef3ff_100%)] p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-xl font-black tracking-[-0.04em]">
                    <Sparkles className="h-5 w-5 text-[var(--slot4-accent)]" />
                    Quick summary
                  </div>
                  <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">A short read to help visitors scan the main points before deciding what to do next.</p>
                  <ul className="mt-4 space-y-3">
                    {(bullets.length ? bullets : [summaryText]).map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-7 text-[var(--slot4-page-text)]">
                        <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--slot4-accent)]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5">
                    <Link href={taskConfig?.route || '/classified'} className="inline-flex items-center justify-center rounded-full bg-[var(--slot4-accent)] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5">
                      Get price estimate
                    </Link>
                  </div>
                </section>

                {related.length ? (
                  <section className="rounded-[2rem] border border-[var(--editable-border)] bg-white p-5 shadow-[0_12px_35px_rgba(16,23,40,0.08)]">
                    <div className="flex items-end justify-between gap-4 border-b border-[var(--editable-border)] pb-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">Related posts</p>
                        <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Keep browsing nearby matches.</h2>
                      </div>
                    </div>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {related.map((item) => (
                        <TaskPostCard key={item.id} post={item} href={buildPostUrl(task, item.slug)} />
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>

              <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
                <div className="rounded-[2rem] border border-[var(--editable-border)] bg-white p-5 shadow-[0_12px_35px_rgba(16,23,40,0.08)]">
                  <h3 className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">Contact and details</h3>
                  <div className="mt-4 grid gap-3 text-sm font-medium text-[var(--slot4-muted-text)]">
                    {location ? <p className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {location}</p> : null}
                    {phone ? <a href={`tel:${phone}`} className="inline-flex items-center gap-2 transition hover:text-[var(--slot4-accent)]"><Phone className="h-4 w-4" /> {phone}</a> : null}
                    {email ? <a href={`mailto:${email}`} className="inline-flex items-center gap-2 transition hover:text-[var(--slot4-accent)]"><Mail className="h-4 w-4" /> {email}</a> : null}
                    {website ? <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-[var(--slot4-accent)]"><ExternalLink className="h-4 w-4" /> Website</a> : null}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-[var(--editable-border)] bg-[linear-gradient(180deg,#f7f9fc_0%,#eef3ff_100%)] p-5">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-page-text)]">
                    <Tag className="h-4 w-4 text-[var(--slot4-accent)]" />
                    Safe browsing tip: verify details before any payment.
                  </p>
                </div>

                {classifiedMapEmbedUrl ? (
                  <div className="overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-white shadow-[0_12px_35px_rgba(16,23,40,0.08)]">
                    <div className="border-b border-[var(--editable-border)] px-5 py-4">
                      <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">Location</p>
                    </div>
                    <iframe title={`${post.title} map`} src={classifiedMapEmbedUrl} className="h-64 w-full border-0" loading="lazy" />
                  </div>
                ) : null}
              </aside>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Link href={taskConfig?.route || '/'} className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-4 py-2 text-sm font-black transition hover:-translate-y-0.5">
              <ArrowLeft className="h-4 w-4" /> Back to {backLabel}
            </Link>
            <div className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.16em]">
              <span className="rounded-full bg-white px-3 py-1 text-[var(--slot4-muted-text)]">{getEditableCategory(post)}</span>
              {price ? <span className="rounded-full bg-[var(--slot4-dark-bg)] px-3 py-1 text-white">{price}</span> : null}
              {payloadNumber ? <span className="rounded-full bg-[var(--slot4-accent)] px-3 py-1 text-white">Payload {payloadNumber}</span> : null}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <article className="overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-white shadow-[0_18px_45px_rgba(16,23,40,0.08)]">
              <div className="relative">
                <img src={getEditablePostImage(post)} alt={post.title || 'Post image'} className="aspect-[16/10] w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(8,16,38,0.9))] px-5 py-4 text-white sm:px-8">
                  <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/80">{getEditableCategory(post)}</p>
                  <h1 className="mt-2 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.06em] sm:text-5xl lg:text-6xl">{post.title || 'Untitled post'}</h1>
                </div>
              </div>

              <div className="p-5 sm:p-8">
                <div className="grid gap-3 text-sm font-semibold text-[var(--slot4-muted-text)] sm:grid-cols-2">
                  {location ? <p className="inline-flex items-center gap-2 rounded-2xl border border-[var(--editable-border)] bg-[#f7f9fc] px-4 py-3"><MapPin className="h-4 w-4" /> {location}</p> : null}
                  {phone ? <a href={`tel:${phone}`} className="inline-flex items-center gap-2 rounded-2xl border border-[var(--editable-border)] bg-[#f7f9fc] px-4 py-3"><Phone className="h-4 w-4" /> {phone}</a> : null}
                  {email ? <a href={`mailto:${email}`} className="inline-flex items-center gap-2 rounded-2xl border border-[var(--editable-border)] bg-[#f7f9fc] px-4 py-3"><Mail className="h-4 w-4" /> {email}</a> : null}
                  {website ? <Link href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-[var(--editable-border)] bg-[#f7f9fc] px-4 py-3"><ExternalLink className="h-4 w-4" /> Website</Link> : null}
                  {fileUrl ? <Link href={fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-[var(--editable-border)] bg-[#f7f9fc] px-4 py-3"><Download className="h-4 w-4" /> Download file</Link> : null}
                </div>

                <div className="article-content mt-8 max-w-none text-base leading-8 text-[var(--slot4-page-text)]" dangerouslySetInnerHTML={{ __html: bodyHtml(post) || `<p>${summaryText}</p>` }} />

                <section className="mt-8 rounded-[1.75rem] border border-[var(--editable-border)] bg-[linear-gradient(180deg,#f9fbff_0%,#eef3ff_100%)] p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-xl font-black tracking-[-0.04em]">
                    <Sparkles className="h-5 w-5 text-[var(--slot4-accent)]" />
                    Quick summary
                  </div>
                  <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">A short read to help visitors scan the main points before deciding what to do next.</p>
                  <ul className="mt-4 space-y-3">
                    {(bullets.length ? bullets : [summaryText]).map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-7 text-[var(--slot4-page-text)]">
                        <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--slot4-accent)]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5">
                    <Link href={taskConfig?.route || '/classified'} className="inline-flex items-center justify-center rounded-full bg-[var(--slot4-accent)] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5">
                      Get price estimate
                    </Link>
                  </div>
                </section>

                {task === 'article' ? (
                  <section className="mt-8 rounded-[1.75rem] border border-[var(--editable-border)] bg-white p-5 sm:p-6">
                    <h2 className="flex items-center gap-2 text-xl font-black tracking-[-0.04em]">
                      <MessageCircle className="h-5 w-5 text-[var(--slot4-accent)]" /> Comments
                    </h2>
                    <div className="mt-4 grid gap-3">
                      {comments.slice(0, 6).map((comment) => (
                        <div key={comment.id} className="rounded-2xl border border-[var(--editable-border)] bg-[#f7f9fc] p-4">
                          <p className="text-sm font-black">{comment.name}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">{comment.createdAt}</p>
                          <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{comment.comment}</p>
                        </div>
                      ))}
                      {!comments.length ? <p className="text-sm text-[var(--slot4-muted-text)]">No comments yet.</p> : null}
                    </div>
                  </section>
                ) : null}
              </div>
            </article>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[2rem] border border-[var(--editable-border)] bg-white p-5 shadow-[0_12px_35px_rgba(16,23,40,0.08)]">
                <h3 className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">Contact and details</h3>
                <div className="mt-4 grid gap-2 text-sm font-medium text-[var(--slot4-muted-text)]">
                  {payloadNumber ? <p>Payload number: {payloadNumber}</p> : null}
                  {location ? <p className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {location}</p> : null}
                  {phone ? <a href={`tel:${phone}`} className="inline-flex items-center gap-2 hover:text-[var(--slot4-accent)]"><Phone className="h-4 w-4" /> {phone}</a> : null}
                  {email ? <a href={`mailto:${email}`} className="inline-flex items-center gap-2 hover:text-[var(--slot4-accent)]"><Mail className="h-4 w-4" /> {email}</a> : null}
                  {website ? <Link href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[var(--slot4-accent)]"><ExternalLink className="h-4 w-4" /> Website</Link> : null}
                </div>
              </div>

              <div className="rounded-[2rem] border border-[var(--editable-border)] bg-[linear-gradient(180deg,#f7f9fc_0%,#eef3ff_100%)] p-5">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-page-text)]">
                  <Tag className="h-4 w-4 text-[var(--slot4-accent)]" />
                  Safe browsing tip: verify details before any payment.
                </p>
              </div>
            </aside>
          </div>

          {related.length ? (
            <section className="mt-7 rounded-[2rem] border border-[var(--editable-border)] bg-white p-5 shadow-[0_12px_35px_rgba(16,23,40,0.08)]">
              <h3 className="text-lg font-black tracking-[-0.04em]">{relatedTitle}</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {related.map((item) => (
                  <Link key={item.id || item.slug} href={buildPostUrl(task, item.slug)} className="overflow-hidden rounded-[1.25rem] border border-[var(--editable-border)] bg-[#f7f9fc] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(16,23,40,0.08)]">
                    <img src={getEditablePostImage(item)} alt={item.title || 'Related post'} className="aspect-[4/3] w-full object-cover" />
                    <div className="p-3">
                      <p className="line-clamp-2 text-sm font-black leading-tight">{item.title || 'Untitled post'}</p>
                      <p className="mt-1 line-clamp-2 text-xs leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(item, 90)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </section>
      </main>
    </EditableSiteShell>
  )
}
