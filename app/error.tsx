'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[Berit] Erro na interface:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-berit-black text-berit-text flex items-center justify-center px-6">
      <div className="max-w-lg w-full border border-berit-border rounded-2xl bg-berit-surface/40 p-8 text-center">
        <p className="text-berit-gold text-sm uppercase tracking-[0.3em]">Berit</p>
        <h1 className="mt-4 text-2xl font-medium text-berit-text">Algo saiu do compasso</h1>
        <p className="mt-3 text-sm text-berit-text/60">
          Houve um erro ao carregar o Genesis. Recarregue para tentar novamente ou continue em modo local.
        </p>
        <button
          onClick={reset}
          className="mt-6 inline-flex items-center justify-center rounded-lg border border-berit-gold/30 bg-berit-gold/10 px-4 py-2 text-sm text-berit-gold transition-berit hover:berit-glow"
        >
          Tentar novamente
        </button>
        {error?.digest && (
          <p className="mt-4 text-xs text-berit-text/40">Código: {error.digest}</p>
        )}
      </div>
    </div>
  )
}
