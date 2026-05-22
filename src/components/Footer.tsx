import { ChevronRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
        <span className="text-sm text-copy-faint">© {new Date().getFullYear()} Alek</span>
        <a
          href="https://linkedin.com/in/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-copy-faint transition-colors hover:text-copy"
        >
          LinkedIn <ChevronRight size={13} strokeWidth={2} className="inline" />
        </a>
      </div>
    </footer>
  )
}
