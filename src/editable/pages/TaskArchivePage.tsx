import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowRight, Filter, MapPin, Search } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { ArticleListCard, getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

export async function EditableTaskArchiveRoute({ task, searchParams, basePath }: { task: TaskKey; searchParams?: Promise<{ category?: string; page?: string }>; basePath?: string }) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 20, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const voice = taskPageVoices[task]
  const page = pagination.page || 1
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category
  const vars = {
    '--archive-bg': task === 'classified' ? 'var(--editable-page-bg, #fffaf3)' : '#EAE0CF',
    '--archive-text': '#111844',
    '--archive-surface': '#fff8f1',
    '--archive-accent': '#4B5694',
  } as CSSProperties

  return (
    <EditableSiteShell>
      <main style={vars} className="bg-[var(--archive-bg)] text-[var(--archive-text)]">
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-7 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8 lg:py-16">
          <div className="rounded-3xl border border-[#7288AE]/30 bg-[var(--archive-surface)] p-6 shadow-[0_18px_50px_rgba(17,24,68,0.1)] sm:p-9">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--archive-accent)]">{voice.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-black leading-[0.95] tracking-[-0.05em] sm:text-5xl">{voice.headline}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#5f6b93]">{voice.description || SITE_CONFIG.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {voice.chips.map((chip) => <span key={chip} className="rounded-full border border-[#7288AE]/35 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]">{chip}</span>)}
            </div>
          </div>

          <form action={basePath} className="self-start rounded-3xl border border-[#7288AE]/30 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#5f6b93]"><Filter className="h-4 w-4" /> Filter posts</div>
            <select name="category" defaultValue={category} className="mt-4 h-11 w-full rounded-2xl border border-[#7288AE]/35 bg-[#fff9f3] px-4 text-sm font-bold outline-none">
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
            </select>
            <button className="mt-3 h-11 w-full rounded-2xl bg-[#4B5694] text-sm font-black text-white">Apply</button>
            <p className="mt-3 text-xs font-bold text-[#5f6b93]">Showing {categoryLabel}</p>
          </form>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 pb-16 sm:px-6 lg:px-8">
          {posts.length ? (
            <div className={task === 'classified' ? 'grid items-start gap-5 md:grid-cols-2' : 'grid items-start gap-5 xl:grid-cols-2'}>
              {posts.map((post, index) => {
                const variant =
                  task === 'classified'
                    ? index === 0
                      ? 'featured'
                      : index % 3 === 0
                        ? 'compact'
                        : 'horizontal'
                    : 'default'
                return (
                  <TaskCard
                    key={post.id || post.slug}
                    post={post}
                    href={postHref(task, post, basePath)}
                    index={index}
                    task={task}
                    variant={variant}
                  />
                )
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#7288AE]/40 bg-white/70 p-10 text-center">
              <Search className="mx-auto h-7 w-7 text-[#5f6b93]" />
              <h2 className="mt-4 text-3xl font-black tracking-[-0.05em]">No posts available</h2>
              <p className="mt-2 text-sm text-[#5f6b93]">Try another category or check back soon.</p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="rounded-full border border-[#7288AE]/35 bg-white px-5 py-2.5 text-sm font-black">Previous</Link> : null}
            <span className="rounded-full bg-[#111844] px-5 py-2.5 text-sm font-black text-[#EAE0CF]">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="rounded-full border border-[#7288AE]/35 bg-white px-5 py-2.5 text-sm font-black">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function TaskCard({
  post,
  href,
  index,
  task,
  variant = 'default',
}: {
  post: SitePost
  href: string
  index: number
  task: TaskKey
  variant?: 'default' | 'featured' | 'compact' | 'horizontal'
}) {
  if (task === 'image') {
    return (
      <Link href={href} className="group block overflow-hidden rounded-3xl border border-[#7288AE]/30 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
        <img src={getEditablePostImage(post)} alt={post.title} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="p-4">
          <h3 className="line-clamp-2 text-xl font-black">{post.title}</h3>
        </div>
      </Link>
    )
  }

  if (task === 'classified') {
    const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
    const price = typeof content.price === 'string' ? content.price : ''
    const location = typeof content.location === 'string' ? content.location : ''
    if (variant === 'featured') {
      return (
        <Link href={href} className="group md:col-span-2 overflow-hidden rounded-3xl border border-[#7288AE]/35 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
          <div className="grid gap-4 p-4 md:grid-cols-[280px_minmax(0,1fr)] md:p-5">
            <img src={getEditablePostImage(post)} alt={post.title} className="aspect-[4/3] w-full rounded-2xl object-cover" />
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#4B5694]">{getEditableCategory(post)} • Featured</p>
              <h3 className="mt-2 line-clamp-2 text-3xl font-black leading-tight">{post.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm text-[#5f6b93]">{getEditableExcerpt(post, 170)}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.14em]">
                {price ? <span className="rounded-full bg-[#d9dff0] px-3 py-1 text-[#111844]">{price}</span> : null}
                {location ? <span className="inline-flex items-center gap-1 rounded-full border border-[#7288AE]/35 px-3 py-1 text-[#5f6b93]"><MapPin className="h-3.5 w-3.5" />{location}</span> : null}
              </div>
            </div>
          </div>
        </Link>
      )
    }
    if (variant === 'compact') {
      return (
        <Link href={href} className="group overflow-hidden rounded-3xl border border-[#7288AE]/30 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
          <img src={getEditablePostImage(post)} alt={post.title} className="aspect-[16/10] w-full rounded-2xl object-cover" />
          <p className="mt-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#4B5694]">{getEditableCategory(post)}</p>
          <h3 className="mt-2 line-clamp-2 text-xl font-black leading-tight">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-[#5f6b93]">{getEditableExcerpt(post, 90)}</p>
        </Link>
      )
    }
    return (
      <Link href={href} className="group grid gap-4 overflow-hidden rounded-3xl border border-[#7288AE]/30 bg-white p-4 shadow-sm transition hover:-translate-y-1 sm:grid-cols-[180px_minmax(0,1fr)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="aspect-square w-full rounded-2xl object-cover" />
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4B5694]">{getEditableCategory(post)}</p>
          <h3 className="mt-2 line-clamp-2 text-2xl font-black leading-tight">{post.title}</h3>
          <p className="mt-3 line-clamp-2 text-sm text-[#5f6b93]">{getEditableExcerpt(post, 115)}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.14em]">
            {price ? <span className="rounded-full bg-[#d9dff0] px-3 py-1 text-[#111844]">{price}</span> : null}
            {location ? <span className="inline-flex items-center gap-1 rounded-full border border-[#7288AE]/35 px-3 py-1 text-[#5f6b93]"><MapPin className="h-3.5 w-3.5" />{location}</span> : null}
          </div>
        </div>
      </Link>
    )
  }

  return <ArticleListCard post={post} href={href} index={index} />
}
// redesign-refresh-marker



