import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { AdminAccessError, requireAdminIdentity } from '@/lib/auth/authorization'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Administration - Sixlab',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminPage() {
  const user = await getAdminPageUser()

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-200">
        Espace privé
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-copy">
        Bonjour {user.name ?? 'Alexis'}
      </h1>
      <p className="mt-4 max-w-2xl text-copy-muted">
        La connexion administrateur est vérifiée. Le pilotage des périodes et les fiches reçues
        seront ajoutés dans le prochain lot.
      </p>
    </main>
  )
}

async function getAdminPageUser() {
  try {
    return await requireAdminIdentity()
  } catch (error) {
    if (error instanceof AdminAccessError) {
      if (error.reason === 'unauthenticated') {
        redirect('/auth/sign-in')
      }

      if (error.reason === 'forbidden') {
        notFound()
      }
    }

    throw error
  }
}
