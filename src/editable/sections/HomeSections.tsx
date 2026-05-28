import Link from 'next/link'
import { ArrowRight, Search, Star } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'
import { CompactIndexCard, EditorialFeatureCard, RailPostCard, getEditablePostImage, getEditableExcerpt, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function HorizontalCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group grid gap-4 overflow-hidden rounded-3xl border border-[#7288AE]/30 bg-white p-4 shadow-[0_12px_36px_rgba(17,24,68,0.1)] transition hover:-translate-y-1 sm:grid-cols-[170px_minmax(0,1fr)]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#e8d5c3] sm:aspect-square">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0 py-1">
        <h3 className="line-clamp-2 text-xl font-black leading-tight tracking-[-0.03em] text-[#111844]">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#5f6b93]">{getEditableExcerpt(post, 130)}</p>
      </div>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const feature = posts[0]
  return (
    <section className="relative overflow-hidden border-b border-[#7288AE]/30 bg-[linear-gradient(145deg,#111844_0%,#4B5694_52%,#7288AE_100%)] text-[#EAE0CF]">
      <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-[#EAE0CF]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-6 h-64 w-64 rounded-full bg-[#111844]/35 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:px-8 lg:py-20">
        <div>
          <p className={`${dc.type.eyebrow} text-[#EAE0CF]/85`}>Smart classifieds marketplace</p>
          <h1 className={`${dc.type.heroTitle} mt-4 max-w-xl`}>Buy, sell, rent, and promote with confidence.</h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#EAE0CF]/90">Discover practical listings, local offers, and trusted service posts in a cleaner browsing experience built for quick decisions.</p>
          <form action="/search" className="mt-8 flex max-w-xl rounded-full border border-[#EAE0CF]/35 bg-[#EAE0CF] p-2 shadow-sm">
            <input name="q" placeholder="Search products, properties, vehicles, jobs, and services" className="min-w-0 flex-1 bg-transparent px-4 text-sm font-semibold text-[#111844] outline-none" />
            <button className="inline-flex items-center gap-2 rounded-full bg-[#111844] px-5 py-3 text-sm font-black text-[#EAE0CF]"><Search className="h-4 w-4" /> Search</button>
          </form>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={primaryRoute} className="inline-flex items-center justify-center rounded-full bg-[#EAE0CF] px-7 py-3 text-sm font-black text-[#111844] transition hover:opacity-90">Explore {taskLabel(primaryTask).toLowerCase()} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-[#EAE0CF]/45 bg-transparent px-7 py-3 text-sm font-black text-[#EAE0CF] transition hover:bg-[#EAE0CF]/10">Post your offer</Link>
          </div>
        </div>
        <div>
          {feature ? <EditorialFeatureCard post={feature} href={postHref(primaryTask, feature, primaryRoute)} label="Editor's featured listing" /> : null}
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(1, 11)
  if (!railPosts.length) return null
  return (
    <section className={`${pal.warmBg} ${dc.shell.sectionY}`}>
      <div className={dc.shell.section}>
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className={dc.type.sectionTitle}>Fresh picks near you</h2>
          <Link href={primaryRoute} className="text-sm font-black text-[#4B5694]">View all</Link>
        </div>
        <div className={dc.layout.rail}>
          {railPosts.map((post, index) => <div key={post.id || post.slug} className={dc.layout.minRailCard}><RailPostCard post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} /></div>)}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const featured = posts.slice(11, 17)
  if (!featured.length) return null
  return (
    <section className={`${pal.grayBg} ${dc.shell.sectionY}`}>
      <div className={dc.shell.section}>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((post) => <HorizontalCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const merged = timeSections.flatMap((section) => section.posts)
  const list = (merged.length ? merged : posts).slice(0, 8)
  if (!list.length) return null
  return (
    <section className={`${pal.panelBg} ${dc.shell.sectionY}`}>
      <div className={dc.shell.section}>
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className={dc.type.sectionTitle}>Quick browse lanes</h2>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#4B5694] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white"><Star className="h-3.5 w-3.5" /> Trending</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((post, index) => <CompactIndexCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-app" className="scroll-mt-24 bg-[#111844] py-20 text-[#EAE0CF]">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#b8c5df]">Built for movers</p>
        <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-5xl">Ready to publish your next listing?</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#f1e2d1]/85">List your product or service, reach local buyers faster, and keep your posts visible with a premium classified-style presentation.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/classified" className="rounded-full bg-[#4B5694] px-6 py-3 text-sm font-black text-white">Browse classifieds</Link>
          <Link href="/contact" className="rounded-full border border-[#f1e2d1]/30 px-6 py-3 text-sm font-black text-[#EAE0CF]">Talk to support</Link>
        </div>
      </div>
    </section>
  )
}
// redesign-refresh-marker



