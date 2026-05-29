'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import type { ProjectImage } from '@/data/projects'

type ProjectPreviewGalleryProps = {
  images: ProjectImage[]
}

export default function ProjectPreviewGallery({ images }: ProjectPreviewGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeImage = activeIndex === null ? null : images[activeIndex]
  const visibleImages = images.slice(0, 5)
  const hiddenCount = Math.max(images.length - visibleImages.length, 0)
  const portraitImages = visibleImages.filter((image) => {
    if (!image.width || !image.height) return false
    return image.height > image.width
  }).length
  const isPortraitGallery = portraitImages > visibleImages.length / 2

  const close = useCallback(() => setActiveIndex(null), [])
  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current
      return current === 0 ? images.length - 1 : current - 1
    })
  }, [images.length])
  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current
      return current === images.length - 1 ? 0 : current + 1
    })
  }, [images.length])

  useEffect(() => {
    if (activeIndex === null) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, close, showNext, showPrevious])

  useEffect(() => {
    if (activeIndex === null) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [activeIndex])

  return (
    <>
      <div className={isPortraitGallery ? 'mt-8 grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4' : 'mt-8 grid grid-cols-6 gap-3 sm:gap-4'}>
        {visibleImages.map((image, index) => {
          const hasHiddenOverlay = index === visibleImages.length - 1 && hiddenCount > 0
          const tileClassName = isPortraitGallery
            ? 'aspect-[430/932] w-full'
            : index < 2
              ? 'col-span-3 h-40 sm:h-52'
              : 'col-span-2 h-32 sm:h-40'

          return (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`group relative overflow-hidden rounded-lg border border-line-soft bg-panel text-left outline-none transition-colors hover:border-brand-200/60 focus-visible:border-brand-200 focus-visible:ring-2 focus-visible:ring-brand-200/40 ${tileClassName}`}
            aria-label={`Agrandir la capture ${index + 1}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={isPortraitGallery ? '132px' : image.full ? '(min-width: 640px) 720px, 100vw' : '(min-width: 640px) 352px, 100vw'}
              className="object-cover transition duration-300 group-hover:scale-[1.02] group-hover:brightness-75"
            />
            {hasHiddenOverlay && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/60 text-3xl font-semibold text-white">
                +{hiddenCount}
              </span>
            )}
            {!hasHiddenOverlay && (
              <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/15 bg-black/45 text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Maximize2 size={15} strokeWidth={1.8} />
              </span>
            )}
          </button>
          )
        })}
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/90 px-4 py-6 backdrop-blur-sm sm:px-8"
          role="dialog"
          aria-modal="true"
          aria-label="Apercu de la capture projet"
          onClick={close}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              close()
            }}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-panel/90 text-copy transition-colors hover:bg-panel-muted sm:right-6 sm:top-6"
            aria-label="Fermer la galerie"
          >
            <X size={18} strokeWidth={1.8} />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  showPrevious()
                }}
                className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg border border-line bg-panel/90 text-copy transition-colors hover:bg-panel-muted sm:left-6"
                aria-label="Capture precedente"
              >
                <ChevronLeft size={20} strokeWidth={1.8} />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  showNext()
                }}
                className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg border border-line bg-panel/90 text-copy transition-colors hover:bg-panel-muted sm:right-6"
                aria-label="Capture suivante"
              >
                <ChevronRight size={20} strokeWidth={1.8} />
              </button>
            </>
          )}

          <div
            className="flex max-h-[86vh] w-full max-w-7xl items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              width={activeImage.width ?? 1900}
              height={activeImage.height ?? 900}
              sizes="100vw"
              className="h-auto max-h-[86vh] w-auto max-w-full rounded-lg object-contain shadow-2xl shadow-black/60"
              priority
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-line bg-panel/90 px-3 py-1 text-xs text-copy-muted">
            {activeIndex !== null ? activeIndex + 1 : 0} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
