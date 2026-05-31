'use client'

import { useEffect, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import brandLogo from '@/editable/theme/brand-logo.png'

export function EditableNavbar() {
  const pathname = usePathname()
  const navItems = [
    { label: 'Classified', href: '/classified' },
    { label: 'Signup', href: '/signup' },
    { label: 'Login', href: '/login' },
  ]

  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>('link[rel*="icon"]')
    if (favicon) favicon.href = brandLogo.src
  }, [])

  const navVars = {
    '--editable-nav-bg': '#ffffff',
    '--editable-nav-text': '#10141f',
    '--editable-nav-active': '#2d63f1',
    '--editable-nav-active-text': '#ffffff',
    '--editable-cta-bg': '#2d63f1',
    '--editable-cta-text': '#ffffff',
    '--editable-search-bg': '#f4f6fb',
    '--editable-border': '#d8dde8',
    '--editable-container': '1440px',
  } as CSSProperties

  return (
    <header style={navVars} className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)] shadow-[0_6px_24px_rgba(15,23,42,0.06)]">
      <nav className="mx-auto flex w-full max-w-[var(--editable-container)] flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:flex-nowrap lg:px-8">
        <Link href="/" className="flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-3 py-2 text-sm font-black tracking-[-0.02em] transition hover:-translate-y-0.5 hover:shadow-sm">
          <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-[var(--editable-nav-active)] text-white shadow-sm">
            <img src={brandLogo.src} alt={`${SITE_CONFIG.name} logo`} className="h-full w-full object-cover" />
          </span>
          <span className="hidden sm:block">{SITE_CONFIG.name}</span>
        </Link>

        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition duration-300 hover:-translate-y-0.5 hover:border-[var(--editable-nav-active)] hover:text-[var(--editable-nav-active)] ${pathname === item.href || pathname?.startsWith(`${item.href}/`) ? 'border-[var(--editable-nav-active)] bg-[var(--editable-nav-active)] text-white shadow-sm' : 'border-[var(--editable-border)] bg-white'}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <form action="/search" className="hidden h-11 min-w-[220px] items-center rounded-full border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-3 md:flex">
          <Search className="h-4 w-4 text-black/45" />
          <input
            name="q"
            type="search"
            placeholder={globalContent.nav.tagline}
            className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-black/45"
          />
        </form>

        <div className="ml-auto flex items-center gap-2">
        </div>
      </nav>
    </header>
  )
}
