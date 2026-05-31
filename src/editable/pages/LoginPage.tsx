import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: 'Local login page for this public site.' })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="mx-auto max-w-[var(--editable-container)] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="rounded-[1.8rem] border border-[var(--editable-border)] bg-[linear-gradient(180deg,#f7f9fc_0%,#eef3ff_100%)] p-5 shadow-[0_14px_35px_rgba(16,23,40,0.06)] sm:p-7 lg:p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.26em] text-[var(--slot4-accent)]">Member access</p>
            <h1 className="mt-3 max-w-lg text-3xl font-black leading-[0.96] tracking-[-0.06em] sm:text-4xl">
              Welcome back to Abknuaf.
            </h1>
            <p className="mt-3 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">
              Sign in with your local browser session and keep moving without backend auth.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-[0.16em]">
              <span className="rounded-full border border-[var(--editable-border)] bg-white px-3 py-1">Fast access</span>
              <span className="rounded-full border border-[var(--editable-border)] bg-white px-3 py-1">Local session</span>
            </div>
          </div>
          <div className="rounded-[1.8rem] border border-[var(--editable-border)] bg-white p-5 shadow-[0_14px_35px_rgba(16,23,40,0.06)] sm:p-7 lg:p-8">
            <h2 className="text-xl font-black tracking-[-0.04em]">Login</h2>
            <EditableLocalLoginForm />
            <p className="mt-4 text-sm text-[var(--slot4-muted-text)]">
              New here?{' '}
              <Link href="/signup" className="font-black text-[var(--slot4-accent)] underline-offset-4 hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
