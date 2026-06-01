import { NextResponse } from 'next/server'

type ContactPayload = {
  message?: unknown
  contactMethod?: unknown
  contactValue?: unknown
  source?: unknown
  website?: unknown
}

const MAX_MESSAGE_LENGTH = 2500
const MAX_CONTACT_LENGTH = 180

function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function parseEmailIdentity(value: string) {
  const match = value.match(/^(.*)<([^>]+)>$/)
  if (!match) return { email: value.trim() }

  return {
    name: match[1].trim() || undefined,
    email: match[2].trim(),
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(request: Request) {
  const apiKey = process.env.BREVO_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL
  const fromEmail = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !toEmail || !fromEmail) {
    return NextResponse.json(
      { error: 'Configuration email manquante.' },
      { status: 500 }
    )
  }

  let payload: ContactPayload

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  if (isString(payload.website) && payload.website.trim()) {
    return NextResponse.json({ ok: true })
  }

  const message = isString(payload.message) ? payload.message.trim() : ''
  const contactMethod = isString(payload.contactMethod) ? payload.contactMethod.trim() : ''
  const contactValue = isString(payload.contactValue) ? payload.contactValue.trim() : ''
  const source = isString(payload.source) ? payload.source.trim() : 'Portfolio'

  if (message.length < 3 || message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: 'Message invalide.' },
      { status: 400 }
    )
  }

  if (!['email', 'phone'].includes(contactMethod)) {
    return NextResponse.json(
      { error: 'Moyen de contact invalide.' },
      { status: 400 }
    )
  }

  if (!contactValue || contactValue.length > MAX_CONTACT_LENGTH) {
    return NextResponse.json(
      { error: 'Contact invalide.' },
      { status: 400 }
    )
  }

  const isValidContact =
    contactMethod === 'email'
      ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue)
      : /^\+?[0-9\s().-]{8,}$/.test(contactValue)

  if (!isValidContact) {
    return NextResponse.json(
      { error: 'Contact invalide.' },
      { status: 400 }
    )
  }

  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />')
  const safeContactValue = escapeHtml(contactValue)
  const safeContactMethod = contactMethod === 'email' ? 'Email' : 'Téléphone'
  const safeSource = escapeHtml(source)
  const replyTo = contactMethod === 'email' ? { email: contactValue } : undefined

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: parseEmailIdentity(fromEmail),
      to: [parseEmailIdentity(toEmail)],
      replyTo,
      subject: 'Nouveau message depuis le portfolio',
      textContent: [
        'Nouveau message depuis le portfolio',
        '',
        `Source : ${source}`,
        '',
        'Message :',
        message,
        '',
        `${safeContactMethod} : ${contactValue}`,
      ].join('\n'),
      htmlContent: `
        <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
          <h1 style="font-size: 20px; margin: 0 0 16px;">Nouveau message depuis le portfolio</h1>
          <p style="margin: 0 0 16px;"><strong>Source :</strong> ${safeSource}</p>
          <div style="margin: 0 0 16px;">
            <strong>Message :</strong>
            <div style="margin-top: 8px; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb;">
              ${safeMessage}
            </div>
          </div>
          <p style="margin: 0;"><strong>${safeContactMethod} :</strong> ${safeContactValue}</p>
        </div>
      `,
    }),
  })

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Envoi impossible pour le moment.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
