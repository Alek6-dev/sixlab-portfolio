'use client'

import { useEffect, useState } from 'react'
import { MessageCircleMore } from 'lucide-react'
import ContactChatWindow from '@/components/ContactChatWindow'

const openContactChatEvent = 'open-contact-chat'

export function openContactChat() {
  window.dispatchEvent(new Event(openContactChatEvent))
}

export default function ContactChatLauncher() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hasUnreadHint, setHasUnreadHint] = useState(false)
  const [hasOpenedChat, setHasOpenedChat] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 0)
      if (window.scrollY > 200 && !hasOpenedChat) {
        setHasUnreadHint(true)
      }
    }

    function handleOpenChat() {
      setIsVisible(true)
      setHasOpenedChat(true)
      setHasUnreadHint(false)
      setIsChatOpen(true)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener(openContactChatEvent, handleOpenChat)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener(openContactChatEvent, handleOpenChat)
    }
  }, [hasOpenedChat])

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsVisible(true)
          setHasOpenedChat(true)
          setHasUnreadHint(false)
          setIsChatOpen(true)
        }}
        aria-label="Ouvrir la fenêtre de contact"
        className={`group fixed bottom-6 right-6 z-[80] flex h-14 items-center justify-end overflow-hidden rounded-lg border shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:w-56 focus-visible:w-72 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200/50 ${
          isVisible || isChatOpen ? 'w-14 translate-y-0 opacity-100' : 'pointer-events-none w-14 translate-y-3 opacity-0'
        } ${
          hasUnreadHint && !isChatOpen
            ? 'border-brand-200 bg-brand-200 text-canvas hover:border-brand-100'
            : isChatOpen
              ? 'border-brand-200 bg-brand-900/35 text-brand-100'
              : 'border-line bg-panel/95 text-brand-200 hover:border-brand-300/70'
        }`}
      >
        <span className="w-0 max-w-[10rem] overflow-hidden whitespace-nowrap pl-0 pr-0 text-left text-xs font-normal opacity-0 transition-all duration-300 group-hover:w-[13.25rem] group-hover:pl-4 group-hover:pr-3 group-hover:opacity-100 group-focus-visible:w-[13.25rem] group-focus-visible:pl-4 group-focus-visible:pr-3 group-focus-visible:opacity-100">
          {hasUnreadHint && !isChatOpen ? 'Vous avez un message !' : 'Entamez la discussion !'}
        </span>
        <span className="flex h-14 w-14 shrink-0 items-center justify-center">
          <MessageCircleMore size={22} strokeWidth={1.8} />
        </span>
        {hasUnreadHint && !isChatOpen && (
          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-canvas shadow-[0_0_10px_rgba(13,16,20,0.45)] animate-pulse" />
        )}
      </button>

      <ContactChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  )
}
