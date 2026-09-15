import { describe, expect, it } from 'vitest'
import { projectAnswersSchema } from '@/lib/submissions/domain'

const validAnswers = {
  projectType: 'application',
  sector: 'tech-digital',
  projectStage: 'idea',
  startPreference: 'unscheduled',
  horizon: 'no-deadline',
  budgetMode: 'undefined',
  email: 'alexis@example.com',
}

describe('projectAnswersSchema', () => {
  it('accepts a single valid contact channel', () => {
    expect(projectAnswersSchema.safeParse(validAnswers).success).toBe(true)
    expect(
      projectAnswersSchema.safeParse({ ...validAnswers, email: '', phone: '+33 6 12 34 56 78' })
        .success
    ).toBe(true)
    expect(
      projectAnswersSchema.safeParse({
        ...validAnswers,
        email: '',
        linkedinUrl: 'https://www.linkedin.com/in/example',
      }).success
    ).toBe(true)
  })

  it('rejects a submission without a valid contact channel', () => {
    const result = projectAnswersSchema.safeParse({ ...validAnswers, email: '' })
    expect(result.success).toBe(false)
  })

  it('accepts a maximum budget above the visual slider limit', () => {
    const result = projectAnswersSchema.safeParse({
      ...validAnswers,
      budgetMode: 'range',
      budgetMin: 5_000,
      budgetMax: 100_000,
    })
    expect(result.success).toBe(true)
  })

  it('rejects an inverted budget range', () => {
    const result = projectAnswersSchema.safeParse({
      ...validAnswers,
      budgetMode: 'range',
      budgetMin: 10_000,
      budgetMax: 5_000,
    })
    expect(result.success).toBe(false)
  })

  it('requires a date only for the custom-date option', () => {
    expect(
      projectAnswersSchema.safeParse({
        ...validAnswers,
        startPreference: 'date',
      }).success
    ).toBe(false)
    expect(
      projectAnswersSchema.safeParse({
        ...validAnswers,
        startPreference: 'date',
        desiredStartDate: '2027-01-15',
      }).success
    ).toBe(true)
  })
})
