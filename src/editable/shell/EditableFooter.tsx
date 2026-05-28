import Link from 'next/link'
import { ArrowUpRight, MapPin, ShieldCheck } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import brandLogo from '@/editable/theme/brand-logo.png'

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[#8f6a6a]/25 bg-[#111844] text-[#EAE0CF]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl border border-[#7288AE]/45 bg-[#EAE0CF]">
              <img src={brandLogo.src} alt={`${SITE_CONFIG.name} logo`} className="h-full w-full object-cover" />
            </span>
            <h3 className="text-2xl font-black tracking-[-0.05em]">{SITE_CONFIG.name}</h3>
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-[#f2ddd4]/90">A trusted marketplace-style destination to buy, sell, rent, promote, and advertise across multiple categories.</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.16em]">
            <span className="rounded-full border border-[#f1e2d1]/25 px-3 py-1">Verified posts</span>
            <span className="rounded-full border border-[#f1e2d1]/25 px-3 py-1">Daily updates</span>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.22em] text-[#b8c5df]">Categories</h3>
          <div className="mt-4 grid gap-2">
            {taskLinks.map((task) => (
              <Link key={task.key} href={task.route} className="inline-flex items-center gap-2 text-sm font-bold text-[#f1e2d1]/90 hover:text-white">
                {task.label} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.22em] text-[#b8c5df]">Support</h3>
          <div className="mt-4 grid gap-3 text-sm font-bold text-[#f1e2d1]/90">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <p className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> Nationwide audience reach</p>
            <p className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Safety-first posting flow</p>
          </div>
        </div>
      </div>
      <div className="border-t border-[#f1e2d1]/20 px-4 py-5 text-center text-xs font-bold text-[#f1e2d1]/85">
        © {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
