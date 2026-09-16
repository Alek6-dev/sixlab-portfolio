import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import SubmissionPeriodPanel from '@/components/admin/SubmissionPeriodPanel'
import { AdminAccessError, requireAdminIdentity } from '@/lib/auth/authorization'
import {
  listPeriods,
  type SubmissionPeriod,
} from '@/lib/submissions/repository'

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
  const periods = await listPeriods()
  const activePeriod = periods.find((period) => period.isOpen) ?? null
  const previousPeriods = periods.filter((period) => !period.isOpen)

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-200">
        Espace privé
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-copy">
        Bonjour {user.name ?? 'Alexis'}
      </h1>
      <p className="mt-4 max-w-2xl text-copy-muted">
        Pilotez ici l’ouverture des dépôts. Les fiches reçues seront ajoutées dans
        le prochain lot.
      </p>

      <div className="mt-10">
        <SubmissionPeriodPanel
          key={activePeriod?.id ?? 'closed'}
          activePeriod={
            activePeriod
              ? {
                  id: activePeriod.id,
                  startedAtLabel: formatDateTime(activePeriod.startedAt),
                  scheduledEndAtLabel: activePeriod.scheduledEndAt
                    ? formatDateTime(activePeriod.scheduledEndAt)
                    : null,
                  scheduledEndDateInput: activePeriod.scheduledEndAt
                    ? formatDateInput(activePeriod.scheduledEndAt)
                    : '',
                }
              : null
          }
          minimumEndDate={formatDateInput(new Date().toISOString())}
        />
      </div>

      <PeriodHistory periods={previousPeriods} />
    </main>
  )
}

function PeriodHistory({ periods }: { periods: SubmissionPeriod[] }) {
  return (
    <section className="mt-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copy-faint">
          Historique
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-copy">
          Périodes précédentes
        </h2>
      </div>

      {periods.length === 0 ? (
        <p className="mt-5 text-sm text-copy-muted">
          Aucune période fermée pour le moment.
        </p>
      ) : (
        <div className="mt-5 overflow-hidden rounded-lg border border-line">
          {periods.map((period, index) => (
            <div
              key={period.id}
              className={`grid gap-3 bg-panel/50 px-5 py-4 sm:grid-cols-[1fr_1fr_auto] sm:items-center ${
                index > 0 ? 'border-t border-line' : ''
              }`}
            >
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-copy-faint">
                  Début
                </p>
                <p className="mt-1 text-sm text-copy">
                  {formatDateTime(period.startedAt)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-copy-faint">
                  Fin
                </p>
                <p className="mt-1 text-sm text-copy">
                  {period.effectiveClosedAt
                    ? formatDateTime(period.effectiveClosedAt)
                    : 'Non renseignée'}
                </p>
              </div>
              <span className="w-fit rounded-lg border border-line bg-canvas px-3 py-1.5 text-xs font-medium text-copy-muted">
                {period.closedAt ? 'Fermée manuellement' : 'Terminée automatiquement'}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
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

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Paris',
  }).format(new Date(value))
}

function formatDateInput(value: string) {
  const parts = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Europe/Paris',
  }).formatToParts(new Date(value))
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))

  return `${values.year}-${values.month}-${values.day}`
}
