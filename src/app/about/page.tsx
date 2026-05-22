import type { Metadata } from 'next'
import { ChevronRight } from 'lucide-react'
import FadeIn from '@/components/FadeIn'

export const metadata: Metadata = {
  title: 'À propos - Alek',
  description:
    'Product Builder & Tester : build applicatif, workflows, tests et amélioration produit.',
}

const strengths = [
  'Cadrer un besoin et le transformer en fonctionnalité testable',
  'Construire des apps, outils web, dashboards et workflows',
  'Tester les parcours, les cas limites et les comportements fragiles',
  'Itérer avec une approche produit, qualité et usage réel',
]

export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 pt-20 pb-28">
      <FadeIn>
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-200">
          À propos
        </span>
        <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-copy">
          Product Builder & Tester : construire, tester, améliorer.
        </h1>
      </FadeIn>

      <section className="mt-12 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <FadeIn delay={0.1}>
          <div className="space-y-5 text-lg leading-relaxed text-copy-muted">
            <p>
              Je ne me définis pas comme développeur senior, expert IA ou QA pur. Mon
              terrain naturel est plus hybride : partir d’un besoin, imaginer une solution,
              construire une première version, tester ce qui tient vraiment, puis itérer.
            </p>
            <p>
              Mes projets mélangent produit digital, build applicatif, automatisation et
              qualité. MyQAssist, King of Paddock et JCC Football montrent surtout une
              chose : j’aime transformer une idée ou un irritant en outil concret.
            </p>
            <p>
              J’utilise les outils IA comme accélérateur de construction, avec une attention
              particulière aux parcours utilisateurs, aux comportements attendus, aux cas
              limites et à la fiabilité des fonctionnalités livrées.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="rounded-lg border border-line bg-panel/60 p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-200">
              Ce que j’apporte
            </h2>
            <div className="mt-6 space-y-4">
              {strengths.map((strength) => (
                <div key={strength} className="rounded-lg bg-canvas/60 p-4 text-sm text-copy">
                  {strength}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <FadeIn delay={0.3}>
        <section className="mt-16 border-t border-line pt-12">
          <div className="mb-8 flex items-center gap-5">
            <h2 className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.22em] text-brand-200">
              Me retrouver
            </h2>
            <div className="h-px flex-1 bg-line" />
          </div>
          <a
            href="https://linkedin.com/in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-copy-muted transition-colors hover:text-copy"
          >
            LinkedIn
            <ChevronRight size={15} strokeWidth={2} />
          </a>
        </section>
      </FadeIn>
    </main>
  )
}
