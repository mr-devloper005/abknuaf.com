import Link from 'next/link'
import { ArrowRight, CarFront, Laptop, Sofa, Sparkles, Store, Wrench, Package, House, Smartphone, Bike, BriefcaseBusiness } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'
import { CompactIndexCard, EditorialFeatureCard, RailPostCard, getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function CategoryTile({ name, href }: { name: string; href: string }) {
  return (
    <Link href={href} className="group flex flex-col items-center gap-3 rounded-2xl border border-transparent bg-[#f7f9fc] px-4 py-5 text-center transition duration-300 hover:-translate-y-1 hover:border-[var(--editable-border)] hover:bg-white hover:shadow-[0_16px_32px_rgba(16,23,40,0.08)]">
      <span className="grid h-20 w-20 place-items-center rounded-2xl bg-white text-[var(--slot4-accent)] shadow-[0_10px_30px_rgba(16,23,40,0.08)] transition duration-300 group-hover:scale-105">
        {renderCategoryIcon(name)}
      </span>
      <span className="text-sm font-semibold leading-tight text-[var(--slot4-page-text)]">{name}</span>
    </Link>
  )
}

function renderCategoryIcon(name: string) {
  if (name.toLowerCase().includes('real') || name.toLowerCase().includes('property')) return <House className="h-9 w-9" />
  if (name.toLowerCase().includes('auto') || name.toLowerCase().includes('car')) return <CarFront className="h-9 w-9" />
  if (name.toLowerCase().includes('phone') || name.toLowerCase().includes('mobile')) return <Smartphone className="h-9 w-9" />
  if (name.toLowerCase().includes('furniture') || name.toLowerCase().includes('home')) return <Sofa className="h-9 w-9" />
  if (name.toLowerCase().includes('job') || name.toLowerCase().includes('business')) return <BriefcaseBusiness className="h-9 w-9" />
  if (name.toLowerCase().includes('tech') || name.toLowerCase().includes('digital')) return <Laptop className="h-9 w-9" />
  if (name.toLowerCase().includes('service')) return <Wrench className="h-9 w-9" />
  if (name.toLowerCase().includes('fashion')) return <Sparkles className="h-9 w-9" />
  if (name.toLowerCase().includes('sport') || name.toLowerCase().includes('game')) return <Bike className="h-9 w-9" />
  if (name.toLowerCase().includes('shop') || name.toLowerCase().includes('store')) return <Store className="h-9 w-9" />
  return <Package className="h-9 w-9" />
}

function HorizontalCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className={`group grid h-full gap-4 overflow-hidden ${dc.surface.card} p-4 ${dc.motion.lift} sm:grid-cols-[170px_minmax(0,1fr)]`}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-[var(--slot4-media-bg)] sm:aspect-square">
        <img src={getEditablePostImage(post)} alt={post.title || 'Post'} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0 py-1">
        <p className={`text-[11px] font-black uppercase tracking-[0.2em] ${pal.accentText}`}>{getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-2 text-xl font-black leading-tight tracking-[-0.03em] text-[var(--slot4-page-text)]">{post.title || 'Untitled post'}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 130) || 'A short summary will appear here.'}</p>
      </div>
    </Link>
  )
}

