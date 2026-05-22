import { ChevronRight, Code2, FlaskConical, Zap } from 'lucide-react'
import Image from 'next/image'
import type { ReactNode } from 'react'
import FadeIn from '@/components/FadeIn'
import AutomationSection from '@/components/AutomationSection'
import ContactSection from '@/components/ContactSection'
import HeroShowcase from '@/components/HeroShowcase'
import ProductProjectsCarousel from '@/components/ProductProjectsCarousel'
import TypewriterText from '@/components/TypewriterText'
import { automations } from '@/data/automations'
import { productProjects } from '@/data/projects'

const focusAreas = [
  {
    icon: Code2,
    title: 'Construire à partir du besoin',
    description: 'Identification du besoin, reflexion, prototypage et livraison du produit.',
  },
  {
    icon: FlaskConical,
    title: 'Tester la fiabilité des produits',
    description: 'Tests et amélioration continue des produits construits.',
  },
  {
    icon: Zap,
    title: 'Automatiser des tâches',
    description: 'Création de workflows et d’outils pour gagner en productivité.',
  },
]

const aboutTeaser = {
  image: '/profile/alek-portrait.webp',
  eyebrow: 'En quelques mots',
  text:
    'Constamment animé par la résolution de problématiques, je réfléchis sans cesse aux idées qui donnent vie à un projet. J’ai construit mes propres produits et outils avec cette logique, et je veux aujourd’hui l’appliquer à de nouveaux besoins. Cadrer, construire, tester, améliorer, avec l’IA générative comme accélérateur et la fiabilité comme exigence.',
  href: '/about',
  linkLabel: 'About me',
}

export default function HomePage() {
  return (
    <main>
      <HeroShowcase />

      <section className="max-w-6xl mx-auto px-6 pb-28">
        <FadeIn delay={0.1}>
          <CenteredSectionTitle>Work</CenteredSectionTitle>
        </FadeIn>

        <div className="grid gap-10 md:grid-cols-3">
          {focusAreas.map((area, index) => {
            const Icon = area.icon
            return (
              <FadeIn key={area.title} delay={0.15 + index * 0.08}>
                <div className="flex gap-5 border-line md:border-r md:pr-8 md:last:border-r-0">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-line bg-panel text-brand-200">
                    <Icon size={24} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h2 className="font-semibold text-copy">{area.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-copy-faint">{area.description}</p>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>

        <FadeIn delay={0.35}>
          <AboutTeaser />
        </FadeIn>
      </section>

      <section id="projects" className="max-w-6xl mx-auto px-6 pb-20">
        <FadeIn>
          <CenteredSectionTitle>Products</CenteredSectionTitle>
        </FadeIn>

        <FadeIn delay={0.1}>
          <ProductProjectsCarousel projects={productProjects} />
        </FadeIn>

      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <FadeIn>
          <CenteredSectionTitle>Automations</CenteredSectionTitle>
        </FadeIn>

        <FadeIn delay={0.1}>
          <AutomationSection automations={automations} />
        </FadeIn>
      </section>

      <section id="contact" className="max-w-6xl mx-auto px-6 pb-28">
        <FadeIn>
          <CenteredSectionTitle>Get in touch</CenteredSectionTitle>
        </FadeIn>

        <FadeIn delay={0.1}>
          <ContactSection />
        </FadeIn>
      </section>
    </main>
  )
}

function AboutTeaser() {
  return (
    <aside className="group mt-14 w-full max-w-[calc(100vw-3rem)] overflow-hidden rounded-lg border border-line bg-panel/70 transition-colors hover:border-line-soft md:max-w-none">
      <div className="grid gap-7 p-6 md:grid-cols-[180px_1fr] md:items-center md:p-8 lg:gap-10">
        <div className="mx-auto flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border border-line bg-canvas text-4xl font-semibold text-brand-200 md:h-40 md:w-40">
          {aboutTeaser.image ? (
            <Image
              src={aboutTeaser.image}
              alt="Portrait d'Alek"
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
          ) : (
            <span>A</span>
          )}
        </div>

        <div className="min-w-0 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-200">
            {aboutTeaser.eyebrow}
          </p>
          <blockquote className="mt-5 border-l border-line-warm pl-5 text-sm leading-relaxed tracking-[0.01em] text-copy">
            <TypewriterText text={aboutTeaser.text} />
          </blockquote>
          <a
            href={aboutTeaser.href}
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-200 transition-colors group-hover:text-brand-100 hover:text-brand-100"
          >
            {aboutTeaser.linkLabel}
            <ChevronRight size={15} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </aside>
  )
}

function CenteredSectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-12 flex items-center gap-5">
      <div className="h-px flex-1 bg-line" />
      <h2 className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.22em] text-brand-200">
        {children}
      </h2>
      <div className="h-px flex-1 bg-line" />
    </div>
  )
}
