import { z } from 'zod'

const datePattern = /^\d{4}-\d{2}-\d{2}$/

const scheduledEndDateSchema = z
  .string()
  .regex(datePattern)
  .refine(isRealCalendarDate)
  .optional()

const periodIdSchema = z.string().uuid()

export function parseScheduledEndDate(value: unknown) {
  const normalized =
    typeof value === 'string' && value.trim() !== ''
      ? value.trim()
      : undefined

  return scheduledEndDateSchema.safeParse(normalized)
}

export function parsePeriodId(value: unknown) {
  return periodIdSchema.safeParse(value)
}

function isRealCalendarDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  )
}