function PromotedVisual({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[var(--editable-border)] bg-white shadow-[0_12px_30px_rgba(16,23,40,0.08)] transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f7f9fc]">
        <img src={getEditablePostImage(post)} alt={post.title || 'Post'} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-6">{post.title || 'Untitled post'}</h3>
      </div>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const feature = posts[0]
  const categories = CATEGORY_OPTIONS.slice(0, 12)

  return (
    <section className="border-b border-white/10 bg-[#08132f] text-white">
      <div className={dc.shell.section}>
        <div className="grid gap-8 py-10 lg:py-16">
          <div className="relative overflow-hidden rounded-[2.75rem] border border-white/15 bg-[radial-gradient(circle_at_80%_10%,rgba(77,99,255,0.5),transparent_32%),linear-gradient(135deg,#0b1738_0%,#08132f_70%)] p-6 shadow-[0_35px_90px_rgba(0,0,0,0.25)] sm:p-9 lg:p-12">
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full border-[40px] border-[#ffd84d]/80" />
            <div className="relative w-full">
              <p className={`${dc.type.eyebrow} text-[#ffd84d]`}>{pagesContent.home.hero.badge}</p>
              <div className="mt-5 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <div>
                  <h1 className="max-w-3xl text-5xl font-black leading-[0.88] tracking-[-0.075em] text-white sm:text-6xl lg:text-8xl">
                    {pagesContent.home.hero.title[0]}
                  </h1>
                  <p className="mt-6 max-w-xl text-base leading-8 text-white/65">{pagesContent.home.hero.description}</p>
                  <form action="/search" className="mt-8 flex max-w-2xl items-center rounded-2xl bg-white p-2 shadow-[0_18px_45px_rgba(0,0,0,0.25)]">
                    <input
                      name="q"
                      placeholder={pagesContent.home.hero.searchPlaceholder}
                      className="min-w-0 flex-1 bg-transparent px-4 text-sm font-bold text-[#08132f] outline-none placeholder:text-[#08132f]/40"
                    />
                    <button className="inline-flex items-center gap-2 rounded-xl bg-[#4d63ff] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5">
                      <Sparkles className="h-4 w-4" />
                      Search
                    </button>
                  </form>
                </div>
                <div className="grid gap-4 rounded-[2rem] border border-white/15 bg-white/10 p-5 backdrop-blur sm:p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-[0.24em] text-white/60">{pagesContent.home.hero.focusLabel}</span>
                    <span className="rounded-full bg-[#ffd84d] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#08132f]">
                      {taskLabel(primaryTask)}
                    </span>
                  </div>
                  <div className="rounded-[1.5rem] bg-white p-5 text-[#08132f]">
                    {feature ? (
                      <>
                        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{pagesContent.home.hero.featureCardBadge}</p>
                        <h2 className="mt-3 text-2xl font-black leading-tight tracking-[-0.04em]">{pagesContent.home.hero.featureCardTitle}</h2>
                        <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{pagesContent.home.hero.featureCardDescription}</p>
                        <div className="mt-4 flex items-center gap-3">
                          <img src={getEditablePostImage(feature)} alt={feature.title || 'Featured'} className="h-16 w-16 rounded-2xl object-cover" />
                          <div className="min-w-0">
                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--slot4-muted-text)]">{getEditableCategory(feature)}</p>
                            <p className="line-clamp-2 text-sm font-semibold">{feature.title || 'Featured post'}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-3">
                        <div className="h-5 w-2/3 rounded-full bg-black/5" />
                        <div className="h-4 w-full rounded-full bg-black/5" />
                        <div className="h-4 w-5/6 rounded-full bg-black/5" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link href={primaryRoute} className="inline-flex items-center justify-center rounded-xl bg-[#4d63ff] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5">
                      Browse {taskLabel(primaryTask).toLowerCase()}
                    </Link>
                    <Link href="/contact" className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5">
                      {pagesContent.home.hero.secondaryCta.label}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 [&_a]:border-white/10 [&_a]:bg-white/5 [&_a]:text-white [&_a:hover]:bg-white/10 [&_a_span:last-child]:text-white">
            {categories.map((category) => (
              <CategoryTile key={category.slug} name={category.name} href={`/classified?category=${category.slug}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(0, 8)
  if (!railPosts.length) return null

  return (
    <section className={`border-b border-[#d9deea] bg-[#eef1f7] ${dc.shell.sectionY}`}>
      <div className={dc.shell.section}>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className={`${dc.type.eyebrow} text-[#4d63ff]`}>Fresh classified ads</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] sm:text-4xl">Popular local ads ready to compare.</h2>
          </div>
          <Link href={primaryRoute} className="inline-flex items-center gap-2 text-sm font-black text-[var(--slot4-accent)] transition hover:translate-x-0.5">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {railPosts.map((post, index) => {
            if (index === 0) return <div key={post.id || post.slug} className="h-full md:col-span-2"><EditorialFeatureCard post={post} href={postHref(primaryTask, post, primaryRoute)} /></div>
            if (index === 1) return <div key={post.id || post.slug} className="h-full md:col-span-1"><HorizontalCard post={post} href={postHref(primaryTask, post, primaryRoute)} /></div>
            if (index % 3 === 0) return <div key={post.id || post.slug} className="h-full"><CompactIndexCard post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} /></div>
            return <div key={post.id || post.slug} className="h-full"><RailPostCard post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} /></div>
          })}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const featured = posts.slice(8, 14)
  if (!featured.length) return null

  return (
    <section className={`border-b border-white/10 bg-[#4d63ff] text-white ${dc.shell.sectionY}`}>
      <div className={dc.shell.section}>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="rounded-[2rem] border border-white/15 bg-[#08132f] p-6 shadow-[0_18px_45px_rgba(8,19,47,0.22)] sm:p-8">
            <p className={`${dc.type.eyebrow} text-[#ffd84d]`}>Keep browsing</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] sm:text-4xl">Find the next useful classified faster.</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/65">
              Browse categories, compare active posts, and return to fresh local ads whenever you are ready.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={primaryRoute} className="rounded-xl bg-[#ffd84d] px-5 py-3 text-sm font-black text-[#08132f] transition hover:-translate-y-0.5">
                Open {taskLabel(primaryTask)}
              </Link>
              <Link href="/contact" className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5">
                Get posting help
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
            {featured.slice(0, 4).map((post) => (
              <HorizontalCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const merged = timeSections.flatMap((section) => section.posts)
  const list = (merged.length ? merged : posts).slice(0, 6)
  if (!list.length) return null

  return (
    <section className={`border-b border-[#d9deea] bg-white ${dc.shell.sectionY}`}>
      <div className={dc.shell.section}>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className={`${dc.type.eyebrow} text-[var(--slot4-accent)]`}>Promoted classifieds</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] sm:text-4xl">Featured ads with clear photos and details.</h2>
          </div>
          <button type="button" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-5 py-3 text-sm font-black transition hover:-translate-y-0.5">
            Load more ads
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {list.map((post) => (
            <PromotedVisual key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-[#ffd84d] py-12">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-[2rem] bg-[#08132f] p-6 text-white shadow-[0_20px_55px_rgba(8,19,47,0.2)] lg:grid-cols-[1.1fr_0.9fr] lg:items-center sm:p-8">
          <div>
            <p className={`${dc.type.eyebrow} text-[#ffd84d]`}>Browse smarter</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] sm:text-4xl">Open local classifieds with confidence.</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/65">
              Compare services, jobs, vehicles, property, and daily offers with readable posts and direct next steps.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href="/classified" className="rounded-xl bg-[#4d63ff] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5">
              Browse classifieds
            </Link>
            <Link href="/contact" className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5">
              Contact support
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
