import { NextResponse } from 'next/server'
import { projectAnswersSchema, submissionRequestSchema } from '@/lib/submissions/domain'
import {
  canSubmitToPeriod,
  createSubmission,
} from '@/lib/submissions/repository'
import { verifySubmissionStartToken } from '@/lib/submissions/session-token'

export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  const parsed = submissionRequestSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Certaines informations sont invalides ou manquantes.',
        fields: parsed.error.issues.map((issue) => issue.path[0]).filter(Boolean),
      },
      { status: 400 }
    )
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true })
  }

  const token = verifySubmissionStartToken(parsed.data.startToken)

  if (!token) {
    return NextResponse.json(
      { error: 'Cette session de dépôt n’est plus valide.' },
      { status: 403 }
    )
  }

  try {
    const isAllowed = await canSubmitToPeriod(token.periodId, token.issuedAt)

    if (!isAllowed) {
      return NextResponse.json(
        { error: 'La période de soumission est maintenant fermée.' },
        { status: 403 }
      )
    }

    const answers = projectAnswersSchema.parse(parsed.data)
    const submissionId = await createSubmission(
      token.periodId,
      parsed.data.idempotencyKey,
      answers
    )

    return NextResponse.json({ ok: true, submissionId })
  } catch {
    return NextResponse.json(
      { error: 'Le dépôt n’a pas pu être enregistré. Vous pouvez réessayer.' },
      { status: 500 }
    )
  }
}
