import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, CalendarClock } from 'lucide-react'
import SubmissionWizard from '@/components/submissions/SubmissionWizard'
import { getActivePeriod } from '@/lib/submissions/repository'
import { createSubmissionStartToken } from '@/lib/submissions/session-token'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Soumettre un projet - Sixlab',
  description:
    'Présentez les grandes lignes de votre projet à Alexis au moyen d’un parcours guidé et rapide.',
  alternates: {
    canonical: '/soumettre-un-projet',
  },
}

export default async function SubmitProjectPage() {
  const state = await getSubmissionPageState()

  if (state.kind === 'unavailable') {
    return <UnavailableState />
  }

  if (state.kind === 'closed') {
    return <ClosedState />
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-copy-muted transition-colors hover:text-copy"
      >
        <ArrowLeft size={16} />
        Retour au portfolio
      </Link>

      <div className="mt-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-200">
          Soumission de projet
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-copy sm:text-5xl">
          Les grandes lignes suffisent pour commencer.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-copy-muted">
          Quelques choix, un récapitulatif, puis le moyen de vous recontacter si une discussion
          peut être utile.
        </p>
      </div>

      <SubmissionWizard
        startToken={state.startToken}
        scheduledEndAt={state.scheduledEndAt}
      />
    </main>
  )
}

async function getSubmissionPageState() {
  try {
    const period = await getActivePeriod()

    if (!period) {
      return { kind: 'closed' as const }
    }

    return {
      kind: 'open' as const,
      scheduledEndAt: period.scheduledEndAt,
      startToken: createSubmissionStartToken({
        periodId: period.id,
        issuedAt: new Date().toISOString(),
      }),
    }
  } catch {
    return { kind: 'unavailable' as const }
  }
}

function ClosedState() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 items-center px-6 py-20 sm:py-28">
      <div className="w-full rounded-lg border border-line bg-panel/70 p-7 sm:p-10">
        <CalendarClock className="h-9 w-9 text-brand-200" strokeWidth={1.7} />
        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-brand-200">
          Soumissions fermées
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-copy sm:text-4xl">
          Les dépôts ne sont pas ouverts actuellement.
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-copy-muted">
          L’espace reste accessible, mais aucune nouvelle fiche ne peut être commencée pour le
          moment.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-200 transition-colors hover:text-brand-100"
        >
          <ArrowLeft size={16} />
          Continuer sur le portfolio
        </Link>
      </div>
    </main>
  )
}

function UnavailableState() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 items-center px-6 py-20 sm:py-28">
      <div className="w-full rounded-lg border border-line bg-panel/70 p-7 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-200">
          Espace indisponible
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-copy sm:text-4xl">
          Impossible de vérifier l’ouverture des soumissions.
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-copy-muted">
          Aucun dépôt n’est possible tant que l’état du dispositif ne peut pas être confirmé.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-200 transition-colors hover:text-brand-100"
        >
          <ArrowLeft size={16} />
          Retour au portfolio
        </Link>
      </div>
    </main>
  )
}
