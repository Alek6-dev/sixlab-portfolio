'use client'

import Link from 'next/link'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronLeft,
  CircleHelp,
  Globe2,
  Pencil,
  RefreshCcw,
  Send,
  Smartphone,
} from 'lucide-react'
import {
  budgetModes,
  getOptionLabel,
  horizons,
  projectAnswersSchema,
  projectStages,
  projectTypes,
  sectors,
  startPreferences,
  type BudgetMode,
  type Horizon,
  type ProjectStage,
  type ProjectType,
  type Sector,
  type StartPreference,
} from '@/lib/submissions/domain'

type WizardState = {
  projectType: ProjectType | ''
  sector: Sector | ''
  projectStage: ProjectStage | ''
  startPreference: StartPreference | ''
  desiredStartDate: string
  horizon: Horizon | ''
  budgetMode: BudgetMode | ''
  budgetMin: number
  budgetMax: number
  email: string
  phone: string
  linkedinUrl: string
  website: string
}

const initialState: WizardState = {
  projectType: '',
  sector: '',
  projectStage: '',
  startPreference: '',
  desiredStartDate: '',
  horizon: '',
  budgetMode: '',
  budgetMin: 500,
  budgetMax: 50_000,
  email: '',
  phone: '',
  linkedinUrl: '',
  website: '',
}

const stepLabels = ['Type', 'Secteur', 'Situation', 'Calendrier', 'Budget']

const projectTypeIcons: Record<ProjectType, LucideIcon> = {
  website: Globe2,
  application: Smartphone,
  'internal-tool': BriefcaseBusiness,
  automation: Bot,
  other: CircleHelp,
}

function parisDate() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}

function formatMoney(value: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Paris',
  }).format(new Date(`${value}T12:00:00Z`))
}

