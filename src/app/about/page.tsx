import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, ChevronRight } from 'lucide-react'
import AboutContactButton from '@/components/AboutContactButton'
import AboutQuestions from '@/components/AboutQuestions'
import { about } from '@/data/about'

export const metadata: Metadata = {
  title: 'À propos - Alexis',
  description:
    'Product Builder & Tester : produit, build assisté par IA, test fonctionnel, automatisation et amélioration continue.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-canvas text-copy">
      <section className="relative overflow-hidden px-5 pb-16 pt-16 text-center sm:px-8 lg:pb-20 lg:pt-20">
        <Image
          src="/about/hero-workspace.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none object-cover object-center opacity-65"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-canvas/48"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-20 mx-auto h-[420px] max-w-4xl bg-[radial-gradient(ellipse_at_center,rgba(4,4,3,0.86)_0%,rgba(4,4,3,0.72)_34%,rgba(4,4,3,0.38)_58%,transparent_76%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-canvas/75 via-canvas/20 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-canvas/75 to-canvas"
        />

        <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border border-line bg-panel sm:h-28 sm:w-28">
          <Image
            src={about.portrait.src}
            alt={about.portrait.alt}
            width={112}
            height={112}
            priority
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative mt-5 inline-flex items-center gap-2 rounded-full border border-status-live-border bg-status-live-bg px-3 py-1 text-xs font-medium text-status-live-text">
          <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
          {about.availability}
        </div>

        <h1 className="relative mx-auto mt-6 max-w-[22rem] text-3xl font-semibold leading-tight tracking-tight text-copy sm:max-w-4xl sm:text-5xl lg:text-6xl">
          {about.hero.title}
        </h1>
        <p className="relative mx-auto mt-6 max-w-2xl text-base leading-relaxed text-copy-muted sm:text-lg">
          {about.hero.intro}
        </p>

        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <AboutContactButton>Me contacter</AboutContactButton>
          <Link
            href="/#projects"
            className="inline-flex items-center rounded-lg border border-line bg-panel/70 px-5 py-3 text-sm font-semibold text-copy transition-colors hover:border-line-soft hover:bg-panel-muted"
          >
            Voir mes projets
          </Link>
        </div>

        <div className="relative mx-auto mt-12 grid w-full max-w-3xl overflow-hidden rounded-lg border border-line bg-panel/65 sm:grid-cols-3">
          {about.stats.map((stat) => (
            <div key={stat.label} className="border-b border-line p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
              <p className="text-lg font-semibold text-copy">{stat.value}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-copy-faint">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-5xl min-w-0 px-5 py-16 sm:px-8 lg:px-16 lg:py-20">
          <NarrativeSection label="01 - Qui je suis" title={about.who.title}>
            {about.who.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </NarrativeSection>

          <Divider />

          <NarrativeSection label="02 - Comment je travaille" title={about.method.title}>
            {about.method.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="mt-8 grid min-w-0 overflow-hidden rounded-lg border border-line sm:grid-cols-3">
              {about.method.steps.map((step, index) => (
                <div key={step.title} className="min-w-0 border-b border-line bg-panel/65 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                  <p className="font-mono text-[11px] font-semibold tracking-[0.16em] text-brand-200">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 text-sm font-semibold text-copy">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-copy-muted">{step.description}</p>
                </div>
              ))}
            </div>
          </NarrativeSection>

          <Divider />

          <NarrativeSection label="03 - Ce que j'apporte" title={about.concrete.title}>
            <div className="grid gap-3 sm:grid-cols-2">
              {about.concrete.items.map((item) => (
                <div key={item} className="flex min-w-0 gap-3 rounded-lg border border-line bg-panel/65 p-4 text-sm leading-relaxed text-copy">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-brand-200" size={16} strokeWidth={1.8} />
                  <span className="min-w-0 break-words">{item}</span>
                </div>
              ))}
            </div>
          </NarrativeSection>

          <Divider />

          <NarrativeSection label="04 - En clair" title={about.clarity.title}>
            <p>{about.clarity.intro}</p>
            <div className="mt-5 space-y-3">
              {about.clarity.items.map((item) => (
                <div key={item.title} className="flex gap-2 text-sm leading-relaxed text-copy-muted">
                  <ChevronRight className="mt-[0.4rem] shrink-0 text-brand-200" size={13} strokeWidth={2} />
                  <p>
                    <strong className="font-semibold text-copy">{item.title}.</strong> {item.description}
                  </p>
                </div>
              ))}
            </div>
          </NarrativeSection>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-5xl min-w-0 gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-[300px_1fr] lg:px-16 lg:pb-20">
        <article className="overflow-hidden rounded-lg border border-line bg-panel/70">
          <div className="h-56 bg-panel-soft">
            <Image
              src={about.profileCardImage.src}
              alt={about.profileCardImage.alt}
              width={360}
              height={224}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-copy">{about.name}</h2>
            <p className="mt-1 text-sm text-copy-muted">{about.role}</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-status-live-border bg-status-live-bg px-3 py-1 text-xs font-medium text-status-live-text">
              <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
              {about.availability}
            </div>
            <div className="mt-6 border-t border-line pt-5">
              {about.profile.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-5 py-2 text-sm">
                  <span className="text-copy-faint">{row.label}</span>
                  <span className="text-copy">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article>
          <SectionLabel>Avant d&apos;échanger</SectionLabel>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-copy">
            Les questions qui reviennent
          </h2>
          <div className="mt-7">
            <AboutQuestions questions={about.questions} />
          </div>
        </article>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-28 sm:px-8 lg:px-20">
        <article className="grid gap-8 rounded-lg border border-line bg-panel/70 p-6 md:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <SectionLabel>Me retrouver</SectionLabel>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-copy">
              Une mission à me proposer ?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-copy-muted">
              Prenez contact directement ou retrouvez-moi sur LinkedIn.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <AboutContactButton>Me contacter</AboutContactButton>
            <a
              href="https://www.linkedin.com/in/alexis-bissuel-32a356160/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-line bg-canvas/35 px-5 py-3 text-sm font-semibold text-copy transition-colors hover:border-line-soft hover:bg-panel-muted"
            >
              LinkedIn
            </a>
          </div>
        </article>
      </section>
    </main>
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-200">
      {children}
    </p>
  )
}

function NarrativeSection({
  label,
  title,
  children,
}: {
  label: string
  title: string
  children: ReactNode
}) {
  return (
    <section>
      <SectionLabel>{label}</SectionLabel>
      <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-copy">{title}</h2>
      <div className="mt-6 space-y-4 text-base leading-loose text-copy-muted">{children}</div>
    </section>
  )
}

function Divider() {
  return <div className="my-12 h-px bg-line" />
}
