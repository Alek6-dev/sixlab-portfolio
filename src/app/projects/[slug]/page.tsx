import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { projects } from '@/data/projects'
import FadeIn from '@/components/FadeIn'
import ProjectMockup from '@/components/ProjectMockup'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}

  return {
    title: `${project.title} - Alek`,
    description: project.shortDescription,
  }
}

const statusClasses = {
  live: 'border-status-live-border bg-status-live-bg text-status-live-text',
  'in-progress': 'border-status-progress-border bg-status-progress-bg text-status-progress-text',
  experiment: 'border-status-experiment-border bg-status-experiment-bg text-status-experiment-text',
  archived: 'border-status-archived-border bg-status-archived-bg text-status-archived-text',
}

function getMockupVariant(slug: string) {
  if (slug === 'myqassist') return 'myqassist'
  if (slug === 'king-of-paddock') return 'paddock'
  if (slug === 'jcc-football') return 'football'
  return 'workflow'
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  return (
    <main className="max-w-6xl mx-auto px-6 pt-12 pb-28">
      <FadeIn>
        <Link
          href="/#projects"
          className="mb-12 inline-flex items-center gap-2 text-sm text-copy-faint transition-colors hover:text-copy"
        >
          <ArrowLeft size={15} strokeWidth={2} /> Retour aux projets
        </Link>
      </FadeIn>

      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <FadeIn delay={0.1}>
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${statusClasses[project.status]}`}
              >
                {project.statusLabel}
              </span>
              <span className="text-xs font-medium text-copy-faint">{project.year}</span>
            </div>

            <h1 className="text-5xl font-semibold leading-tight tracking-tight text-copy">
              {project.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-copy-muted">
              {project.shortDescription}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-panel-muted px-3 py-1 text-xs text-copy-muted">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="rounded-xl border border-line bg-panel/70 p-4 shadow-2xl shadow-black/40">
            <ProjectMockup variant={getMockupVariant(project.slug)} />
          </div>
        </FadeIn>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-[0.72fr_1fr]">
        <FadeIn delay={0.2}>
          <aside className="rounded-lg border border-line bg-panel/60 p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-200">
              Mon role
            </h2>
            <p className="mt-5 text-base leading-relaxed text-copy">{project.role}</p>

            <div className="mt-8">
              <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-copy-faint">
                Stack & outils
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-line bg-canvas/60 px-3 py-1 text-xs text-copy-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </FadeIn>

        <div>
          <ContentBlock title="Contexte" delay={0.25}>
            {project.sections.context}
          </ContentBlock>
          <ContentBlock title="Ce que j’ai construit / contribué" delay={0.3}>
            {project.sections.contribution}
          </ContentBlock>

          <FadeIn delay={0.35}>
            <div className="border-t border-line py-10">
              <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-copy-faint">
                Fonctionnalites et preuves
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {project.sections.features.map((feature) => (
                  <div key={feature} className="flex gap-3 rounded-lg bg-panel/60 p-4">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-brand-200" size={17} strokeWidth={2} />
                    <span className="text-sm leading-relaxed text-copy">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <ContentBlock title="Ce que ça démontre" delay={0.4}>
            {project.sections.whatItShows}
          </ContentBlock>

          {project.sections.nextSteps && (
            <ContentBlock title="Suite" delay={0.45}>
              {project.sections.nextSteps}
            </ContentBlock>
          )}
        </div>
      </section>
    </main>
  )
}

function ContentBlock({
  title,
  children,
  delay,
}: {
  title: string
  children: ReactNode
  delay: number
}) {
  return (
    <FadeIn delay={delay}>
      <div className="border-t border-line py-10">
        <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-copy-faint">
          {title}
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-copy">{children}</p>
      </div>
    </FadeIn>
  )
}
