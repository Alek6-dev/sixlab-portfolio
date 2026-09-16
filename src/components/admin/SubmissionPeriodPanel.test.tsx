import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/app/admin/period-actions', () => ({
  openPeriodAction: async () => ({ status: 'success', message: '' }),
  updatePeriodEndAction: async () => ({ status: 'success', message: '' }),
  closePeriodAction: async () => ({ status: 'success', message: '' }),
}))

import SubmissionPeriodPanel from '@/components/admin/SubmissionPeriodPanel'

describe('SubmissionPeriodPanel', () => {
  it('propose une ouverture quand les dépôts sont fermés', () => {
    render(
      <SubmissionPeriodPanel
        activePeriod={null}
        minimumEndDate="2026-09-16"
      />
    )

    expect(
      screen.getByRole('heading', { name: 'Dépôts fermés' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Ouvrir les dépôts' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Ouvrir le calendrier' })
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Date de fin facultative')).not.toHaveAttribute(
      'readonly'
    )
  })

  it('demande une confirmation avant une fermeture définitive', async () => {
    const user = userEvent.setup()

    render(
      <SubmissionPeriodPanel
        activePeriod={{
          id: '72bbbddf-29ec-46fb-a080-043635503606',
          startedAtLabel: '15 septembre 2026 à 10:00',
          scheduledEndAtLabel: null,
          scheduledEndDateInput: '',
        }}
        minimumEndDate="2026-09-16"
      />
    )

    expect(
      screen.queryByRole('button', { name: 'Confirmer la fermeture' })
    ).not.toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: 'Fermer les dépôts maintenant' })
    )

    expect(
      screen.getByRole('button', { name: 'Confirmer la fermeture' })
    ).toBeInTheDocument()
    expect(
      screen.getByText('Cette période ne pourra pas être rouverte.')
    ).toBeInTheDocument()
  })
})
