'use client'

import { useState } from 'react'
import { CalendarClock, MessageCircleMore } from 'lucide-react'
import { openContactChat } from '@/components/ContactChatLauncher'

type ContactHint =
  | 'Envoyer un message'
  | 'Me contacter sur LinkedIn'
  | 'Voir mes projets'
  | 'Réserver un créneau'
  | null

const contactButtonBaseClassName =
  'flex h-20 w-20 items-center justify-center rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2'

const contactButtonNeutralClassName =
  `${contactButtonBaseClassName} border-line bg-canvas/35 text-copy-muted hover:border-brand-300/70 hover:text-brand-200 focus-visible:ring-brand-200/50`

export default function ContactSection() {
  const [contactHint, setContactHint] = useState<ContactHint>(null)

  return (
    <>
      <article className="overflow-hidden rounded-lg border border-line bg-panel/70">
        <div className="p-6 md:p-7">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1fr] lg:items-center lg:gap-10">
            <div className="max-w-xl">
              <h2 className="text-2xl font-semibold tracking-tight text-copy">
                Un projet à faire avancer ?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-copy-muted">
                Idée naissante, besoin à cadrer, produit à tester ou workflow à structurer :
                lancez la discussion en me décrivant votre projet en quelques lignes.
              </p>
            </div>

            <div className="lg:ml-auto">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:justify-end">
                <button
                  type="button"
                  onClick={openContactChat}
                  onMouseEnter={() => setContactHint('Envoyer un message')}
                  onMouseLeave={() => setContactHint(null)}
                  onFocus={() => setContactHint('Envoyer un message')}
                  onBlur={() => setContactHint(null)}
                  aria-label="Envoyer un message"
                  className={`${contactButtonBaseClassName} border-line bg-canvas/35 text-copy-muted hover:border-brand-300/70 hover:text-brand-200 focus-visible:ring-brand-200/50`}
                >
                  <MessageCircleMore size={34} strokeWidth={1.8} />
                </button>

                <a
                  href="https://linkedin.com/in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setContactHint('Me contacter sur LinkedIn')}
                  onMouseLeave={() => setContactHint(null)}
                  onFocus={() => setContactHint('Me contacter sur LinkedIn')}
                  onBlur={() => setContactHint(null)}
                  aria-label="LinkedIn"
                  className={contactButtonNeutralClassName}
                >
                  <LinkedInIcon className="h-8 w-8" />
                </a>

                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setContactHint('Voir mes projets')}
                  onMouseLeave={() => setContactHint(null)}
                  onFocus={() => setContactHint('Voir mes projets')}
                  onBlur={() => setContactHint(null)}
                  aria-label="GitHub"
                  className={contactButtonNeutralClassName}
                >
                  <GitHubIcon className="h-8 w-8" />
                </a>

                <button
                  type="button"
                  aria-disabled="true"
                  onMouseEnter={() => setContactHint('Réserver un créneau')}
                  onMouseLeave={() => setContactHint(null)}
                  onFocus={() => setContactHint('Réserver un créneau')}
                  onBlur={() => setContactHint(null)}
                  aria-label="Réserver un créneau bientôt disponible"
                  className={`${contactButtonBaseClassName} relative cursor-not-allowed border-line bg-canvas/20 text-copy-faint/55 hover:border-brand-300/40 hover:text-brand-200/65 focus-visible:ring-brand-200/30`}
                >
                  <CalendarClock size={34} strokeWidth={1.8} />
                  <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 rounded-full border border-line bg-panel px-2 py-0.5 text-[10px] font-medium text-copy-faint">
                    bientôt
                  </span>
                </button>
              </div>

              <p
                aria-live="polite"
                className={`mt-5 min-h-5 text-center text-xs font-normal text-brand-200 transition-all duration-200 lg:text-right ${
                  contactHint ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
                }`}
              >
                {contactHint}
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.34 8h4.28v14H.34V8Zm7.12 0h4.1v1.91h.06c.57-1.08 1.96-2.22 4.04-2.22 4.32 0 5.12 2.84 5.12 6.54V22H16.5v-6.88c0-1.64-.03-3.75-2.28-3.75-2.29 0-2.64 1.79-2.64 3.63v7H7.46V8Z" />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.16c-3.2.7-3.87-1.38-3.87-1.38-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18A10.96 10.96 0 0 1 12 6.01c.98 0 1.96.13 2.88.39 2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.42.36.78 1.06.78 2.14v3.2c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
      />
    </svg>
  )
}
