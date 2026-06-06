import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, LockKeyhole } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#eef1f7] text-[#08132f]">
        <section className="mx-auto grid min-h-[calc(100vh-82px)] max-w-[var(--editable-container)] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-12">
          <div className="relative flex min-h-[520px] flex-col justify-between overflow-hidden rounded-[2.5rem] bg-[#08132f] p-7 text-white shadow-[0_30px_80px_rgba(8,19,47,0.28)] sm:p-10 lg:p-14">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#4d63ff] blur-[1px]" />
            <div className="absolute bottom-[-120px] left-[-80px] h-72 w-72 rounded-full border-[45px] border-[#ffd84d]/90" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#ffd84d]">
                <LockKeyhole className="h-4 w-4" /> {pagesContent.auth.login.badge}
              </span>
              <h1 className="mt-8 max-w-2xl text-5xl font-black leading-[0.9] tracking-[-0.075em] sm:text-6xl lg:text-7xl">{pagesContent.auth.login.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/65">{pagesContent.auth.login.description}</p>
            </div>
            <div className="relative grid gap-3 pt-12 text-sm font-bold text-white/80 sm:grid-cols-3">
              {['Browse faster', 'Save your details', 'Publish listings'].map((item) => (
                <span key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#ffd84d]" /> {item}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-full rounded-[2.5rem] border border-[#d9deea] bg-white p-7 shadow-[0_24px_70px_rgba(8,19,47,0.1)] sm:p-10 lg:p-12">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#4d63ff]">Welcome back</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.06em]">{pagesContent.auth.login.formTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-[#63708a]">Enter your account details to continue.</p>
              <EditableLocalLoginForm />
              <p className="mt-6 border-t border-[#e3e6ee] pt-6 text-sm text-[#63708a]">
                New here? <Link href="/signup" className="inline-flex items-center gap-1 font-black text-[#4d63ff] hover:underline">{pagesContent.auth.login.createCta} <ArrowRight className="h-4 w-4" /></Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
