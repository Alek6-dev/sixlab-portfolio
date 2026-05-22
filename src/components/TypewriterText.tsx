'use client'

import { useEffect, useRef, useState } from 'react'

interface TypewriterTextProps {
  text: string
  className?: string
  speedMs?: number
}

export default function TypewriterText({ text, className, speedMs = 15 }: TypewriterTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [visibleCharacters, setVisibleCharacters] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setVisibleCharacters(text.length)
      return
    }

    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [text.length])

  useEffect(() => {
    if (!hasStarted || visibleCharacters >= text.length) return

    const timeout = window.setTimeout(() => {
      setVisibleCharacters((current) => Math.min(current + 1, text.length))
    }, speedMs)

    return () => window.clearTimeout(timeout)
  }, [hasStarted, speedMs, text.length, visibleCharacters])

  return (
    <span ref={containerRef} className={`relative block ${className ?? ''}`} aria-label={text}>
      <span className="invisible block whitespace-pre-line">{text}</span>
      <span aria-hidden="true" className="absolute inset-0 block whitespace-pre-line">
        {text.slice(0, visibleCharacters)}
      </span>
    </span>
  )
}
