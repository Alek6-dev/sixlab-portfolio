'use client'

import { openContactChat } from '@/components/ContactChatLauncher'

export default function AboutContactButton({ children }: { children: string }) {
  return (
    <button
      type="button"
      onClick={openContactChat}
      className="inline-flex items-center gap-2 rounded-lg bg-brand-200 px-5 py-3 text-sm font-semibold text-canvas transition-colors hover:bg-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200/50"
    >
      {children}
    </button>
  )
}
