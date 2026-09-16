'use server'

import 'server-only'
import { revalidatePath } from 'next/cache'
import { requireAdminIdentity } from '@/lib/auth/authorization'
import {
  closeSubmissionPeriod,
  openSubmissionPeriod,
  updateSubmissionPeriodEnd,
} from '@/lib/submissions/repository'
import {
  parsePeriodId,
  parseScheduledEndDate,
} from '@/lib/submissions/period-input'

export type PeriodActionState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

export async function openPeriodAction(
  _previousState: PeriodActionState,
  formData: FormData
): Promise<PeriodActionState> {
  await requireAdminIdentity()

  const endDate = parseScheduledEndDate(formData.get('scheduledEndDate'))

  if (!endDate.success) {
    return errorState('Choisissez une date de fin valide.')
  }

  try {
    await openSubmissionPeriod(endDate.data)
    revalidatePath('/admin')
    return successState('La période est ouverte.')
  } catch {
    return errorState(
      'La période n’a pas pu être ouverte. Vérifiez qu’aucune période n’est déjà active et que la date est future.'
    )
  }
}

export async function updatePeriodEndAction(
  _previousState: PeriodActionState,
  formData: FormData
): Promise<PeriodActionState> {
  await requireAdminIdentity()

  const periodId = parsePeriodId(formData.get('periodId'))
  const endDate = parseScheduledEndDate(formData.get('scheduledEndDate'))

  if (!periodId.success || !endDate.success) {
    return errorState('Les informations de la période sont invalides.')
  }

  try {
    const updated = await updateSubmissionPeriodEnd(
      periodId.data,
      endDate.data
    )

    if (!updated) {
      return errorState(
        'La période n’est plus ouverte ou la date choisie n’est plus valide.'
      )
    }

    revalidatePath('/admin')
    return successState(
      endDate.data
        ? 'La date de fin est enregistrée.'
        : 'La date de fin est retirée.'
    )
  } catch {
    return errorState('La date de fin n’a pas pu être modifiée.')
  }
}

export async function closePeriodAction(
  _previousState: PeriodActionState,
  formData: FormData
): Promise<PeriodActionState> {
  await requireAdminIdentity()

  const periodId = parsePeriodId(formData.get('periodId'))

  if (!periodId.success) {
    return errorState('La période demandée est invalide.')
  }

  try {
    const closed = await closeSubmissionPeriod(periodId.data)

    if (!closed) {
      return errorState('Cette période n’est plus ouverte.')
    }

    revalidatePath('/admin')
    return successState('La période est fermée.')
  } catch {
    return errorState('La période n’a pas pu être fermée.')
  }
}

function successState(message: string): PeriodActionState {
  return { status: 'success', message }
}

function errorState(message: string): PeriodActionState {
  return { status: 'error', message }
}
