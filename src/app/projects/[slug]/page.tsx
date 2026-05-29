import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, ExternalLink, FileText } from 'lucide-react'
import ContactSection from '@/components/ContactSection'
import ProjectPreviewGallery from '@/components/ProjectPreviewGallery'
import { projects, type Project, type ProjectFeature, type ProjectLink, type ProjectTextSection } from '@/data/projects'
import { projectTemplate } from './projectTemplate'

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
    title: `${project.title} - Alexis`,
    description: project.shortDescription || project.tagline,
  }
}

const statusClasses = {
  live: 'border-status-live-border bg-status-live-bg text-status-live-text',
  'in-progress': 'border-status-progress-border bg-status-progress-bg text-status-progress-text',
  experiment: 'border-status-experiment-border bg-status-experiment-bg text-status-experiment-text',
  archived: 'border-status-archived-border bg-status-archived-bg text-status-archived-text',
}

const linkIcons = {
  link: ExternalLink,
  doc: FileText,
}

function isUrlVisible(url: string) {
  return Boolean(url.trim())
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const showProductCta = isUrlVisible(project.cta.productUrl)

  return (
    <main className="min-h-screen bg-canvas text-copy">
      <section className="mx-auto w-full max-w-7xl px-5 pt-10 sm:px-8 lg:px-20">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-copy-faint transition-colors hover:text-copy"
        >
          <ArrowLeft size={16} strokeWidth={1.8} />
          Retour aux projets
        </Link>

        <div className="relative mt-7 h-[320px] overflow-hidden rounded-lg bg-panel sm:h-[400px] lg:h-[460px]">
          <Image
            src={project.heroImage.src}
            alt={project.heroImage.alt}
            width={1280}
            height={460}
            priority
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

          <div className="absolute inset-x-5 bottom-6 flex flex-col items-start gap-5 sm:inset-x-9 sm:bottom-8">
            {showProductCta && (
              <PrimaryCta href={project.cta.productUrl}>{projectTemplate.cta.product}</PrimaryCta>
            )}

            <div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-none text-copy drop-shadow-2xl sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[300px_1fr] lg:gap-20 lg:px-20 lg:py-16">
        <aside className="min-w-0">
          <div className="flex flex-col gap-7 lg:sticky lg:top-16">
            <FactBlock label={projectTemplate.facts.stack}>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <Chip key={item} small>
                    {item}
                  </Chip>
                ))}
              </div>
            </FactBlock>

            <FactBlock label={projectTemplate.facts.skills}>
              <ul className="space-y-2">
                {project.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2">
                    <ChevronRight className="shrink-0 text-brand-200" size={13} strokeWidth={2} />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </FactBlock>

            <FactBlock label={projectTemplate.facts.period} mono>
              {project.period}
            </FactBlock>

            <FactBlock label={projectTemplate.facts.status}>
              <StatusBadge status={project.status} label={project.statusLabel} />
            </FactBlock>

            {(!!project.links.length || isUrlVisible(project.githubUrl)) && (
              <LinksCard githubUrl={project.githubUrl} links={project.links} />
            )}
          </div>
        </aside>

        <article className="min-w-0 max-w-[720px]">
          <TextSection template={projectTemplate.sections.need} content={project.need} />
          <Divider />

          <TextSection template={projectTemplate.sections.build} content={project.build} />
          {!!project.build.features.length && <FeatureList features={project.build.features} />}
          <Divider />

          {!!project.captures.length && (
            <>
              <section className="mb-14">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-200">
                  {projectTemplate.sections.captures.label}
                </p>
                <ProjectPreviewGallery images={project.captures} />
              </section>
              <Divider />
            </>
          )}

          <TextSection template={projectTemplate.sections.now} content={project.now} />

        </article>
      </section>

      {isUrlVisible(project.cta.contactUrl) && (
        <section className="mx-auto w-full max-w-7xl px-5 pb-28 sm:px-8 lg:px-20">
          <ContactSection variant="project" />
        </section>
      )}
    </main>
  )
}

