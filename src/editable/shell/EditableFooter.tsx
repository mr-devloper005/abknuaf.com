import Link from 'next/link'
import { ArrowUpRight, MapPin, ShieldCheck } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import brandLogo from '@/editable/theme/brand-logo.png'

export function EditableFooter() {
  return (
    <footer className="mt-16 bg-white text-[var(--slot4-page-text)]">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-[var(--editable-border)] pb-10 lg:grid-cols-[1.1fr_1.1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[#f7f9fc]">
                <img src={brandLogo.src} alt={`${SITE_CONFIG.name} logo`} className="h-full w-full object-cover" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-muted-text)]">{globalContent.footer.tagline}</p>
                <h2 className="mt-1 text-2xl font-black tracking-[-0.05em]">{SITE_CONFIG.name}</h2>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">{globalContent.footer.description}</p>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">Explore</h3>
            <div className="mt-4 grid gap-2">
              {globalContent.footer.columns[0].links.map((link) => (
                <Link key={link.href} href={link.href} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)]">
                  {link.label} <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">Support</h3>
            <div className="mt-4 grid gap-2">
              {globalContent.footer.columns[1].links.map((link) => (
                <Link key={link.href} href={link.href} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)]">
                  {link.label} <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ))}
              <p className="inline-flex items-center gap-2 text-sm text-[var(--slot4-muted-text)]">
                <MapPin className="h-4 w-4" />
                Nationwide reach
              </p>
              <p className="inline-flex items-center gap-2 text-sm text-[var(--slot4-muted-text)]">
                <ShieldCheck className="h-4 w-4" />
                Safer browsing flow
              </p>
            </div>
          </div>

        
        </div>
      </div>

      <div className="bg-[#1849cf] text-white">
        <div className="mx-auto flex max-w-[var(--editable-container)] flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-6">
            <div className="grid grid-cols-2 gap-6 text-sm font-black uppercase tracking-[0.16em] sm:grid-cols-5">
              <span>{SITE_CONFIG.name}</span>
              <span>Classified</span>
              <span>Signup</span>
              <span>Login</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
