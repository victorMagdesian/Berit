/**
 * ============================================================================
 * BERIT - Passphrase Gate
 * ============================================================================
 * 
 * NOTE:
 * - A passphrase correta ativa o usuário no Supabase
 * - A senha NÃO fica no client, apenas enviada ao backend
 * ============================================================================
 */

'use client'

import { useState } from 'react'

export function PassphraseGate() {
  const [passphrase, setPassphrase] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!passphrase.trim()) {
      setStatus('error')
      setMessage('Informe a senha.')
      return
    }

    setStatus('submitting')
    setMessage('')

    try {
      const response = await fetch('/api/berit/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passphrase }),
      })

      if (!response.ok) {
        setStatus('error')
        setMessage('Senha inválida. Tente novamente.')
        return
      }

      window.location.href = '/'
    } catch {
      setStatus('error')
      setMessage('Falha ao ativar. Tente novamente.')
    } finally {
      setPassphrase('')
    }
  }

  return (
    <main className="min-h-screen bg-berit-black flex items-center justify-center px-6">
      <div className="w-full max-w-sm border border-berit-border/60 bg-berit-surface/30 p-8 rounded-xl shadow-berit">
        <h1 className="text-berit-gold text-lg tracking-[0.3em] text-center mb-3">
          BERIT
        </h1>
        <p className="text-berit-text/60 text-sm text-center mb-8 tracking-wide">
          Confirme a passagem para ativar o templo.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="password"
            value={passphrase}
            onChange={(event) => setPassphrase(event.target.value)}
            placeholder="Digite a senha sagrada"
            className="berit-input w-full text-lg"
            autoFocus
            autoComplete="off"
          />

          {message && (
            <p className="text-center text-red-400 text-sm">{message}</p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-3 border border-berit-border text-berit-text/80 
                       hover:border-berit-gold hover:text-berit-gold transition-berit
                       text-sm tracking-wider uppercase disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Verificando...' : 'Ativar'}
          </button>
        </form>
      </div>
    </main>
  )
}
