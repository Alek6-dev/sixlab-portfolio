import { createHmac, timingSafeEqual } from 'node:crypto'
import { z } from 'zod'

const tokenPayloadSchema = z.object({
  periodId: z.string().uuid(),
  issuedAt: z.string().datetime(),
})

export type SubmissionStartToken = z.infer<typeof tokenPayloadSchema>

function getSecret(secret?: string) {
  const value = secret ?? process.env.SUBMISSION_SESSION_SECRET

  if (!value || value.length < 32) {
    throw new Error('SUBMISSION_SESSION_SECRET must contain at least 32 characters.')
  }

  return value
}

function sign(encodedPayload: string, secret?: string) {
  return createHmac('sha256', getSecret(secret)).update(encodedPayload).digest('base64url')
}

export function createSubmissionStartToken(
  payload: SubmissionStartToken,
  secret?: string
) {
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url')
  return `${encodedPayload}.${sign(encodedPayload, secret)}`
}

export function verifySubmissionStartToken(token: string, secret?: string) {
  const [encodedPayload, signature, extra] = token.split('.')
  if (!encodedPayload || !signature || extra) return null

  const expectedSignature = sign(encodedPayload, secret)
  const receivedBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expectedSignature)

  if (
    receivedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(receivedBuffer, expectedBuffer)
  ) {
    return null
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'))
    return tokenPayloadSchema.parse(payload)
  } catch {
    return null
  }
}
