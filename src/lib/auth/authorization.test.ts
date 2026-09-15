import { describe, expect, it } from 'vitest'
import { hasExpectedGitHubAccount } from '@/lib/auth/policy'

describe('hasExpectedGitHubAccount', () => {
  it('accepts only the expected GitHub provider account ID', () => {
    expect(
      hasExpectedGitHubAccount(
        [{ providerId: 'github', accountId: '12345678' }],
        '12345678'
      )
    ).toBe(true)
  })

  it('rejects the same account ID from another provider', () => {
    expect(
      hasExpectedGitHubAccount(
        [{ providerId: 'google', accountId: '12345678' }],
        '12345678'
      )
    ).toBe(false)
  })

  it('rejects another GitHub account', () => {
    expect(
      hasExpectedGitHubAccount(
        [{ providerId: 'github', accountId: '87654321' }],
        '12345678'
      )
    ).toBe(false)
  })
})
