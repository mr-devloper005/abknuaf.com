'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X, PlusCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navVars = { '--editable-nav-bg': '#08132f', '--editable-nav-text': '#ffffff', '--editable-nav-active': '#ffd84d', '--editable-nav-active-text': '#08132f', '--editable-cta-bg': '#4d63ff', '--editable-cta-text': '#ffffff', '--editable-search-bg': '#ffffff', '--editable-border': 'rgba(255,255,255,0.16)', '--editable-container': '1440px' } as CSSProperties
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })),
    []
  )

  return (
    <header style={navVars} className="sticky top-0 z-50 border-b border-white/10 bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)] shadow-[0_12px_40px_rgba(8,19,47,0.22)]">
      <nav className="mx-auto flex min-h-[82px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-transform group-hover:-rotate-3">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-11 w-11 object-contain" />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block max-w-[180px] truncate text-lg font-black tracking-[-0.05em]">{SITE_CONFIG.name}</span>
          </span>
        </Link>

        <form action="/search" className="mx-auto hidden min-w-0 flex-1 justify-center md:flex">
          <label className="relative flex w-full max-w-xl items-center rounded-2xl border border-white/10 bg-white px-4 py-3 text-[#08132f] shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
            <Search className="h-4 w-4 text-[#4d63ff]" />
            <input name="q" type="search" placeholder="What are you looking for?" className="min-w-0 flex-1 bg-transparent px-3 text-sm font-bold outline-none placeholder:text-[#08132f]/40" />
          </label>
        </form>

        <div className="hidden items-center gap-2 lg:flex">
          {navItems.slice(0, 4).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link key={item.href} href={item.href} className={`rounded-xl px-4 py-2 text-sm font-black transition ${active ? 'bg-[var(--editable-nav-active)] text-[var(--editable-nav-active-text)]' : 'text-white/75 hover:bg-white/10 hover:text-white'}`}>
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {session ? (
            <>
              <Link href="/create" className="hidden items-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-black text-[var(--editable-cta-text)] shadow-sm sm:inline-flex"><PlusCircle className="h-4 w-4" /> Create</Link>
              <button type="button" onClick={logout} className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-black hover:bg-black/5 sm:inline-flex">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-black text-white/80 hover:bg-white/10 hover:text-white sm:inline-flex"><LogIn className="h-4 w-4" /> Login</Link>
              <Link href="/signup" className="hidden items-center gap-2 rounded-xl bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-black text-white shadow-[0_8px_24px_rgba(77,99,255,0.35)] transition hover:-translate-y-0.5 sm:inline-flex"><UserPlus className="h-4 w-4" /> Sign Up</Link>
            </>
          )}
          <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-xl border border-white/20 bg-white/10 p-2 text-white lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-[var(--editable-nav-bg)] px-4 py-4 lg:hidden">
          <form action="/search" className="mb-4 flex rounded-2xl bg-white px-3 py-2 text-[#08132f]">
            <Search className="mt-1 h-4 w-4 opacity-55" />
            <input name="q" type="search" placeholder="Search posts" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" />
          </form>
          <div className="grid gap-2">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-black text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
