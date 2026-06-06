import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Sparkles } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#ffd84d] text-[#08132f]">
        <section className="mx-auto grid min-h-[calc(100vh-82px)] max-w-[var(--editable-container)] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-12">
          <div className="flex items-center">
            <div className="w-full rounded-[2.5rem] bg-white p-7 shadow-[0_28px_70px_rgba(8,19,47,0.18)] sm:p-10 lg:p-12">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4d63ff] text-white shadow-[0_10px_24px_rgba(77,99,255,0.3)]">
                <Sparkles className="h-6 w-6" />
              </div>
              <p className="mt-7 text-[11px] font-black uppercase tracking-[0.24em] text-[#4d63ff]">Free membership</p>
              <h1 className="mt-3 text-4xl font-black tracking-[-0.06em]">{pagesContent.auth.signup.formTitle}</h1>
              <EditableLocalSignupForm />
              <p className="mt-6 border-t border-[#e3e6ee] pt-6 text-sm text-[#63708a]">
                Already have an account? <Link href="/login" className="inline-flex items-center gap-1 font-black text-[#4d63ff] hover:underline">{pagesContent.auth.signup.loginCta} <ArrowRight className="h-4 w-4" /></Link>
              </p>
            </div>
          </div>
          <div className="relative flex min-h-[520px] flex-col justify-center overflow-hidden rounded-[2.5rem] bg-[#4d63ff] p-8 text-white shadow-[0_28px_70px_rgba(77,99,255,0.32)] sm:p-12 lg:p-14">
            <div className="absolute right-[-70px] top-[-70px] h-64 w-64 rounded-full border-[40px] border-white/10" />
            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#ffd84d]">{pagesContent.auth.signup.badge}</p>
              <h2 className="mt-6 max-w-2xl text-5xl font-black leading-[0.9] tracking-[-0.075em] sm:text-6xl lg:text-7xl">{pagesContent.auth.signup.title}</h2>
              <p className="mt-7 max-w-xl text-base leading-8 text-white/70">{pagesContent.auth.signup.description}</p>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {['Post local offers', 'Manage your content', 'Reach nearby visitors', 'Simple account access'].map((item) => (
                  <span key={item} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-black">
                    <BadgeCheck className="h-5 w-5 text-[#ffd84d]" /> {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
