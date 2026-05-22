'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Automation } from '@/data/automations'
import AutomationCard from '@/components/AutomationCard'

export default function AutomationSection({ automations }: { automations: Automation[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [leavingCard, setLeavingCard] = useState<{ automation: Automation; id: number } | null>(null)
  const animationIdRef = useRef(0)
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasPagination = automations.length > 1
  const activeAutomation = automations[activeIndex]
  const stackedAutomations = automations.slice(activeIndex + 1)
  const stackOffsetPx = 9
  const stackPaddingPx =
    stackedAutomations.length > 0
      ? stackedAutomations.length * stackOffsetPx + 2
      : 0

  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current)
      }
    }
  }, [])

  function navigateTo(nextIndex: number) {
    animationIdRef.current += 1

    setLeavingCard({ automation: automations[activeIndex], id: animationIdRef.current })
    setActiveIndex(nextIndex)

    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current)
    }

    leaveTimeoutRef.current = setTimeout(() => {
      setLeavingCard(null)
    }, 360)
  }

  function goToPrevious() {
    navigateTo((activeIndex - 1 + automations.length) % automations.length)
  }

  function goToNext() {
    navigateTo((activeIndex + 1) % automations.length)
  }

  if (!activeAutomation) return null

  return (
    <div>
      <div className="relative" style={{ paddingBottom: stackPaddingPx }}>
        {hasPagination && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-0"
            style={{ bottom: stackPaddingPx }}
          >
            {stackedAutomations.map((automation, index) => {
              const stackPosition = index + 1

              return (
                <div
                  key={automation.slug}
                  className="absolute rounded-lg border border-line bg-panel transition-all duration-300"
                  style={{
                    insetInline: stackPosition * 16,
                    top: stackPosition * stackOffsetPx,
                    bottom: -stackPosition * stackOffsetPx,
                    zIndex: stackedAutomations.length - index,
                    opacity: 1,
                  }}
                />
              )
            })}
          </div>
        )}

        <div className="relative z-10">
          <div key={activeAutomation.slug} className="automation-stack-enter">
            <AutomationCard automation={activeAutomation} />
          </div>

          {leavingCard && (
            <div
              key={`${leavingCard.automation.slug}-${leavingCard.id}`}
              className="automation-stack-leave pointer-events-none absolute inset-0 z-20"
            >
              <AutomationCard automation={leavingCard.automation} />
            </div>
          )}
        </div>
      </div>

      {hasPagination && (
        <div className="mt-7 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Automatisation précédente"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-line-warm text-brand-200 transition-colors hover:border-brand-200 hover:text-brand-100"
          >
            <ChevronLeft size={18} strokeWidth={1.8} />
          </button>
          <span className="text-xs font-semibold tabular-nums tracking-[0.12em] text-brand-200">
            {String(activeIndex + 1).padStart(2, '0')}{' '}
            <span className="text-copy">/ {String(automations.length).padStart(2, '0')}</span>
          </span>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Automatisation suivante"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-line-warm text-brand-200 transition-colors hover:border-brand-200 hover:text-brand-100"
          >
            <ChevronRight size={18} strokeWidth={1.8} />
          </button>
        </div>
      )}
    </div>
  )
}
