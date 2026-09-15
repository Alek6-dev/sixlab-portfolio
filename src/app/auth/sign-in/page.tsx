import type { Metadata } from 'next'
import Link from 'next/link'
import GitHubSignInButton from '@/components/auth/GitHubSignInButton'

export const metadata: Metadata = {
  title: 'Connexion administrateur - Sixlab',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminSignInPage() {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 items-center px-6 py-20 sm:py-28">
      <div className="w-full rounded-lg border border-line bg-panel/70 p-7 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-200">
          Espace privé
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-copy">
          Administration Sixlab
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-copy-muted">
          Cet espace est réservé au propriétaire du portfolio.
        </p>
        <div className="mt-8">
          <GitHubSignInButton />
        </div>
        <Link
          href="/"
          className="mt-7 inline-flex text-sm text-copy-muted transition-colors hover:text-copy"
        >
          Retour au portfolio
        </Link>
      </div>
    </main>
  )
}
