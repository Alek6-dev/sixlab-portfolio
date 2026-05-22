'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Project } from '@/data/projects'
import { ProductProjectCard } from '@/components/ProjectCards'

const desktopProjectCount = 3

function getVisibleProjectCount() {
  if (typeof window === 'undefined') return desktopProjectCount
  if (window.innerWidth >= 1024) return 3
  if (window.innerWidth >= 768) return 2
  return 1
}

export default function ProductProjectsCarousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [startIndex, setStartIndex] = useState(0)
  const [slideStepPx, setSlideStepPx] = useState(0)
  const [visibleProjectCount, setVisibleProjectCount] = useState(desktopProjectCount)

  const hasPagination = projects.length > visibleProjectCount
  const pageCount = hasPagination ? projects.length - visibleProjectCount + 1 : 1
  const cardBasis = `calc((100% - ${(visibleProjectCount - 1) * 1.5}rem) / ${visibleProjectCount})`

  useEffect(() => {
    function updateVisibleProjectCount() {
      setVisibleProjectCount(getVisibleProjectCount())
    }

    updateVisibleProjectCount()
    window.addEventListener('resize', updateVisibleProjectCount)

    return () => window.removeEventListener('resize', updateVisibleProjectCount)
  }, [])

  useEffect(() => {
    setStartIndex((current) => Math.min(current, pageCount - 1))
  }, [pageCount])

  useEffect(() => {
    function updateSlideStep() {
      const track = trackRef.current
      const firstCard = track?.firstElementChild as HTMLElement | null

      if (!track || !firstCard) return

      const styles = window.getComputedStyle(track)
      const gap = parseFloat(styles.columnGap || styles.gap || '0')

      setSlideStepPx(firstCard.getBoundingClientRect().width + gap)
    }

    updateSlideStep()
    window.addEventListener('resize', updateSlideStep)

    return () => window.removeEventListener('resize', updateSlideStep)
  }, [projects.length, visibleProjectCount])

  function goToPrevious() {
    setStartIndex((current) => (current - 1 + pageCount) % pageCount)
  }

  function goToNext() {
    setStartIndex((current) => (current + 1) % pageCount)
  }

  return (
    <div>
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-6 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${startIndex * slideStepPx}px)` }}
        >
          {projects.map((project) => (
            <div
              key={project.slug}
              className="shrink-0"
              style={{ flexBasis: cardBasis, maxWidth: cardBasis }}
            >
              <ProductProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {hasPagination && (
        <div className="mt-8 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Projet précédent"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-line-warm text-brand-200 transition-colors hover:border-brand-200 hover:text-brand-100"
          >
            <ChevronLeft size={18} strokeWidth={1.8} />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setStartIndex(index)}
                aria-label={`Afficher la page ${index + 1} des projets`}
                aria-current={index === startIndex ? 'true' : undefined}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === startIndex ? 'bg-brand-200' : 'bg-line-soft hover:bg-copy-faint'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Projet suivant"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-line-warm text-brand-200 transition-colors hover:border-brand-200 hover:text-brand-100"
          >
            <ChevronRight size={18} strokeWidth={1.8} />
          </button>
        </div>
      )}
    </div>
  )
}
