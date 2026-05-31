import Link from 'next/link'
import { ArrowRight, Clock3, MapPin, Sparkles, Tag } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const image = typeof content.image === 'string' ? content.image : ''
  return mediaUrl || contentImage || image || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw = (typeof content.description === 'string' && content.description) || (typeof content.summary === 'string' && content.summary) || post?.summary || ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'General'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

function getPrice(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return typeof content.price === 'string' ? content.price : ''
}

function getLocation(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.location === 'string' && content.location) || (typeof content.address === 'string' && content.address) || ''
}

function getAge(post?: SitePost | null) {
  const value = post?.publishedAt || post?.createdAt || post?.updatedAt
  if (!value) return ''
  try {
    return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short' }).format(new Date(value))
  } catch {
    return ''
  }
}

export function EditorialFeatureCard({ post, href, label = 'Featured pick' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`group block overflow-hidden ${dc.surface.dark} ${dc.motion.lift}`}>
      <div className="relative min-h-[520px] overflow-hidden sm:min-h-[580px]">
        <img src={getEditablePostImage(post)} alt={post.title || 'Featured post'} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,16,38,0.08),rgba(8,16,38,0.88))]" />
        <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-[var(--slot4-page-text)]">
              <Sparkles className="h-3.5 w-3.5 text-[var(--slot4-accent)]" />
              {label}
            </span>
            <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-white/90">
              {getEditableCategory(post)}
            </span>
          </div>
          <div>
            <div className="max-w-2xl">
              <h3 className="text-3xl font-black leading-[0.95] tracking-[-0.06em] text-white sm:text-4xl lg:text-5xl">{post.title || 'Untitled post'}</h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/82">{getEditableExcerpt(post, 180) || 'No description was provided for this post.'}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.14em] text-white">
              {getPrice(post) ? <span className="rounded-full bg-white px-3 py-1 text-[var(--slot4-page-text)]">{getPrice(post)}</span> : null}
              {getLocation(post) ? <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">{getLocation(post)}</span> : null}
              {getAge(post) ? <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">{getAge(post)}</span> : null}
            </div>
            <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[var(--slot4-page-text)]">
              Open post <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group block overflow-hidden ${dc.surface.card} ${dc.motion.lift}`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title || 'Post'} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-page-text)] shadow-sm">
          #{String(index + 1).padStart(2, '0')}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-[var(--slot4-accent-fill)] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-sm">
          {getEditableCategory(post)}
        </span>
      </div>
      <div className="space-y-2 p-4">
        <p className={`text-[11px] font-black uppercase tracking-[0.22em] ${pal.accentText}`}>{getPrice(post) || 'Quick view'}</p>
        <h3 className="line-clamp-2 text-[1.02rem] font-black leading-tight tracking-[-0.03em]">{post.title || 'Untitled post'}</h3>
        <p className={`line-clamp-2 text-sm leading-6 ${pal.mutedText}`}>{getEditableExcerpt(post, 90) || 'A concise summary will appear here.'}</p>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group block ${dc.surface.soft} p-4 ${dc.motion.lift}`}>
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--slot4-dark-bg)] text-xs font-black text-white">
          {index + 1}
        </span>
        <div className="min-w-0">
          <p className={`flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.2em] ${pal.accentText}`}>
            <Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}
          </p>
          <h3 className="mt-2 line-clamp-2 text-lg font-black leading-tight tracking-[-0.03em]">{post.title || 'Untitled post'}</h3>
          <p className={`mt-2 line-clamp-2 text-sm leading-6 ${pal.softMutedText}`}>{getEditableExcerpt(post, 95) || 'This item is ready for a quick scan.'}</p>
        </div>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const price = getPrice(post)
  const location = getLocation(post)
  return (
    <Link href={href} className={`group grid gap-4 overflow-hidden ${dc.surface.card} p-4 ${dc.motion.lift} sm:grid-cols-[210px_minmax(0,1fr)]`}>
      <div className={`${dc.media.frame} aspect-[4/3] sm:min-h-[190px]`}>
        <img src={getEditablePostImage(post)} alt={post.title || 'Post'} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0 py-1 sm:py-2 sm:pr-2">
        <p className={`text-[11px] font-black uppercase tracking-[0.22em] ${pal.accentText}`}>Listing {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-2 line-clamp-2 text-2xl font-black leading-tight tracking-[-0.04em]">{post.title || 'Untitled post'}</h2>
        <p className={`mt-3 line-clamp-3 text-sm leading-7 ${pal.softMutedText}`}>{getEditableExcerpt(post, 175) || 'Details will appear here when the post includes a summary.'}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.14em]">
          {price ? <span className="rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[var(--slot4-page-text)]">{price}</span> : null}
          {location ? <span className="inline-flex items-center gap-1 rounded-full border border-[var(--editable-border)] px-3 py-1 text-[var(--slot4-muted-text)]"><MapPin className="h-3.5 w-3.5" /> {location}</span> : null}
          <span className="inline-flex items-center gap-1 rounded-full border border-[var(--editable-border)] px-3 py-1 text-[var(--slot4-muted-text)]">
            <Tag className="h-3.5 w-3.5" />
            Open post
          </span>
        </div>
      </div>
    </Link>
  )
}
