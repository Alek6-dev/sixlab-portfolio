import React from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SubmissionWizard from '@/components/submissions/SubmissionWizard'

describe('SubmissionWizard', () => {
  beforeEach(() => {
    vi.spyOn(globalThis.crypto, 'randomUUID').mockReturnValue(
      '4e6799c9-9f3d-4ae6-9911-01d7965e469a'
    )
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('blocks the next step when the required choice is missing', async () => {
    const user = userEvent.setup()
    render(<SubmissionWizard startToken="signed-token-with-more-than-thirty-two-characters" scheduledEndAt={null} />)

    await user.click(screen.getByRole('button', { name: 'Continuer' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Choisissez un type de projet.')
    expect(
      screen.getByRole('heading', { name: 'Quel type de projet souhaitez-vous présenter ?' })
    ).toBeInTheDocument()
  })

  it('supports keyboard selection and preserves the answer when returning', async () => {
    const user = userEvent.setup()
    render(<SubmissionWizard startToken="signed-token-with-more-than-thirty-two-characters" scheduledEndAt={null} />)

    const website = screen.getByRole('button', { name: 'Site web' })
    website.focus()
    await user.keyboard('{Enter}')
    await user.click(screen.getByRole('button', { name: 'Continuer' }))
    await user.click(screen.getByRole('button', { name: 'Retour' }))

    expect(screen.getByRole('button', { name: 'Site web' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('completes the guided flow with one contact channel and submits once', async () => {
    const user = userEvent.setup()
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, submissionId: 'submission-id' }),
    })
    vi.stubGlobal('fetch', fetchMock)

    render(<SubmissionWizard startToken="signed-token-with-more-than-thirty-two-characters" scheduledEndAt={null} />)

    await user.click(screen.getByRole('button', { name: 'Application mobile ou web' }))
    await user.click(screen.getByRole('button', { name: 'Continuer' }))
    await user.click(screen.getByRole('button', { name: 'Tech & numérique' }))
    await user.click(screen.getByRole('button', { name: 'Continuer' }))
    await user.click(screen.getByRole('button', { name: 'Idée' }))
    await user.click(screen.getByRole('button', { name: 'Continuer' }))
    await user.click(screen.getByRole('button', { name: 'Pas de date prévue' }))
    await user.click(screen.getByRole('button', { name: 'Sans échéance' }))
    await user.click(screen.getByRole('button', { name: 'Continuer' }))
    await user.click(screen.getByRole('button', { name: 'Pas de budget défini' }))
    await user.click(screen.getByRole('button', { name: 'Continuer' }))

    expect(
      screen.getByRole('heading', {
        name: 'Vérifiez votre fiche puis indiquez comment vous recontacter.',
      })
    ).toBeInTheDocument()
    expect(screen.getByText('Application mobile ou web')).toBeInTheDocument()
    expect(screen.getByText('Tech & numérique')).toBeInTheDocument()

    await user.type(screen.getByLabelText('E-mail'), 'personne@example.com')
    await user.click(screen.getByRole('button', { name: /Déposer la fiche/ }))

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(
      await screen.findByRole('heading', { name: 'Votre fiche a bien été reçue.' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Déposer un autre projet' })
    ).toHaveAttribute('href', '/soumettre-un-projet')
    expect(
      screen.queryByRole('button', { name: 'Déposer un autre projet' })
    ).not.toBeInTheDocument()
  })

  it('affiche directement le double curseur de budget et active la fourchette à la saisie', async () => {
    const user = userEvent.setup()
    render(<SubmissionWizard startToken="signed-token-with-more-than-thirty-two-characters" scheduledEndAt={null} />)

    await user.click(screen.getByRole('button', { name: 'Site web' }))
    await user.click(screen.getByRole('button', { name: 'Continuer' }))
    await user.click(screen.getByRole('button', { name: 'Tech & numérique' }))
    await user.click(screen.getByRole('button', { name: 'Continuer' }))
    await user.click(screen.getByRole('button', { name: 'Idée' }))
    await user.click(screen.getByRole('button', { name: 'Continuer' }))
    await user.click(screen.getByRole('button', { name: 'Pas de date prévue' }))
    await user.click(screen.getByRole('button', { name: 'Sans échéance' }))
    await user.click(screen.getByRole('button', { name: 'Continuer' }))

    expect(screen.getByRole('slider', { name: 'Budget minimum' })).toBeInTheDocument()
    expect(screen.getByRole('slider', { name: 'Budget maximum' })).toBeInTheDocument()

    await user.clear(screen.getByRole('spinbutton', { name: 'Minimum' }))
    await user.type(screen.getByRole('spinbutton', { name: 'Minimum' }), '5000')
    await user.click(screen.getByRole('button', { name: 'Continuer' }))

    expect(screen.getByText('5 000 € – 50 000 €')).toBeInTheDocument()
  })
})