function StatusBadge({ status, label }: { status: Project['status']; label: string }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${statusClasses[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
      {label}
    </span>
  )
}

function Chip({ children, small = false }: { children: ReactNode; small?: boolean }) {
  return (
    <span className={`inline-flex rounded-md border border-line bg-panel-soft text-copy-muted ${small ? 'px-2 py-1 text-[11px]' : 'px-3 py-1 text-xs'}`}>
      {children}
    </span>
  )
}

function FactBlock({ label, children, mono = false }: { label: string; children: ReactNode; mono?: boolean }) {
  return (
    <div className="min-w-0 max-w-[calc(100vw-2.5rem)] sm:max-w-[calc(100vw-4rem)] lg:max-w-none">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-copy-faint">
        {label}
      </div>
      <div className={`min-w-0 max-w-[32ch] break-words text-sm leading-relaxed text-copy sm:max-w-none ${mono ? 'font-mono' : ''}`}>{children}</div>
    </div>
  )
}

function LinksCard({ githubUrl, links }: { githubUrl: string; links: ProjectLink[] }) {
  const [primaryLink, ...secondaryLinks] = links

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-line-soft bg-panel/70 p-5">
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-copy-faint">
        {projectTemplate.facts.links}
      </div>

      {primaryLink && <ProjectLinkRow link={primaryLink} />}

      {isUrlVisible(githubUrl) && (
        <SmartLink
          href={githubUrl}
          className="flex items-center gap-3 rounded-lg px-1 py-2 text-copy transition-colors hover:bg-panel-muted"
        >
          <GithubMark />
          <span className="min-w-0 flex-1 break-words text-sm">GitHub</span>
          <ArrowRight size={14} strokeWidth={1.8} className="text-copy-faint" />
        </SmartLink>
      )}

      {secondaryLinks.map((link) => (
        <ProjectLinkRow key={`${link.label}-${link.url}`} link={link} />
      ))}
    </div>
  )
}

function ProjectLinkRow({ link }: { link: ProjectLink }) {
  const Icon = linkIcons[link.icon]

  return (
    <SmartLink
      href={link.url}
      className="flex items-center gap-3 rounded-lg px-1 py-2 text-copy transition-colors hover:bg-panel-muted"
    >
      <Icon size={16} strokeWidth={1.8} />
      <span className={`min-w-0 flex-1 break-words text-sm ${link.icon === 'link' ? 'font-mono' : ''}`}>
        {link.label}
        {link.sub && <span className="ml-1 text-[11px] text-copy-faint">- {link.sub}</span>}
      </span>
      <ArrowRight size={14} strokeWidth={1.8} className="text-copy-faint" />
    </SmartLink>
  )
}

function GithubMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M8 0.3a7.8 7.8 0 0 0-2.47 15.2c0.39 0.07 0.53-0.17 0.53-0.38v-1.34c-2.17 0.47-2.63-1.05-2.63-1.05-0.35-0.9-0.86-1.14-0.86-1.14-0.71-0.49 0.05-0.48 0.05-0.48 0.78 0.06 1.2 0.8 1.2 0.8 0.7 1.2 1.83 0.85 2.28 0.65 0.07-0.5 0.27-0.85 0.49-1.05-1.73-0.2-3.55-0.86-3.55-3.85 0-0.85 0.3-1.55 0.8-2.09-0.08-0.2-0.35-0.99 0.08-2.08 0 0 0.65-0.21 2.14 0.8a7.45 7.45 0 0 1 3.9 0c1.49-1.01 2.14-0.8 2.14-0.8 0.43 1.09 0.16 1.88 0.08 2.08 0.5 0.54 0.8 1.24 0.8 2.09 0 3-1.83 3.65-3.57 3.85 0.28 0.24 0.53 0.72 0.53 1.45v2.15c0 0.21 0.14 0.46 0.54 0.38A7.8 7.8 0 0 0 8 0.3Z" />
    </svg>
  )
}

function PrimaryCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <SmartLink
      href={href}
      className="inline-flex items-center rounded-lg bg-brand-200 px-5 py-3 text-sm font-semibold text-canvas transition-colors hover:bg-brand-100"
    >
      {children}
    </SmartLink>
  )
}

function TextSection({
  template,
  content,
}: {
  template: { label: string }
  content: ProjectTextSection
}) {
  return (
    <section className="mb-14">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-200">{template.label}</p>
      {content.body.map((paragraph) => (
        <p key={paragraph} className="mt-5 text-base leading-loose text-copy-muted">
          {paragraph}
        </p>
      ))}
    </section>
  )
}

function FeatureList({ features }: { features: ProjectFeature[] }) {
  return (
    <div className="mb-14 mt-8">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="grid grid-cols-[32px_1fr] gap-5 py-4"
        >
          <CheckCircle2 className="mt-0.5 text-brand-200" size={17} strokeWidth={1.8} />
          <div>
            <h3 className="text-sm font-semibold text-copy">{feature.title}</h3>
            {feature.description && (
              <p className="mt-1 text-sm leading-relaxed text-copy-muted">{feature.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function Divider() {
  return <div className="mb-12 mt-2 h-px bg-line" />
}

function SmartLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  const isExternal = href.startsWith('http')

  if (isExternal) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}
