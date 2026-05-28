import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Download, ExternalLink, Mail, MapPin, MessageCircle, Phone, Tag } from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { buildPostUrl, fetchArticleComments, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getEditableExcerpt, getEditablePostImage } from '@/editable/cards/PostCards'

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
  return raw.split(/\n{2,}/).map((p) => `<p>${p}</p>`).join('')
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

  return (
    <EditableSiteShell>
      <main className="bg-[#EAE0CF] text-[#111844]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <Link href={taskConfig?.route || '/'} className="inline-flex items-center gap-2 rounded-full border border-[#7288AE]/35 bg-white px-4 py-2 text-sm font-black"><ArrowLeft className="h-4 w-4" /> Back to {taskConfig?.label || task}</Link>
              <div className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#4B5694]">
                <span className="rounded-full bg-[#d9dff0] px-3 py-1">{taskConfig?.label || task}</span>
                {price ? <span className="rounded-full bg-[#111844] px-3 py-1 text-[#EAE0CF]">{price}</span> : null}
                {payloadNumber ? <span className="rounded-full bg-[#4B5694] px-3 py-1 text-[#EAE0CF]">Payload {payloadNumber}</span> : null}
              </div>
            </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <article className="overflow-hidden rounded-3xl border border-[#7288AE]/30 bg-white shadow-[0_20px_60px_rgba(17,24,68,0.13)]">
              <img src={getEditablePostImage(post)} alt={post.title} className="mx-auto aspect-[16/9] max-h-[420px] w-full max-w-5xl object-cover" />
              <div className="p-5 sm:p-8">
                <h1 className="text-4xl font-black leading-[0.95] tracking-[-0.05em] sm:text-5xl">{post.title}</h1>
                <div className="mt-6 grid gap-3 text-sm font-bold text-[#5f6b93] sm:grid-cols-2">
                  {location ? <p className="inline-flex items-center gap-2 rounded-2xl border border-[#7288AE]/25 bg-[#fff8f1] px-4 py-3"><MapPin className="h-4 w-4" /> {location}</p> : null}
                  {phone ? <a href={`tel:${phone}`} className="inline-flex items-center gap-2 rounded-2xl border border-[#7288AE]/25 bg-[#fff8f1] px-4 py-3"><Phone className="h-4 w-4" /> {phone}</a> : null}
                  {email ? <a href={`mailto:${email}`} className="inline-flex items-center gap-2 rounded-2xl border border-[#7288AE]/25 bg-[#fff8f1] px-4 py-3"><Mail className="h-4 w-4" /> {email}</a> : null}
                  {website ? <Link href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-[#7288AE]/25 bg-[#fff8f1] px-4 py-3"><ExternalLink className="h-4 w-4" /> Website</Link> : null}
                  {fileUrl ? <Link href={fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-[#7288AE]/25 bg-[#fff8f1] px-4 py-3"><Download className="h-4 w-4" /> Download file</Link> : null}
                </div>
                <div className="article-content mt-7 max-w-none text-base leading-8 text-[#5f6b93]" dangerouslySetInnerHTML={{ __html: bodyHtml(post) || `<p>${getEditableExcerpt(post, 220)}</p>` }} />

                {task === 'article' ? (
                  <section className="mt-8 rounded-3xl border border-[#7288AE]/30 bg-[#fff8f1] p-5">
                    <h2 className="flex items-center gap-2 text-xl font-black"><MessageCircle className="h-5 w-5" /> Comments</h2>
                    <div className="mt-4 grid gap-3">
                      {comments.slice(0, 6).map((comment) => <div key={comment.id} className="rounded-2xl border border-[#7288AE]/25 bg-white p-4"><p className="text-sm font-black">{comment.name}</p><p className="mt-2 text-sm leading-6 text-[#5f6b93]">{comment.comment}</p></div>)}
                      {!comments.length ? <p className="text-sm text-[#5f6b93]">No comments yet.</p> : null}
                    </div>
                  </section>
                ) : null}
              </div>
            </article>

            <aside className="space-y-5">
              <div className="rounded-3xl border border-[#7288AE]/30 bg-white p-5 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#4B5694]">Contact and details</h3>
                <div className="mt-4 grid gap-2 text-sm font-bold text-[#5f6b93]">
                  {payloadNumber ? <p>Payload number: {payloadNumber}</p> : null}
                  {location ? <p className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {location}</p> : null}
                  {phone ? <a href={`tel:${phone}`} className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> {phone}</a> : null}
                  {email ? <a href={`mailto:${email}`} className="inline-flex items-center gap-2"><Mail className="h-4 w-4" /> {email}</a> : null}
                  {website ? <Link href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2"><ExternalLink className="h-4 w-4" /> Website</Link> : null}
                </div>
              </div>

              <div className="rounded-3xl border border-[#7288AE]/30 bg-white p-5 text-sm font-bold text-[#5f6b93]">
                <p className="inline-flex items-center gap-2"><Tag className="h-4 w-4" /> Safe browsing tip: verify details before making any payment.</p>
              </div>
            </aside>
          </div>

          {related.length ? (
            <section className="mt-7 rounded-3xl border border-[#7288AE]/30 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-black">Related posts</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {related.map((item) => (
                  <Link key={item.id || item.slug} href={buildPostUrl(task, item.slug)} className="overflow-hidden rounded-2xl border border-[#7288AE]/25 bg-[#fff8f1] transition hover:-translate-y-0.5">
                    <img src={getEditablePostImage(item)} alt={item.title} className="aspect-[4/3] w-full object-cover" />
                    <div className="p-3">
                      <p className="line-clamp-2 text-sm font-black">{item.title}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-[#5f6b93]">{getEditableExcerpt(item, 90)}</p>
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
// redesign-refresh-marker