export default function SubmissionWizard({
  startToken,
  scheduledEndAt,
}: {
  startToken: string
  scheduledEndAt: string | null
}) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<WizardState>(initialState)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [idempotencyKey, setIdempotencyKey] = useState(() => crypto.randomUUID())
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [step, isSubmitted])

  const scheduledEndLabel = useMemo(() => {
    if (!scheduledEndAt) return null
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Europe/Paris',
    }).format(new Date(scheduledEndAt))
  }, [scheduledEndAt])

  function update<K extends keyof WizardState>(key: K, value: WizardState[K]) {
    setAnswers((current) => ({ ...current, [key]: value }))
    setError('')
    setFieldErrors((current) => {
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  function validateCurrentStep() {
    if (step === 0 && !answers.projectType) return 'Choisissez un type de projet.'
    if (step === 1 && !answers.sector) return 'Choisissez un secteur d’activité.'
    if (step === 2 && !answers.projectStage) return 'Choisissez la situation actuelle du projet.'
    if (step === 3) {
      if (!answers.startPreference) return 'Choisissez un démarrage souhaité.'
      if (answers.startPreference === 'date' && !answers.desiredStartDate) {
        return 'Choisissez une date de démarrage.'
      }
      if (!answers.horizon) return 'Choisissez un horizon souhaité.'
    }
    if (step === 4) {
      if (!answers.budgetMode) return 'Choisissez une option de budget.'
      if (answers.budgetMode === 'range' && answers.budgetMin < 500) {
        return 'Le minimum doit être d’au moins 500 €.'
      }
      if (answers.budgetMode === 'range' && answers.budgetMax < answers.budgetMin) {
        return 'Le maximum doit être supérieur ou égal au minimum.'
      }
    }
    return ''
  }

  function goNext() {
    const validationError = validateCurrentStep()
    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    setStep((current) => Math.min(current + 1, 5))
  }

  function goBack() {
    setError('')
    setStep((current) => Math.max(current - 1, 0))
  }

  async function submit() {
    const candidate = {
      ...answers,
      budgetMin: answers.budgetMode === 'range' ? answers.budgetMin : null,
      budgetMax: answers.budgetMode === 'range' ? answers.budgetMax : null,
    }
    const parsed = projectAnswersSchema.safeParse(candidate)

    if (!parsed.success) {
      const errors: Record<string, string> = {}
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? 'form')
        errors[key] ??= issue.message
      }
      setFieldErrors(errors)
      setError('Vérifiez les coordonnées renseignées.')
      return
    }

    setIsSubmitting(true)
    setError('')
    setFieldErrors({})

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...parsed.data,
          idempotencyKey,
          startToken,
          website: answers.website,
        }),
      })
      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.ok) {
        setError(result?.error ?? 'Le dépôt n’a pas pu être enregistré. Vous pouvez réessayer.')
        return
      }

      setIsSubmitted(true)
    } catch {
      setError('Le dépôt n’a pas pu être enregistré. Vérifiez votre connexion et réessayez.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function reset() {
    setAnswers(initialState)
    setIdempotencyKey(crypto.randomUUID())
    setStep(0)
    setError('')
    setFieldErrors({})
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <section className="mt-12 rounded-lg border border-status-live-border bg-status-live-bg/50 p-7 sm:p-10">
        <CheckCircle2 className="h-10 w-10 text-status-live-text" strokeWidth={1.7} />
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mt-6 text-3xl font-semibold tracking-tight text-copy outline-none"
        >
          Votre fiche a bien été reçue.
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-copy-muted">
          Elle est maintenant disponible dans l’espace privé d’Alexis. Ce dépôt ne constitue pas
          une promesse de réponse, de devis ou de mission.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex items-center gap-2 rounded-lg border border-brand-200/60 px-5 py-3 text-sm font-semibold text-brand-100 transition-colors hover:border-brand-100"
        >
          <RefreshCcw size={16} />
          Déposer un autre projet
        </button>
      </section>
    )
  }

  return (
    <section className="mt-12 overflow-hidden rounded-lg border border-line bg-panel/70">
      <div className="border-b border-line px-5 py-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-medium text-copy">
            {step < 5 ? `Étape ${step + 1} sur 5` : 'Récapitulatif et coordonnées'}
          </p>
          {scheduledEndLabel && (
            <p className="text-xs text-copy-faint">Ouvert jusqu’au {scheduledEndLabel}</p>
          )}
        </div>
        <ol className="mt-5 grid grid-cols-5 gap-2" aria-label="Progression du parcours">
          {stepLabels.map((label, index) => {
            const isCurrent = index === step
            const isComplete = index < step
            return (
              <li key={label}>
                <div
                  aria-current={isCurrent ? 'step' : undefined}
                  className={`h-1.5 rounded-full ${
                    isComplete || isCurrent ? 'bg-brand-200' : 'bg-line'
                  }`}
                />
                <span className="sr-only">
                  {label} {isComplete ? 'terminé' : isCurrent ? 'en cours' : 'à venir'}
                </span>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="p-5 sm:p-8 lg:p-10">
        {step === 0 && (
          <StepSection headingRef={headingRef} title="Quel type de projet souhaitez-vous présenter ?">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {projectTypes.map((option) => (
                <ChoiceCard
                  key={option.value}
                  label={option.label}
                  icon={projectTypeIcons[option.value]}
                  selected={answers.projectType === option.value}
                  onClick={() => update('projectType', option.value)}
                />
              ))}
            </div>
          </StepSection>
        )}

        {step === 1 && (
          <StepSection headingRef={headingRef} title="Dans quel secteur s’inscrit le projet ?">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {sectors.slice(0, 10).map((option) => (
                <ChoiceCard
                  key={option.value}
                  label={option.label}
                  selected={answers.sector === option.value}
                  onClick={() => update('sector', option.value)}
                  compact
                />
              ))}
            </div>
            <div className="mt-3 sm:max-w-[calc(50%-0.375rem)] lg:mx-auto lg:max-w-[calc(20%-0.6rem)]">
              <ChoiceCard
                label={sectors[10].label}
                selected={answers.sector === sectors[10].value}
                onClick={() => update('sector', sectors[10].value)}
                compact
              />
            </div>
          </StepSection>
        )}

        {step === 2 && (
          <StepSection headingRef={headingRef} title="Où en est le projet aujourd’hui ?">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {projectStages.map((option) => (
                <ChoiceCard
                  key={option.value}
                  label={option.label}
                  selected={answers.projectStage === option.value}
                  onClick={() => update('projectStage', option.value)}
                />
              ))}
            </div>
          </StepSection>
        )}

        {step === 3 && (
          <StepSection headingRef={headingRef} title="Quel calendrier avez-vous en tête ?">
            <fieldset>
              <legend className="text-sm font-semibold text-copy">Démarrage souhaité</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {startPreferences.map((option) => (
                  <ChoiceCard
                    key={option.value}
                    label={option.label}
                    selected={answers.startPreference === option.value}
                    onClick={() => {
                      update('startPreference', option.value)
                      if (option.value === 'now') update('desiredStartDate', parisDate())
                      if (option.value === 'unscheduled') update('desiredStartDate', '')
                    }}
                    compact
                  />
                ))}
              </div>
              {answers.startPreference === 'date' && (
                <label className="mt-4 block max-w-sm text-sm text-copy-muted">
                  Date souhaitée
                  <input
                    type="date"
                    min={parisDate()}
                    value={answers.desiredStartDate}
                    onChange={(event) => update('desiredStartDate', event.target.value)}
                    className="mt-2 w-full rounded-lg border border-line bg-canvas px-4 py-3 text-copy outline-none transition-colors focus:border-brand-300 focus:ring-2 focus:ring-brand-200/20"
                  />
                </label>
              )}
            </fieldset>

            <fieldset className="mt-8 border-t border-line pt-8">
              <legend className="text-sm font-semibold text-copy">Horizon souhaité</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {horizons.map((option) => (
                  <ChoiceCard
                    key={option.value}
                    label={option.label}
                    selected={answers.horizon === option.value}
                    onClick={() => update('horizon', option.value)}
                    compact
                  />
                ))}
              </div>
            </fieldset>
          </StepSection>
        )}

        {step === 4 && (
          <StepSection headingRef={headingRef} title="Quelle enveloppe envisagez-vous ?">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {budgetModes.map((option) => (
                <ChoiceCard
                  key={option.value}
                  label={option.label}
                  selected={answers.budgetMode === option.value}
                  onClick={() => update('budgetMode', option.value)}
                  compact
                />
              ))}
            </div>

            {answers.budgetMode === 'range' && (
              <BudgetRange answers={answers} update={update} />
            )}
          </StepSection>
        )}

        {step === 5 && (
          <ReviewStep
            headingRef={headingRef}
            answers={answers}
            fieldErrors={fieldErrors}
            update={update}
            editStep={setStep}
          />
        )}

        {error && (
          <p role="alert" className="mt-7 rounded-lg border border-status-danger-text/30 bg-status-danger-bg/10 px-4 py-3 text-sm text-status-danger-text">
            {error}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-3 text-sm font-semibold text-copy-muted transition-colors hover:border-line-soft hover:text-copy"
            >
              <ChevronLeft size={17} />
              Retour
            </button>
          ) : (
            <span />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-200 px-5 py-3 text-sm font-semibold text-canvas transition-colors hover:bg-brand-100"
            >
              Continuer
              <ArrowRight size={17} />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-200 px-5 py-3 text-sm font-semibold text-canvas transition-colors hover:bg-brand-100 disabled:cursor-wait disabled:opacity-60"
            >
              <Send size={17} />
              {isSubmitting ? 'Dépôt en cours…' : 'Déposer la fiche'}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

function StepSection({
  headingRef,
  title,
  children,
}: {
  headingRef: React.RefObject<HTMLHeadingElement | null>
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h2 ref={headingRef} tabIndex={-1} className="mb-7 text-2xl font-semibold tracking-tight text-copy outline-none sm:text-3xl">
        {title}
      </h2>
      {children}
    </div>
  )
}

function ChoiceCard({
  label,
  selected,
  onClick,
  icon: Icon,
  compact = false,
}: {
  label: string
  selected: boolean
  onClick: () => void
  icon?: LucideIcon
  compact?: boolean
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`relative flex w-full items-center gap-3 rounded-lg border text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-200/60 ${
        compact ? 'min-h-16 px-4 py-3 text-sm' : 'min-h-24 px-5 py-5'
      } ${
        selected
          ? 'border-brand-300 bg-brand-900/35 text-copy'
          : 'border-line bg-canvas/35 text-copy-muted hover:border-line-soft hover:text-copy'
      }`}
    >
      {Icon && <Icon className="h-5 w-5 shrink-0 text-brand-200" strokeWidth={1.7} />}
      <span className="font-medium">{label}</span>
      {selected && (
        <span className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-200 text-canvas">
          <Check size={13} strokeWidth={2.5} />
        </span>
      )}
    </button>
  )
}

function BudgetRange({
  answers,
  update,
}: {
  answers: WizardState
  update: <K extends keyof WizardState>(key: K, value: WizardState[K]) => void
}) {
  const sliderMin = Math.min(Math.max(answers.budgetMin, 500), 50_000)
  const sliderMax = Math.min(Math.max(answers.budgetMax, 500), 50_000)
  const left = ((sliderMin - 500) / 49_500) * 100
  const right = 100 - ((sliderMax - 500) / 49_500) * 100

  return (
    <div className="mt-7 rounded-lg border border-line bg-canvas/35 p-5 sm:p-7">
      <div className="relative h-10">
        <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-line" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-brand-200"
          style={{ left: `${left}%`, right: `${right}%` }}
        />
        <input
          aria-label="Budget minimum"
          type="range"
          min="500"
          max="50000"
          step="500"
          value={sliderMin}
          onChange={(event) =>
            update('budgetMin', Math.min(Number(event.target.value), answers.budgetMax))
          }
          className="submission-range absolute inset-0 h-10 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200/60"
        />
        <input
          aria-label="Budget maximum"
          type="range"
          min="500"
          max="50000"
          step="500"
          value={sliderMax}
          onChange={(event) =>
            update('budgetMax', Math.max(Number(event.target.value), answers.budgetMin))
          }
          className="submission-range absolute inset-0 h-10 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200/60"
        />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-copy-muted">
          Minimum
          <input
            type="number"
            min="500"
            step="500"
            value={answers.budgetMin}
            onChange={(event) => update('budgetMin', Number(event.target.value))}
            className="mt-2 w-full rounded-lg border border-line bg-panel px-4 py-3 text-copy outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-200/20"
          />
        </label>
        <label className="text-sm text-copy-muted">
          Maximum
          <input
            type="number"
            min="500"
            step="500"
            value={answers.budgetMax}
            onChange={(event) => update('budgetMax', Number(event.target.value))}
            className="mt-2 w-full rounded-lg border border-line bg-panel px-4 py-3 text-copy outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-200/20"
          />
        </label>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-copy-faint">
        La limite visuelle du curseur est de 50 000 €. Un montant supérieur peut être saisi
        directement dans le champ maximum.
      </p>
    </div>
  )
}

function ReviewStep({
  headingRef,
  answers,
  fieldErrors,
  update,
  editStep,
}: {
  headingRef: React.RefObject<HTMLHeadingElement | null>
  answers: WizardState
  fieldErrors: Record<string, string>
  update: <K extends keyof WizardState>(key: K, value: WizardState[K]) => void
  editStep: (step: number) => void
}) {
  const startLabel = answers.startPreference
    ? `${getOptionLabel(startPreferences, answers.startPreference)}${
        answers.desiredStartDate ? ` — ${formatDate(answers.desiredStartDate)}` : ''
      }`
    : ''
  const budgetLabel =
    answers.budgetMode === 'range'
      ? `${formatMoney(answers.budgetMin)} – ${formatMoney(answers.budgetMax)}`
      : answers.budgetMode
        ? getOptionLabel(budgetModes, answers.budgetMode)
        : ''

  const rows = [
    {
      label: 'Type de projet',
      value: getOptionLabel(projectTypes, answers.projectType),
      step: 0,
    },
    { label: 'Secteur', value: getOptionLabel(sectors, answers.sector), step: 1 },
    {
      label: 'Situation actuelle',
      value: getOptionLabel(projectStages, answers.projectStage),
      step: 2,
    },
    { label: 'Démarrage', value: startLabel, step: 3 },
    { label: 'Horizon', value: getOptionLabel(horizons, answers.horizon), step: 3 },
    { label: 'Budget', value: budgetLabel, step: 4 },
  ]

  return (
    <div>
      <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold tracking-tight text-copy outline-none sm:text-3xl">
        Vérifiez votre fiche puis indiquez comment vous recontacter.
      </h2>

      <div className="mt-7 divide-y divide-line rounded-lg border border-line bg-canvas/35">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-5 px-4 py-4 sm:px-5">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-copy-faint">{row.label}</p>
              <p className="mt-1 text-sm font-medium text-copy">{row.value}</p>
            </div>
            <button
              type="button"
              onClick={() => editStep(row.step)}
              className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-brand-200 hover:text-brand-100"
            >
              <Pencil size={13} />
              Modifier
            </button>
          </div>
        ))}
      </div>

      <fieldset className="mt-9">
        <legend className="text-base font-semibold text-copy">Au moins un moyen de contact</legend>
        <p className="mt-2 text-sm text-copy-faint">Un seul champ valide suffit. Les autres restent facultatifs.</p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <ContactField
            label="E-mail"
            type="email"
            autoComplete="email"
            value={answers.email}
            error={fieldErrors.email}
            onChange={(value) => update('email', value)}
          />
          <ContactField
            label="Téléphone"
            type="tel"
            autoComplete="tel"
            value={answers.phone}
            error={fieldErrors.phone}
            onChange={(value) => update('phone', value)}
          />
          <ContactField
            label="Profil LinkedIn"
            type="url"
            autoComplete="url"
            value={answers.linkedinUrl}
            error={fieldErrors.linkedinUrl}
            placeholder="https://www.linkedin.com/in/…"
            onChange={(value) => update('linkedinUrl', value)}
            className="sm:col-span-2"
          />
        </div>

        <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label>
            Site web
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={answers.website}
              onChange={(event) => update('website', event.target.value)}
            />
          </label>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-copy-faint">
          Ces informations servent uniquement à traiter cette fiche et à reprendre contact au sujet
          du projet. Consultez la{' '}
          <Link
            href="/confidentialite"
            target="_blank"
            className="text-brand-200 underline decoration-brand-300/50 underline-offset-4 hover:text-brand-100"
          >
            politique de confidentialité
          </Link>
          .
        </p>
      </fieldset>
    </div>
  )
}

function ContactField({
  label,
  value,
  onChange,
  error,
  className = '',
  ...inputProps
}: {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  className?: string
} & Pick<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'autoComplete' | 'placeholder'>) {
  const errorId = `${label.toLowerCase().replace(/\s/g, '-')}-error`

  return (
    <label className={`text-sm text-copy-muted ${className}`}>
      {label}
      <input
        {...inputProps}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`mt-2 w-full rounded-lg border bg-canvas px-4 py-3 text-copy outline-none transition-colors focus:ring-2 focus:ring-brand-200/20 ${
          error ? 'border-status-danger-text/70' : 'border-line focus:border-brand-300'
        }`}
      />
      {error && (
        <span id={errorId} className="mt-2 block text-xs text-status-danger-text">
          {error}
        </span>
      )}
    </label>
  )
}
