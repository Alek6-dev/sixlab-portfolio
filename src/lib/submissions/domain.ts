import { z } from 'zod'

export const projectTypes = [
  { value: 'website', label: 'Site web' },
  { value: 'application', label: 'Application mobile ou web' },
  { value: 'internal-tool', label: 'Logiciel métier / outil interne' },
  { value: 'automation', label: 'Automatisation' },
  { value: 'other', label: 'Autre / pas encore défini' },
] as const

export const sectors = [
  { value: 'finance-management', label: 'Finance & gestion' },
  { value: 'sport-leisure', label: 'Sport & loisirs' },
  { value: 'health-wellbeing', label: 'Santé & bien-être' },
  { value: 'building-real-estate', label: 'Bâtiment & immobilier' },
  { value: 'commerce-retail', label: 'Commerce & distribution' },
  { value: 'tourism-hospitality', label: 'Tourisme & restauration' },
  { value: 'education-training', label: 'Éducation & formation' },
  { value: 'culture-events', label: 'Culture & événementiel' },
  { value: 'industry-logistics', label: 'Industrie & logistique' },
  { value: 'tech-digital', label: 'Tech & numérique' },
  { value: 'other', label: 'Autre' },
] as const

export const projectStages = [
  { value: 'idea', label: 'Idée' },
  { value: 'structured-need', label: 'Besoin structuré' },
  { value: 'in-progress', label: 'En construction' },
  { value: 'existing-product', label: 'Produit existant' },
] as const

export const startPreferences = [
  { value: 'now', label: 'Dès maintenant' },
  { value: 'date', label: 'Choisir une date' },
  { value: 'unscheduled', label: 'Pas de date prévue' },
] as const

export const horizons = [
  { value: 'under-1-month', label: 'Moins d’1 mois' },
  { value: '1-3-months', label: '1–3 mois' },
  { value: '3-6-months', label: '3–6 mois' },
  { value: '6-12-months', label: '6–12 mois' },
  { value: 'over-1-year', label: 'Plus d’un an' },
  { value: 'no-deadline', label: 'Sans échéance' },
] as const

export const budgetModes = [
  { value: 'range', label: 'Fourchette définie' },
  { value: 'below-minimum', label: 'Moins de 500 €' },
  { value: 'above-maximum', label: 'Plus de 50 000 €' },
  { value: 'undefined', label: 'Pas de budget défini' },
] as const

const emptyToUndefined = (value: unknown) =>
  typeof value === 'string' && value.trim() === '' ? undefined : value

const optionalText = (max: number) =>
  z.preprocess(emptyToUndefined, z.string().trim().max(max).optional())

const emailSchema = z.preprocess(
  emptyToUndefined,
  z.string().trim().email('Adresse e-mail invalide.').max(180).optional()
)

const phoneSchema = z.preprocess(
  emptyToUndefined,
  z
    .string()
    .trim()
    .regex(/^\+?[0-9\s().-]{8,}$/, 'Numéro de téléphone invalide.')
    .max(40)
    .optional()
)

const linkedInSchema = z.preprocess(
  emptyToUndefined,
  z
    .string()
    .trim()
    .url('URL LinkedIn invalide.')
    .max(240)
    .refine((value) => {
      const url = new URL(value)
      return ['linkedin.com', 'www.linkedin.com'].includes(url.hostname) && url.pathname.startsWith('/in/')
    }, 'Utilisez l’URL complète de votre profil LinkedIn.')
    .optional()
)

const projectTypeValues = projectTypes.map((item) => item.value) as [
  (typeof projectTypes)[number]['value'],
  ...(typeof projectTypes)[number]['value'][],
]
const sectorValues = sectors.map((item) => item.value) as [
  (typeof sectors)[number]['value'],
  ...(typeof sectors)[number]['value'][],
]
const projectStageValues = projectStages.map((item) => item.value) as [
  (typeof projectStages)[number]['value'],
  ...(typeof projectStages)[number]['value'][],
]
const startPreferenceValues = startPreferences.map((item) => item.value) as [
  (typeof startPreferences)[number]['value'],
  ...(typeof startPreferences)[number]['value'][],
]
const horizonValues = horizons.map((item) => item.value) as [
  (typeof horizons)[number]['value'],
  ...(typeof horizons)[number]['value'][],
]
const budgetModeValues = budgetModes.map((item) => item.value) as [
  (typeof budgetModes)[number]['value'],
  ...(typeof budgetModes)[number]['value'][],
]

export const projectAnswersSchema = z
  .object({
    projectType: z.enum(projectTypeValues),
    sector: z.enum(sectorValues),
    projectStage: z.enum(projectStageValues),
    startPreference: z.enum(startPreferenceValues),
    desiredStartDate: optionalText(10),
    horizon: z.enum(horizonValues),
    budgetMode: z.enum(budgetModeValues),
    budgetMin: z.number().int().nullable().optional(),
    budgetMax: z.number().int().nullable().optional(),
    email: emailSchema,
    phone: phoneSchema,
    linkedinUrl: linkedInSchema,
  })
  .superRefine((value, context) => {
    if (value.startPreference === 'date') {
      if (!value.desiredStartDate || !/^\d{4}-\d{2}-\d{2}$/.test(value.desiredStartDate)) {
        context.addIssue({
          code: 'custom',
          path: ['desiredStartDate'],
          message: 'Choisissez une date de démarrage.',
        })
      }
    }

    if (value.budgetMode === 'range') {
      if (value.budgetMin == null || value.budgetMin < 500) {
        context.addIssue({
          code: 'custom',
          path: ['budgetMin'],
          message: 'Le minimum doit être d’au moins 500 €.',
        })
      }

      if (value.budgetMax == null || (value.budgetMin != null && value.budgetMax < value.budgetMin)) {
        context.addIssue({
          code: 'custom',
          path: ['budgetMax'],
          message: 'Le maximum doit être supérieur ou égal au minimum.',
        })
      }
    }

    if (!value.email && !value.phone && !value.linkedinUrl) {
      context.addIssue({
        code: 'custom',
        path: ['email'],
        message: 'Renseignez au moins un moyen de contact.',
      })
    }
  })

export const submissionRequestSchema = projectAnswersSchema.and(
  z.object({
    idempotencyKey: z.string().uuid(),
    startToken: z.string().min(32),
    website: optionalText(200),
  })
)

export type ProjectAnswers = z.infer<typeof projectAnswersSchema>
export type SubmissionRequest = z.infer<typeof submissionRequestSchema>
export type ProjectType = ProjectAnswers['projectType']
export type Sector = ProjectAnswers['sector']
export type ProjectStage = ProjectAnswers['projectStage']
export type StartPreference = ProjectAnswers['startPreference']
export type Horizon = ProjectAnswers['horizon']
export type BudgetMode = ProjectAnswers['budgetMode']

export function getOptionLabel<T extends readonly { value: string; label: string }[]>(
  options: T,
  value: string
) {
  return options.find((option) => option.value === value)?.label ?? value
}
