'use client'

import { useActionState, useState } from 'react'
import { CalendarClock, LoaderCircle, LockKeyhole } from 'lucide-react'
import {
  closePeriodAction,
  openPeriodAction,
  updatePeriodEndAction,
  type PeriodActionState,
} from '@/app/admin/period-actions'

type ActivePeriod = {
  id: string
  startedAtLabel: string
  scheduledEndAtLabel: string | null
  scheduledEndDateInput: string
}

type SubmissionPeriodPanelProps = {
  activePeriod: ActivePeriod | null
  minimumEndDate: string
}

const initialState: PeriodActionState = { status: 'idle', message: '' }

export default function SubmissionPeriodPanel({
  activePeriod,
  minimumEndDate,
}: SubmissionPeriodPanelProps) {
  return (
    <section className="rounded-lg border border-line bg-panel/70 p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <div className="rounded-lg border border-line bg-canvas p-3 text-brand-200">
          <CalendarClock className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">
            Période de soumission
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-copy">
            {activePeriod ? 'Dépôts ouverts' : 'Dépôts fermés'}
          </h2>
        </div>
      </div>

      {activePeriod ? (
        <ActivePeriodControls
          activePeriod={activePeriod}
          minimumEndDate={minimumEndDate}
        />
      ) : (
        <OpenPeriodForm minimumEndDate={minimumEndDate} />
      )}
    </section>
  )
}

function OpenPeriodForm({ minimumEndDate }: { minimumEndDate: string }) {
  const [state, formAction, pending] = useActionState(
    openPeriodAction,
    initialState
  )

  return (
    <form action={formAction} className="mt-7">
      <p className="max-w-2xl text-sm leading-relaxed text-copy-muted">
        L’ouverture est immédiate. La date de fin est facultative et correspondra
        à 23 h 59, heure de Paris.
      </p>
      <DateField minimumEndDate={minimumEndDate} />
      <button
        type="submit"
        disabled={pending}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-200 px-5 py-3 text-sm font-semibold text-canvas transition-colors hover:bg-brand-100 disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
        Ouvrir les dépôts
      </button>
      <ActionFeedback state={state} />
    </form>
  )
}

function ActivePeriodControls({
  activePeriod,
  minimumEndDate,
}: {
  activePeriod: ActivePeriod
  minimumEndDate: string
}) {
  const [updateState, updateAction, updatePending] = useActionState(
    updatePeriodEndAction,
    initialState
  )
  const [closeState, closeAction, closePending] = useActionState(
    closePeriodAction,
    initialState
  )
  const [confirmClose, setConfirmClose] = useState(false)

  return (
    <div className="mt-7">
      <dl className="grid gap-4 border-y border-line py-5 sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-[0.16em] text-copy-faint">
            Ouverte le
          </dt>
          <dd className="mt-2 text-sm text-copy">{activePeriod.startedAtLabel}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.16em] text-copy-faint">
            Fin programmée
          </dt>
          <dd className="mt-2 text-sm text-copy">
            {activePeriod.scheduledEndAtLabel ?? 'Aucune'}
          </dd>
        </div>
      </dl>

      <form action={updateAction} className="mt-6">
        <input type="hidden" name="periodId" value={activePeriod.id} />
        <p className="text-sm leading-relaxed text-copy-muted">
          Modifiez la date pour prolonger la période, ou laissez le champ vide
          pour retirer la fermeture programmée.
        </p>
        <DateField
          defaultValue={activePeriod.scheduledEndDateInput}
          minimumEndDate={minimumEndDate}
        />
        <button
          type="submit"
          disabled={updatePending}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg border border-line px-5 py-3 text-sm font-semibold text-copy transition-colors hover:border-brand-300 hover:text-brand-100 disabled:cursor-wait disabled:opacity-70"
        >
          {updatePending ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : null}
          Enregistrer la date
        </button>
        <ActionFeedback state={updateState} />
      </form>

      <div className="mt-8 border-t border-line pt-6">
        {!confirmClose ? (
          <button
            type="button"
            onClick={() => setConfirmClose(true)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-copy-muted transition-colors hover:text-copy"
          >
            <LockKeyhole className="h-4 w-4" aria-hidden="true" />
            Fermer les dépôts maintenant
          </button>
        ) : (
          <div className="rounded-lg border border-status-progress-border bg-status-progress-bg/40 p-4">
            <p className="text-sm font-medium text-copy">
              Cette période ne pourra pas être rouverte.
            </p>
            <p className="mt-1 text-sm text-copy-muted">
              Les parcours déjà commencés garderont leur délai maximal de 24 heures.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <form action={closeAction}>
                <input type="hidden" name="periodId" value={activePeriod.id} />
                <button
                  type="submit"
                  disabled={closePending}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-200 px-4 py-2.5 text-sm font-semibold text-canvas transition-colors hover:bg-brand-100 disabled:cursor-wait disabled:opacity-70"
                >
                  {closePending ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : null}
                  Confirmer la fermeture
                </button>
              </form>
              <button
                type="button"
                onClick={() => setConfirmClose(false)}
                disabled={closePending}
                className="px-3 py-2.5 text-sm text-copy-muted transition-colors hover:text-copy disabled:opacity-70"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
        <ActionFeedback state={closeState} />
      </div>
    </div>
  )
}

function DateField({
  minimumEndDate,
  defaultValue = '',
}: {
  minimumEndDate: string
  defaultValue?: string
}) {
  return (
    <div className="mt-5 max-w-sm">
      <label
        htmlFor="scheduled-end-date"
        className="text-sm font-medium text-copy"
      >
        Date de fin facultative
      </label>
      <input
        id="scheduled-end-date"
        name="scheduledEndDate"
        type="date"
        min={minimumEndDate}
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-lg border border-line bg-canvas px-4 py-3 text-sm text-copy outline-none transition-colors focus:border-brand-300"
      />
    </div>
  )
}

function ActionFeedback({ state }: { state: PeriodActionState }) {
  if (state.status === 'idle') return null

  return (
    <p
      className={`mt-4 text-sm ${
        state.status === 'success'
          ? 'text-status-live-text'
          : 'text-status-experiment-text'
      }`}
      role={state.status === 'error' ? 'alert' : 'status'}
      aria-live="polite"
    >
      {state.message}
    </p>
  )
}
