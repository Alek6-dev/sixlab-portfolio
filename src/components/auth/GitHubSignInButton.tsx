'use client'

import { useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { authClient } from '@/lib/auth/client'

export default function GitHubSignInButton() {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState('')

  async function signIn() {
    setIsPending(true)
    setError('')

    const result = await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/admin',
    })

    if (result.error) {
      setError('La connexion est momentanément indisponible.')
      setIsPending(false)
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={signIn}
        disabled={isPending}
        className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-brand-200 px-5 py-3 text-sm font-semibold text-canvas transition-colors hover:bg-brand-100 disabled:cursor-wait disabled:opacity-70"
      >
        {isPending ? (
          <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
        ) : (
          <GitHubMark />
        )}
        Continuer avec GitHub
      </button>
      {error ? (
        <p className="mt-4 text-sm text-status-experiment-text" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function GitHubMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-current"
    >
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.57-.3-5.27-1.29-5.27-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.16 1.18A10.9 10.9 0 0 1 12 6.08c.98 0 1.94.13 2.84.38 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.07.79 2.16v3.25c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  )
}
