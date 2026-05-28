'use client'

import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X, Sparkles } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import brandLogo from '@/editable/theme/brand-logo.png'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const navItems = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })), [])
  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>('link[rel*="icon"]')
    if (favicon) favicon.href = brandLogo.src
  }, [])
  const navVars = {
    '--editable-nav-bg': 'rgba(17,24,68,0.96)',
    '--editable-nav-text': '#111844',
    '--editable-nav-active': '#4B5694',
    '--editable-nav-active-text': '#EAE0CF',
    '--editable-cta-bg': '#4B5694',
    '--editable-cta-text': '#EAE0CF',
    '--editable-search-bg': '#EAE0CF',
    '--editable-border': 'rgba(114,136,174,0.45)',
    '--editable-container': '1440px',
  } as CSSProperties

  return (
    <header style={navVars} className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)] text-[#EAE0CF] backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[84px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[#4B5694] text-[#EAE0CF] shadow-sm transition group-hover:rotate-6">
            <img src={brandLogo.src} alt={`${SITE_CONFIG.name} logo`} className="h-full w-full object-cover" />
          </span>
          <span>
            <span className="block text-lg font-black tracking-[-0.04em]">{SITE_CONFIG.name}</span>
          </span>
        </Link>

        <form action="/search" className="mx-auto hidden min-w-0 max-w-2xl flex-1 md:block">
          <label className="flex h-12 items-center rounded-full border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-4 text-[#111844]">
            <Search className="h-4 w-4 opacity-60" />
            <input name="q" type="search" placeholder="Search products, services, locations, sellers" className="min-w-0 flex-1 bg-transparent px-3 text-sm font-semibold outline-none placeholder:text-current/45" />
          </label>
        </form>

        <div className="hidden items-center gap-2 xl:flex">
          {navItems.slice(0, 5).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link key={item.href} href={item.href} className={`rounded-full px-4 py-2 text-sm font-black transition ${active ? 'bg-[var(--editable-nav-active)] text-[var(--editable-nav-active-text)]' : 'hover:bg-white/10'}`}>
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link href="/login" className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-black hover:bg-white/10 sm:inline-flex"><LogIn className="h-4 w-4" /> Login</Link>
          <Link href="/signup" className="hidden items-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-4 py-2 text-sm font-black text-[var(--editable-cta-text)] sm:inline-flex"><UserPlus className="h-4 w-4" /> Post free</Link>
          <button type="button" onClick={() => setOpen((v) => !v)} className="rounded-full border border-[var(--editable-border)] bg-[#EAE0CF] p-2 text-[#111844] xl:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-4 xl:hidden">
          <form action="/search" className="mb-4 flex h-11 items-center rounded-2xl border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-3">
            <Search className="h-4 w-4 opacity-60" />
            <input name="q" type="search" placeholder="Search listings" className="min-w-0 flex-1 bg-transparent px-3 text-sm text-[#111844] outline-none" />
          </form>
          <div className="grid gap-2">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'Contact', href: '/contact' }, { label: 'About', href: '/about' }].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-2xl border border-[var(--editable-border)] bg-[#EAE0CF] px-4 py-3 text-sm font-black text-[#111844]">
                <span>{item.label}</span>
                <Sparkles className="h-4 w-4 opacity-60" />
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
// redesign-refresh-marker



