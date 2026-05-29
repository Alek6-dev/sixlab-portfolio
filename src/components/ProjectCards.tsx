import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import type { Project } from '@/data/projects'
import ProjectMockup from '@/components/ProjectMockup'

function getMockupVariant(project: Project) {
  if (project.slug === 'myqassist') return 'myqassist'
  if (project.slug === 'king-of-paddock') return 'paddock'
  if (project.slug === 'jcc-football') return 'football'
  return 'workflow'
}

function StatusPill({ label, status }: { label: string; status: Project['status'] }) {
  const classes = {
    live: 'border-status-live-border bg-status-live-bg text-status-live-text',
    'in-progress': 'border-status-progress-border bg-status-progress-bg text-status-progress-text',
    experiment: 'border-status-experiment-border bg-status-experiment-bg text-status-experiment-text',
    archived: 'border-status-archived-border bg-status-archived-bg text-status-archived-text',
  }

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${classes[status]}`}>
      {label}
    </span>
  )
}

export function ProductProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex min-h-full min-w-0 flex-col overflow-hidden rounded-lg border border-line bg-panel/70 p-4 outline-none transition-colors hover:border-line-soft focus-visible:ring-2 focus-visible:ring-brand-200/50"
    >
      <div className="h-52 overflow-hidden rounded-lg md:h-56">
        {project.cardImage ? (
          <Image
            src={project.cardImage}
            alt={`Aperçu du projet ${project.title}`}
            width={1200}
            height={800}
            className="h-full w-full object-cover"
          />
        ) : (
          <ProjectMockup variant={getMockupVariant(project)} compact />
        )}
      </div>

      <div className="mt-6 flex min-w-0 flex-1 flex-col">
        <div className="flex h-14 items-center justify-between gap-4">
          <h3 className="text-2xl font-semibold tracking-tight text-copy">{project.title}</h3>
          <StatusPill label={project.statusLabel} status={project.status} />
        </div>

        <p className="mt-4 h-20 overflow-hidden text-sm leading-relaxed text-copy-muted">
          {project.tagline}
        </p>

        <div className="mt-5 flex h-20 content-start flex-wrap gap-2 overflow-hidden">
          {project.stack.slice(0, 6).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-line bg-canvas/60 px-3 py-1 text-xs text-copy-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-brand-200 transition-colors group-hover:text-brand-100">
          Voir le projet
          <ChevronRight size={15} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

export function WorkflowProjectCard({ project }: { project: Project }) {
  return (
    <article className="group rounded-lg">
      <div className="mb-5">
        <ProjectMockup variant="workflow" compact />
      </div>
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <h3 className="text-xl font-semibold tracking-tight text-copy">{project.title}</h3>
        <StatusPill label={project.statusLabel} status={project.status} />
      </div>
      <p className="text-sm leading-relaxed text-copy-muted">{project.tagline}</p>
      <Link
        href={`/projects/${project.slug}`}
        className="mt-5 inline-flex items-center gap-2 rounded-md text-sm font-semibold text-brand-200 outline-none transition-colors hover:text-brand-100 focus-visible:ring-2 focus-visible:ring-brand-200/50"
      >
        Voir le détail
        <ChevronRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  )
}
