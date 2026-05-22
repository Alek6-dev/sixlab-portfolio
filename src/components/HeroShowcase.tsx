'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import ProjectMockup from '@/components/ProjectMockup'

type ShowcaseItem = {
  label: string
  title: string
  description: string
  mockup: 'app' | 'saas' | 'workflow' | 'site'
  glow: string
  image?: string
}

const showcaseItems: ShowcaseItem[] = [
  {
    label: 'Application',
    title: 'App produit',
    description: 'Parcours utilisateur, logique métier, tableaux de bord et itérations.',
    mockup: 'app',
    glow: '238, 155, 85',
    image: '/screenshots/application.webp',
  },
  {
    label: 'SaaS',
    title: 'SaaS QA',
    description: 'Upload, génération, exports, dashboard et paiement.',
    mockup: 'saas',
    glow: '111, 92, 255',
    image: '/screenshots/saas.webp',
  },
  {
    label: 'Automatisation',
    title: 'Workflow automatisé',
    description: 'API, transformation de données, exports et outils connectés.',
    mockup: 'workflow',
    glow: '143, 212, 154',
    image: '/screenshots/automation.webp',
  },
  {
    label: 'Site web',
    title: 'Site / landing page',
    description: 'Pages rapides, lisibles et pensées pour présenter une offre.',
    mockup: 'site',
    glow: '246, 182, 109',
    image: '/screenshots/site.webp',
  },
]

export default function HeroShowcase() {
  const [activeIndex, setActiveIndex] = useState(1)
  const userPausedUntil = useRef(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (Date.now() < userPausedUntil.current) return
      setActiveIndex((index) => (index + 1) % showcaseItems.length)
    }, 5200)

    return () => window.clearInterval(interval)
  }, [])

  const activeItem = showcaseItems[activeIndex]

  function selectItem(index: number) {
    userPausedUntil.current = Date.now() + 9000
    setActiveIndex(index)
  }

  return (
    <section className="w-full overflow-hidden pt-16 pb-16 sm:pt-20 lg:pt-32 lg:pb-32">
      <div className="mx-auto grid w-full max-w-6xl min-w-0 grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
        <div className="w-[calc(100vw-3rem)] min-w-0 max-w-full lg:w-full lg:max-w-none">
          <h1 className="max-w-[19rem] text-[2.35rem] font-semibold leading-[1.1] tracking-tight text-copy sm:max-w-2xl sm:text-6xl sm:leading-[1.08]">
            Product Builder & Tester
          </h1>

          <div className="flex flex-col">
            <p className="order-1 mt-6 max-w-full text-base leading-relaxed text-copy-muted sm:max-w-xl sm:text-lg lg:order-2">
              Je conçois, développe et teste des logiciels et produits digitaux sur mesure pour
              répondre à vos besoins spécifiques.
            </p>

            <div className="order-2 mt-6 flex flex-wrap gap-2 lg:order-1">
              {showcaseItems.map((item, index) => {
                const isActive = index === activeIndex
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => selectItem(index)}
                    aria-pressed={isActive}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                      isActive
                        ? 'border-brand-300 bg-brand-200 text-canvas'
                        : 'border-line bg-panel-muted text-copy-muted hover:border-brand-300/70 hover:text-copy'
                    }`}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-200 px-5 py-3 text-sm font-semibold text-canvas transition-colors hover:bg-brand-100 sm:gap-3 sm:px-6"
            >
              Voir mes projets
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-brand-200/50 px-5 py-3 text-sm font-semibold text-copy transition-colors hover:border-brand-100 hover:text-brand-100 sm:gap-3 sm:px-6"
            >
              Me contacter
            </a>
          </div>
        </div>

        <div className="w-[calc(100vw-3rem)] min-w-0 max-w-full lg:w-full lg:max-w-none">
          <HeroMockup item={activeItem} />
        </div>
      </div>
    </section>
  )
}

function HeroMockup({ item }: { item: ShowcaseItem }) {
  return (
    <div className="relative isolate w-full min-w-0 max-w-full">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[82%] w-[108%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-colors duration-500"
        style={{ backgroundColor: `rgba(${item.glow}, 0.22)` }}
        aria-hidden="true"
      />

      <div
        key={item.label}
        className="relative z-10 aspect-video w-full min-w-0 max-w-full animate-[showcaseFade_420ms_ease-out] overflow-hidden rounded-xl"
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={`${item.label} - ${item.title}`}
            fill
            sizes="(min-width: 1024px) 520px, calc(100vw - 3rem)"
            className="rounded-xl object-cover"
          />
        ) : (
          <div className="absolute inset-0 rounded-xl bg-canvas/30">
            {item.mockup === 'app' && <ProjectMockup variant="paddock" compact />}
            {item.mockup === 'saas' && <ProjectMockup variant="myqassist" compact />}
            {item.mockup === 'workflow' && <WorkflowHeroMockup />}
            {item.mockup === 'site' && <SiteHeroMockup />}
          </div>
        )}
      </div>
    </div>
  )
}

function WorkflowHeroMockup() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-[82%] items-center gap-3">
        {['Input', 'API', 'Transform', 'Output'].map((step, index) => (
          <div key={step} className="flex flex-1 items-center gap-3">
            <div className="rounded-lg bg-panel-muted/70 px-3 py-4 text-center text-[10px] text-copy-muted shadow-[0_16px_50px_rgba(0,0,0,0.35)] ring-1 ring-white/8">
              {step}
            </div>
            {index < 3 && <div className="h-px flex-1 bg-project-workflow/50" />}
          </div>
        ))}
      </div>
    </div>
  )
}

function SiteHeroMockup() {
  return (
    <div className="h-full w-full min-w-0 overflow-hidden rounded-[18px] bg-canvas/40 shadow-[0_24px_70px_rgba(0,0,0,0.38)]">
      <div className="flex items-center gap-1 bg-panel/70 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-brand-400" />
        <span className="h-2 w-2 rounded-full bg-line-soft" />
        <span className="h-2 w-2 rounded-full bg-line-soft" />
        <span className="ml-3 h-5 flex-1 rounded bg-canvas/70" />
      </div>
      <div className="grid gap-4 p-5 sm:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <div className="h-3 w-24 rounded-full bg-brand-300/80" />
          <div className="space-y-2">
            <div className="h-5 w-full rounded bg-copy/90" />
            <div className="h-5 w-4/5 rounded bg-copy/80" />
          </div>
          <div className="space-y-2">
            <div className="h-2 w-full rounded bg-copy-faint/50" />
            <div className="h-2 w-5/6 rounded bg-copy-faint/40" />
            <div className="h-2 w-2/3 rounded bg-copy-faint/30" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-24 rounded-md bg-brand-200" />
            <div className="h-8 w-20 rounded-md border border-line" />
          </div>
        </div>
        <div className="min-h-[120px] rounded-lg bg-gradient-to-br from-panel-muted to-canvas p-4 shadow-[0_18px_50px_rgba(0,0,0,0.32)] ring-1 ring-white/8">
          <div className="mb-4 grid grid-cols-3 gap-2">
            <div className="h-12 rounded border border-brand-400/30 bg-brand-400/15" />
            <div className="h-12 rounded border border-line bg-panel" />
            <div className="h-12 rounded border border-line bg-panel" />
          </div>
          <div className="space-y-2">
            <div className="h-2 w-full rounded bg-copy-faint/40" />
            <div className="h-2 w-3/4 rounded bg-copy-faint/30" />
          </div>
        </div>
      </div>
    </div>
  )
}
