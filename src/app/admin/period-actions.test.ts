import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('server-only', () => ({}))
vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }))
vi.mock('@/lib/auth/authorization', () => ({
  requireAdminIdentity: vi.fn(),
}))
vi.mock('@/lib/submissions/repository', () => ({
  openSubmissionPeriod: vi.fn(),
  updateSubmissionPeriodEnd: vi.fn(),
  closeSubmissionPeriod: vi.fn(),
}))

import { revalidatePath } from 'next/cache'
import { requireAdminIdentity } from '@/lib/auth/authorization'
import {
  closeSubmissionPeriod,
  openSubmissionPeriod,
  updateSubmissionPeriodEnd,
} from '@/lib/submissions/repository'
import {
  closePeriodAction,
  openPeriodAction,
  updatePeriodEndAction,
  type PeriodActionState,
} from '@/app/admin/period-actions'

const initialState: PeriodActionState = { status: 'idle', message: '' }
const periodId = '72bbbddf-29ec-46fb-a080-043635503606'

describe('period server actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(requireAdminIdentity).mockResolvedValue({ id: 'admin' } as never)
  })

  it('vérifie l’administrateur avant une ouverture', async () => {
    vi.mocked(requireAdminIdentity).mockRejectedValue(new Error('Unauthorized'))
    const formData = new FormData()

    await expect(openPeriodAction(initialState, formData)).rejects.toThrow(
      'Unauthorized'
    )
    expect(openSubmissionPeriod).not.toHaveBeenCalled()
  })

  it('ouvre une période avec une date validée', async () => {
    vi.mocked(openSubmissionPeriod).mockResolvedValue(periodId)
    const formData = new FormData()
    formData.set('scheduledEndDate', '2028-02-29')

    await expect(openPeriodAction(initialState, formData)).resolves.toEqual({
      status: 'success',
      message: 'La période est ouverte.',
    })
    expect(openSubmissionPeriod).toHaveBeenCalledWith('2028-02-29')
    expect(revalidatePath).toHaveBeenCalledWith('/admin')
  })

  it('refuse une date invalide avant la base de données', async () => {
    const formData = new FormData()
    formData.set('scheduledEndDate', '2026-02-29')

    await expect(openPeriodAction(initialState, formData)).resolves.toMatchObject({
      status: 'error',
    })
    expect(openSubmissionPeriod).not.toHaveBeenCalled()
  })

  it('modifie ou retire la date d’une période active', async () => {
    vi.mocked(updateSubmissionPeriodEnd).mockResolvedValue(true)
    const formData = new FormData()
    formData.set('periodId', periodId)
    formData.set('scheduledEndDate', '')

    await expect(
      updatePeriodEndAction(initialState, formData)
    ).resolves.toEqual({
      status: 'success',
      message: 'La date de fin est retirée.',
    })
    expect(updateSubmissionPeriodEnd).toHaveBeenCalledWith(periodId, undefined)
  })

  it('ferme uniquement une période active identifiée', async () => {
    vi.mocked(closeSubmissionPeriod).mockResolvedValue(true)
    const formData = new FormData()
    formData.set('periodId', periodId)

    await expect(closePeriodAction(initialState, formData)).resolves.toEqual({
      status: 'success',
      message: 'La période est fermée.',
    })
    expect(closeSubmissionPeriod).toHaveBeenCalledWith(periodId)
  })
})
