'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function SubmissionNavLink() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/submissions/availability', {
      cache: 'no-store',
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => setIsOpen(Boolean(data?.open)))
      .catch(() => setIsOpen(false))

    return () => controller.abort()
  }, [])

  if (!isOpen) return null

  return (
    <Link
      href="/soumettre-un-projet"
      className="submission-nav-pulse absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium hover:[animation-play-state:paused] hover:!text-copy focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200/60 sm:text-sm"
    >
      Soumettre un projet
    </Link>
  )
}
