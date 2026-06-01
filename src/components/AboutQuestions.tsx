'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import type { AboutQuestion } from '@/data/about'

export default function AboutQuestions({ questions }: { questions: AboutQuestion[] }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="border-t border-line">
      {questions.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div key={item.question} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-5 py-5 text-left text-copy transition-colors hover:text-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200/40"
            >
              <span className="text-base font-semibold tracking-tight">{item.question}</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-brand-200">
                <Plus
                  size={15}
                  strokeWidth={1.8}
                  className={`transition-transform ${isOpen ? 'rotate-45' : ''}`}
                />
              </span>
            </button>

            <div
              className={`grid overflow-hidden transition-all duration-300 ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="min-h-0">
                <div className="space-y-3 pb-5 text-sm leading-relaxed text-copy-muted">
                  {toParagraphs(item.answer).map((paragraph) => (
                    <p key={paragraph}>
                      <LinkedAnswer question={item} answer={paragraph} />
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function toParagraphs(answer: AboutQuestion['answer']) {
  return Array.isArray(answer) ? answer : [answer]
}

function LinkedAnswer({ question, answer }: { question: AboutQuestion; answer: string }) {
  if (!question.links?.length) return answer

  const matches = question.links
    .map((link) => ({ ...link, index: answer.indexOf(link.label) }))
    .filter((link) => link.index >= 0)
    .sort((a, b) => a.index - b.index)

  if (!matches.length) return answer

  const parts: ReactNode[] = []
  let cursor = 0

  for (const link of matches) {
    if (link.index < cursor) continue

    parts.push(answer.slice(cursor, link.index))
    parts.push(
      <Link
        key={`${link.href}-${link.index}`}
        href={link.href}
        className="font-semibold text-brand-200 underline decoration-brand-200/40 underline-offset-4 transition-colors hover:text-brand-100 hover:decoration-brand-100"
      >
        {link.label}
      </Link>
    )
    cursor = link.index + link.label.length
  }

  parts.push(answer.slice(cursor))

  return <>{parts}</>
}
