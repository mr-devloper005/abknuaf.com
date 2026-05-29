import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: 'Local signup page for this public site.' })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="mx-auto max-w-[var(--editable-container)] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="rounded-[1.8rem] border border-[var(--editable-border)] bg-[linear-gradient(180deg,#ffffff_0%,#f2f6ff_100%)] p-5 shadow-[0_14px_35px_rgba(16,23,40,0.06)] sm:p-7 lg:p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.26em] text-[var(--slot4-accent)]">Site access</p>
            <h1 className="mt-3 max-w-lg text-3xl font-black leading-[0.96] tracking-[-0.06em] sm:text-4xl">
              Create your Abknuaf account.
            </h1>
            <p className="mt-3 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">
              Set up a local session and keep browsing with a simple browser-only sign up.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-[0.16em]">
              <span className="rounded-full border border-[var(--editable-border)] bg-white px-3 py-1">Fast setup</span>
              <span className="rounded-full border border-[var(--editable-border)] bg-white px-3 py-1">Local session</span>
            </div>
          </div>
          <div className="rounded-[1.8rem] border border-[var(--editable-border)] bg-white p-5 shadow-[0_14px_35px_rgba(16,23,40,0.06)] sm:p-7 lg:p-8">
            <h2 className="text-xl font-black tracking-[-0.04em]">Create account</h2>
            <EditableLocalSignupForm />
            <p className="mt-4 text-sm text-[var(--slot4-muted-text)]">
              Already have an account?{' '}
              <Link href="/login" className="font-black text-[var(--slot4-accent)] underline-offset-4 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
