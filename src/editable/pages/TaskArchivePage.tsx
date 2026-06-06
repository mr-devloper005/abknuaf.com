import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowRight, Filter, Search } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { ArticleListCard, RailPostCard, getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

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
  const pageCopy = taskPageMetadata[task]
  const page = pagination.page || 1
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category
  const isClassified = String(task) === 'classified'
  const vars = {
    '--archive-bg': 'var(--slot4-page-bg, #f4f5f7)',
    '--archive-text': 'var(--slot4-page-text, #10141f)',
    '--archive-surface': '#ffffff',
    '--archive-accent': 'var(--slot4-accent, #2d63f1)',
  } as CSSProperties

  if (task === 'classified') {
    return (
      <EditableSiteShell>
        <main style={vars} className="bg-[#eef1f7] text-[var(--archive-text)]">
          <section className="border-b border-white/10 bg-[#08132f]">
            <div className="mx-auto max-w-[var(--editable-container)] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
              <div className="overflow-hidden rounded-[2.5rem] border border-white/15 bg-[#0d1b40] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="relative overflow-hidden p-7 text-white sm:p-9 lg:p-12">
                    <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full border-[40px] border-[#4d63ff]" />
                    <p className="relative text-[11px] font-black uppercase tracking-[0.32em] text-[#ffd84d]">
                      {voice.eyebrow}
                    </p>
                    <h1 className="relative mt-4 max-w-3xl text-4xl font-black leading-[0.9] tracking-[-0.07em] sm:text-5xl lg:text-7xl">
                      {pageCopy?.title || voice.headline}
                    </h1>
                    <p className="relative mt-5 max-w-xl text-base leading-8 text-white/65">
                      {pageCopy?.description || voice.description || SITE_CONFIG.description}
                    </p>
                    <div className="relative mt-6 flex flex-wrap gap-2">
                      {voice.chips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-white"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-white/10 bg-[#ffd84d] p-6 text-[#08132f] sm:p-8 lg:border-l lg:border-t-0">
                    <form action={basePath} className="grid h-full gap-3">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-[#08132f]/60">
                        <Filter className="h-4 w-4" /> Filter posts
                      </div>
                      <label className="grid gap-2 text-sm font-black">
                        Search
                        <div className="flex h-12 items-center rounded-xl border border-[#08132f]/15 bg-white px-3 shadow-sm">
                          <Search className="h-4 w-4 text-black/45" />
                          <input
                            name="q"
                            placeholder="Search within this section"
                            className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none"
                          />
                        </div>
                      </label>
                      <label className="grid gap-2 text-sm font-black">
                        Category
                        <select
                          name="category"
                          defaultValue={category}
                          className="h-12 rounded-xl border border-[#08132f]/15 bg-white px-4 text-sm font-bold outline-none shadow-sm"
                        >
                          <option value="all">All categories</option>
                          {CATEGORY_OPTIONS.map((item) => (
                            <option key={item.slug} value={item.slug}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </label>
                      <button className="mt-auto inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#4d63ff] px-5 text-sm font-black text-white shadow-[0_10px_24px_rgba(77,99,255,0.25)] transition hover:-translate-y-0.5">
                        Apply filters <ArrowRight className="h-4 w-4" />
                      </button>
                      <p className="text-[11px] font-bold text-[#08132f]/55">Showing {categoryLabel}</p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-[var(--editable-container)] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
            {posts.length ? (
              <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
                {posts.map((post, index) => (
                  <TaskCard
                    key={post.id || post.slug}
                    post={post}
                    href={postHref(task, post, basePath)}
                    index={index}
                    variant="classified"
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[2rem] border border-dashed border-[var(--editable-border)] bg-white p-10 text-center shadow-[0_12px_35px_rgba(16,23,40,0.06)]">
                <Search className="mx-auto h-8 w-8 text-[var(--slot4-muted-text)]" />
                <h2 className="mt-4 text-3xl font-black tracking-[-0.05em]">No posts available</h2>
                <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">Try another category or check back soon.</p>
              </div>
            )}

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {pagination.hasPrevPage ? (
                <Link
                  href={pageHref(basePath, category, page - 1)}
                  className="rounded-full border border-[var(--editable-border)] bg-white px-5 py-2.5 text-sm font-black transition hover:-translate-y-0.5"
                >
                  Previous
                </Link>
              ) : null}
              <span className="rounded-full bg-[var(--slot4-dark-bg)] px-5 py-2.5 text-sm font-black text-white">
                Page {page} of {pagination.totalPages || 1}
              </span>
              {pagination.hasNextPage ? (
                <Link
                  href={pageHref(basePath, category, page + 1)}
                  className="rounded-full border border-[var(--editable-border)] bg-white px-5 py-2.5 text-sm font-black transition hover:-translate-y-0.5"
                >
                  Next
                </Link>
              ) : null}
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main style={vars} className="bg-[var(--archive-bg)] text-[var(--archive-text)]">
        <section className="border-b border-[var(--editable-border)] bg-[#f7f9fc]">
          <div className="mx-auto grid max-w-[var(--editable-container)] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-10">
            <div className="rounded-[2rem] border border-[var(--editable-border)] bg-white p-6 shadow-[0_18px_45px_rgba(16,23,40,0.08)] sm:p-8">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--archive-accent)]">{voice.eyebrow}</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[0.96] tracking-[-0.06em] sm:text-5xl">{pageCopy?.title || voice.headline}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--slot4-muted-text)]">{pageCopy?.description || voice.description || SITE_CONFIG.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {voice.chips.map((chip) => (
                  <span key={chip} className="rounded-full border border-[var(--editable-border)] bg-[#f7f9fc] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]">
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <form action={basePath} className="self-start rounded-[2rem] border border-[var(--editable-border)] bg-white p-5 shadow-[0_12px_35px_rgba(16,23,40,0.08)]">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[var(--slot4-muted-text)]">
                <Filter className="h-4 w-4" /> Filter posts
              </div>
              <div className="mt-4 grid gap-3">
                <label className="grid gap-2 text-sm font-black">
                  Search
                  <div className="flex h-11 items-center rounded-2xl border border-[var(--editable-border)] bg-[#f7f9fc] px-3">
                    <Search className="h-4 w-4 text-black/45" />
                    <input name="q" placeholder="Search within this section" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" />
                  </div>
                </label>
                <label className="grid gap-2 text-sm font-black">
                  Category
                  <select name="category" defaultValue={category} className="h-11 rounded-2xl border border-[var(--editable-border)] bg-[#f7f9fc] px-4 text-sm font-medium outline-none">
                    <option value="all">All categories</option>
                    {CATEGORY_OPTIONS.map((item) => (
                      <option key={item.slug} value={item.slug}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <button className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[var(--archive-accent)] px-5 text-sm font-black text-white transition hover:-translate-y-0.5">
                Apply filters <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-3 text-xs font-medium text-[var(--slot4-muted-text)]">Showing {categoryLabel}</p>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          {posts.length ? (
            <div className={isClassified ? 'grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4' : 'grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3'}>
              {posts.map((post, index) => {
                const variant =
                  isClassified
                    ? index === 0
                      ? 'featured'
                      : index % 4 === 0
                        ? 'compact'
                        : index % 3 === 0
                          ? 'horizontal'
                          : 'list'
                    : task === 'image'
                      ? 'image'
                      : index % 2 === 0
                        ? 'horizontal'
                        : 'list'
                return (
                  <TaskCard
                    key={post.id || post.slug}
                    post={post}
                    href={postHref(task, post, basePath)}
                    index={index}
                    variant={variant}
                  />
                )
              })}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-[var(--editable-border)] bg-white p-10 text-center shadow-[0_12px_35px_rgba(16,23,40,0.06)]">
              <Search className="mx-auto h-8 w-8 text-[var(--slot4-muted-text)]" />
              <h2 className="mt-4 text-3xl font-black tracking-[-0.05em]">No posts available</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">Try another category or check back soon.</p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? (
              <Link href={pageHref(basePath, category, page - 1)} className="rounded-full border border-[var(--editable-border)] bg-white px-5 py-2.5 text-sm font-black transition hover:-translate-y-0.5">
                Previous
              </Link>
            ) : null}
            <span className="rounded-full bg-[var(--slot4-dark-bg)] px-5 py-2.5 text-sm font-black text-white">
              Page {page} of {pagination.totalPages || 1}
            </span>
            {pagination.hasNextPage ? (
              <Link href={pageHref(basePath, category, page + 1)} className="rounded-full border border-[var(--editable-border)] bg-white px-5 py-2.5 text-sm font-black transition hover:-translate-y-0.5">
                Next
              </Link>
            ) : null}
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
  variant = 'list',
}: {
  post: SitePost
  href: string
  index: number
  variant?: 'featured' | 'compact' | 'horizontal' | 'list' | 'image' | 'classified'
}) {
  if (variant === 'classified') {
    return (
      <Link href={href} className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#d5dbe8] bg-white shadow-[0_14px_35px_rgba(8,19,47,0.08)] transition duration-300 hover:-translate-y-1.5 hover:border-[#4d63ff]/50 hover:shadow-[0_22px_45px_rgba(8,19,47,0.14)]">
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={getEditablePostImage(post)} alt={post.title || 'Post'} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <span className="absolute left-3 top-3 rounded-lg bg-[#ffd84d] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#08132f] shadow-sm">
            #{String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div className="flex flex-1 flex-col space-y-2 p-4">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#4d63ff]">{getEditableCategory(post)}</p>
          <h3 className="line-clamp-2 text-[1rem] font-black leading-tight tracking-[-0.03em]">{post.title || 'Untitled post'}</h3>
          <p className="line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 95) || 'A concise summary will appear here.'}</p>
        </div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link href={href} className="group h-full overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-white shadow-[0_16px_40px_rgba(16,23,40,0.08)] transition duration-300 hover:-translate-y-1 md:col-span-2">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <img src={getEditablePostImage(post)} alt={post.title || 'Post'} className="aspect-[4/3] h-full w-full object-cover" />
          <div className="flex flex-col justify-between p-6">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--archive-accent)]">{getEditableCategory(post)} • Featured</p>
              <h3 className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em]">{post.title || 'Untitled post'}</h3>
              <p className="mt-3 line-clamp-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 180)}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.14em]">
              <span className="rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[var(--slot4-page-text)]">Open now</span>
              <span className="rounded-full border border-[var(--editable-border)] px-3 py-1 text-[var(--slot4-muted-text)]">Listing #{index + 1}</span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return <RailPostCard post={post} href={href} index={index} />
  }

  if (variant === 'horizontal') {
    return (
      <Link href={href} className="group grid h-full gap-4 overflow-hidden rounded-[1.75rem] border border-[var(--editable-border)] bg-white p-4 shadow-[0_12px_35px_rgba(16,23,40,0.08)] transition duration-300 hover:-translate-y-1 sm:grid-cols-[180px_minmax(0,1fr)]">
        <img src={getEditablePostImage(post)} alt={post.title || 'Post'} className="aspect-square w-full rounded-[1.25rem] object-cover" />
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--archive-accent)]">{getEditableCategory(post)}</p>
          <h3 className="mt-2 line-clamp-2 text-xl font-black leading-tight">{post.title || 'Untitled post'}</h3>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 110)}</p>
        </div>
      </Link>
    )
  }

  if (variant === 'image') {
    return (
      <Link href={href} className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[var(--editable-border)] bg-white shadow-[0_12px_35px_rgba(16,23,40,0.08)] transition duration-300 hover:-translate-y-1">
        <img src={getEditablePostImage(post)} alt={post.title || 'Post'} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="flex flex-1 flex-col p-4">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--archive-accent)]">{getEditableCategory(post)}</p>
          <h3 className="mt-2 line-clamp-2 text-lg font-black leading-tight">{post.title || 'Untitled post'}</h3>
        </div>
      </Link>
    )
  }

  return <ArticleListCard post={post} href={href} index={index} />
}
