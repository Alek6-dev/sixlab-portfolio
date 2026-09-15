import { describe, expect, it } from 'vitest'
import {
  createSubmissionStartToken,
  verifySubmissionStartToken,
} from '@/lib/submissions/session-token'

const secret = 'test-secret-with-at-least-thirty-two-characters'
const payload = {
  periodId: '4e6799c9-9f3d-4ae6-9911-01d7965e469a',
  issuedAt: '2026-09-15T10:00:00.000Z',
}

describe('submission start token', () => {
  it('round-trips a signed period payload', () => {
    const token = createSubmissionStartToken(payload, secret)
    expect(verifySubmissionStartToken(token, secret)).toEqual(payload)
  })

  it('rejects a modified token', () => {
    const token = createSubmissionStartToken(payload, secret)
    expect(verifySubmissionStartToken(`${token}x`, secret)).toBeNull()
  })
})
