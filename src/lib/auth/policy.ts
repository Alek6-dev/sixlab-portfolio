export type LinkedAccount = {
  providerId: string
  accountId: string
}

export function hasExpectedGitHubAccount(
  accounts: readonly LinkedAccount[],
  expectedAccountId: string
) {
  return accounts.some(
    (account) =>
      account.providerId === 'github' && account.accountId === expectedAccountId
  )
}
