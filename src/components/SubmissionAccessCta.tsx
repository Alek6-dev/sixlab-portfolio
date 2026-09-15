'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

export default function SubmissionAccessCta() {
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
      className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-5 py-3 text-sm font-semibold text-copy transition-colors hover:border-brand-300 hover:text-brand-100 sm:gap-3 sm:px-6"
    >
      Soumettre un projet
      <ArrowUpRight size={16} strokeWidth={1.8} />
    </Link>
  )
}
