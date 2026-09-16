import { describe, expect, it } from 'vitest'
import {
  parsePeriodId,
  parseScheduledEndDate,
} from '@/lib/submissions/period-input'

describe('parseScheduledEndDate', () => {
  it('accepte une date réelle au format ISO', () => {
    expect(parseScheduledEndDate('2028-02-29')).toMatchObject({
      success: true,
      data: '2028-02-29',
    })
  })

  it('accepte une date de fin facultative', () => {
    expect(parseScheduledEndDate('')).toMatchObject({
      success: true,
      data: undefined,
    })
  })

  it('refuse les dates impossibles et les autres formats', () => {
    expect(parseScheduledEndDate('2026-02-29').success).toBe(false)
    expect(parseScheduledEndDate('29/02/2028').success).toBe(false)
  })
})

describe('parsePeriodId', () => {
  it('accepte uniquement un identifiant UUID', () => {
    expect(
      parsePeriodId('72bbbddf-29ec-46fb-a080-043635503606').success
    ).toBe(true)
    expect(parsePeriodId('period-current').success).toBe(false)
  })
})
