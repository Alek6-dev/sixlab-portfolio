'use client'

import { useMemo, useState } from 'react'
import { Mail, Phone, Send, X } from 'lucide-react'

type ContactMethod = 'email' | 'phone' | null

interface ContactChatWindowProps {
  isOpen: boolean
  onClose: () => void
}

const inputClassName =
  'w-full rounded-lg border border-line bg-canvas/55 px-3 py-2.5 text-sm text-copy outline-none transition-colors placeholder:text-copy-faint hover:border-line-soft focus:border-brand-300'

export default function ContactChatWindow({ isOpen, onClose }: ContactChatWindowProps) {
  const [messageDraft, setMessageDraft] = useState('')
  const [message, setMessage] = useState('')
  const [contactMethod, setContactMethod] = useState<ContactMethod>(null)
  const [contactValue, setContactValue] = useState('')
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const hasMessage = message.trim().length > 0
  const canSendMessage = messageDraft.trim().length > 2
  const contactPlaceholder = contactMethod === 'phone' ? '+33 6 00 00 00 00' : 'vous@exemple.com'
  const contactInputType = contactMethod === 'phone' ? 'tel' : 'email'

  const contactLabel = useMemo(() => {
    if (contactMethod === 'phone') return 'Numéro de téléphone'
    if (contactMethod === 'email') return 'Adresse mail'
    return ''
  }, [contactMethod])

  if (!isOpen) return null

  function handleMessageSubmit() {
    const trimmedMessage = messageDraft.trim()
    if (!trimmedMessage) return

    setMessage(trimmedMessage)
    setMessageDraft('')
    setError('')
  }

  function handleContactSubmit() {
    if (!contactMethod) {
      setError('Choisissez un moyen de contact.')
      return
    }

    const trimmedValue = contactValue.trim()
    const isValid =
      contactMethod === 'email'
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)
        : /^\+?[0-9\s().-]{8,}$/.test(trimmedValue)

    if (!isValid) {
      setError(
        contactMethod === 'email'
          ? 'Adresse mail invalide.'
          : 'Numéro de téléphone invalide.'
      )
      return
    }

    setError('')
    setIsSubmitted(true)
  }

  return (
    <>
      <button
        type="button"
        aria-label="Fermer la fenêtre de contact"
        onClick={onClose}
        className="fixed inset-0 z-[60] cursor-default bg-canvas/68 backdrop-blur-[2px]"
      />
      <aside className="fixed inset-x-4 bottom-28 z-[70] mx-auto max-w-[380px] overflow-hidden rounded-lg border border-line bg-panel shadow-[0_24px_90px_rgba(0,0,0,0.48)] sm:inset-x-auto sm:right-6 sm:mx-0 sm:w-[460px] sm:max-w-[calc(100vw-3rem)] lg:w-[520px]">
      <div className="flex items-center justify-between border-b border-line bg-canvas/25 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-canvas text-sm font-semibold text-brand-200">
            A
          </div>
          <div>
            <p className="text-sm font-semibold text-copy">Alexis</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la fenêtre de contact"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-copy-faint transition-colors hover:border-line hover:text-copy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200/40"
        >
          <X size={17} strokeWidth={2} />
        </button>
      </div>

      <div className="max-h-[72vh] min-h-[380px] space-y-4 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5 lg:min-h-[430px]">
        <AlexisBubble>Avez-vous un projet sur lequel je peux vous aider ?</AlexisBubble>

        {!hasMessage && (
          <div className="space-y-3">
            <textarea
              value={messageDraft}
              onChange={(event) => setMessageDraft(event.target.value)}
              placeholder="Quelques lignes suffisent pour me décrire votre idée..."
              rows={4}
              className={`${inputClassName} min-h-28 resize-none py-3`}
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleMessageSubmit}
                disabled={!canSendMessage}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-200 px-4 py-2.5 text-sm font-semibold text-canvas transition-colors hover:bg-brand-100 disabled:cursor-not-allowed disabled:bg-line disabled:text-copy-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200/50"
              >
                Envoyer
                <Send size={14} strokeWidth={2} />
              </button>
            </div>
          </div>
        )}

        {hasMessage && (
          <>
            <div className="ml-auto max-w-[84%] rounded-lg border border-brand-300/35 bg-brand-900/20 px-3 py-2 text-sm leading-relaxed text-copy">
              {message}
            </div>

            <AlexisBubble>Comment je peux vous recontacter ?</AlexisBubble>

            {!isSubmitted && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <ContactMethodButton
                    isActive={contactMethod === 'email'}
                    icon={<Mail size={15} strokeWidth={2} />}
                    label="Mail"
                    onClick={() => {
                      setContactMethod('email')
                      setContactValue('')
                      setError('')
                    }}
                  />
                  <ContactMethodButton
                    isActive={contactMethod === 'phone'}
                    icon={<Phone size={15} strokeWidth={2} />}
                    label="Téléphone"
                    onClick={() => {
                      setContactMethod('phone')
                      setContactValue('')
                      setError('')
                    }}
                  />
                </div>

                {contactMethod && (
                  <label className="block text-xs font-medium text-copy-muted">
                    {contactLabel}
                    <div className="mt-2 flex gap-2">
                      <input
                        value={contactValue}
                        onChange={(event) => setContactValue(event.target.value)}
                        type={contactInputType}
                        placeholder={contactPlaceholder}
                        className={inputClassName}
                      />
                      <button
                        type="button"
                        onClick={handleContactSubmit}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-200 text-canvas transition-colors hover:bg-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200/50"
                        aria-label="Envoyer le moyen de contact"
                      >
                        <Send size={16} strokeWidth={2} className="-translate-x-px translate-y-px" />
                      </button>
                    </div>
                  </label>
                )}

                {error && <p className="text-xs text-status-danger-text">{error}</p>}
              </div>
            )}

            {isSubmitted && (
              <AlexisBubble>
                Merci pour votre message, je vous recontacte très vite.
              </AlexisBubble>
            )}
          </>
        )}
      </div>
      </aside>
    </>
  )
}

function AlexisBubble({ children }: { children: string }) {
  return (
    <div className="flex max-w-[86%] gap-2">
      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-line bg-canvas text-[11px] font-semibold text-brand-200">
        A
      </div>
      <div className="rounded-lg border border-line bg-panel-muted/55 px-3 py-2 text-sm leading-relaxed text-copy">
        {children}
      </div>
    </div>
  )
}

function ContactMethodButton({
  isActive,
  icon,
  label,
  onClick,
}: {
  isActive: boolean
  icon: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200/40 ${
        isActive
          ? 'border-brand-200 bg-brand-900/35 text-brand-100'
          : 'border-line bg-canvas/35 text-copy-muted hover:border-brand-300/70 hover:text-brand-200'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}
