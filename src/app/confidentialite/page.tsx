import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Confidentialité des soumissions - Sixlab',
  description: 'Utilisation et conservation des données transmises avec une fiche projet.',
  alternates: {
    canonical: '/confidentialite',
  },
}

export default function PrivacyPage() {
  const contactEmail = process.env.PRIVACY_CONTACT_EMAIL

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <Link
        href="/soumettre-un-projet"
        className="inline-flex items-center gap-2 text-sm text-copy-muted transition-colors hover:text-copy"
      >
        <ArrowLeft size={16} />
        Retour à la fiche projet
      </Link>

      <article className="mt-10 rounded-lg border border-line bg-panel/70 p-7 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-200">
          Données personnelles
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-copy sm:text-4xl">
          Confidentialité des soumissions
        </h1>

        <div className="mt-8 space-y-7 text-sm leading-relaxed text-copy-muted sm:text-base">
          <section>
            <h2 className="font-semibold text-copy">Utilisation</h2>
            <p className="mt-2">
              Les informations transmises servent uniquement à consulter la fiche et, si cela est
              pertinent, à reprendre contact au sujet du projet présenté.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-copy">Données enregistrées</h2>
            <p className="mt-2">
              Seuls les choix du parcours et les moyens de contact volontairement renseignés sont
              conservés. Ils ne sont pas utilisés pour une prospection générale.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-copy">Durée de conservation</h2>
            <p className="mt-2">
              Chaque fiche est supprimée au plus tard douze mois après son dépôt, sauf suppression
              anticipée demandée par la personne concernée.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-copy">Accès ou suppression</h2>
            {contactEmail ? (
              <p className="mt-2">
                Une demande d’accès ou de suppression peut être envoyée à{' '}
                <a className="text-brand-200 hover:text-brand-100" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
                .
              </p>
            ) : (
              <p className="mt-2 text-status-progress-text">
                L’adresse dédiée sera indiquée ici avant l’ouverture des soumissions.
              </p>
            )}
          </section>
        </div>
      </article>
    </main>
  )
}
