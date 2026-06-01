'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { openContactChat } from '@/components/ContactChatLauncher'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        <Link
          href="/"
          className="text-2xl font-semibold tracking-tight text-copy transition-opacity hover:opacity-80"
        >
          sixlab<span className="text-brand-200">.</span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-8">
          <Link
            href="/#projects"
            className="text-xs text-copy-muted transition-colors hover:text-copy sm:text-sm"
          >
            Portfolio
          </Link>
          <Link
            href="/about"
            className={`hidden text-xs transition-colors sm:inline sm:text-sm ${
              pathname === '/about'
                ? 'font-medium text-copy'
                : 'text-copy-muted hover:text-copy'
            }`}
          >
            About
          </Link>
          <button
            type="button"
            onClick={openContactChat}
            className="hidden text-xs text-copy-muted transition-colors hover:text-copy sm:inline sm:text-sm"
          >
            Contact
          </button>
        </div>
      </nav>
    </header>
  )
}
