/**
 * ============================================================================
 * BERIT - Eternizar Memória
 * ============================================================================
 * 
 * TAILWIND CLASSES:
 * - bg-berit-gold/10: Fundo dourado sutil
 * - border-berit-gold/30: Borda dourada
 * - hover:berit-glow: Efeito de brilho no hover
 * 
 * FUNCTIONALITY:
 * - Salva sessão atual como registro permanente
 * - Inclui timestamp, conteúdo dos pensamentos, e versículos
 * 
 * MAINTENANCE:
 * - Tabela: eternal_memories
 * ============================================================================
 */

'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Sparkles, Check, Loader2 } from 'lucide-react'

interface EternizeMemoryProps {
  slotId: string
  currentVerse?: number
}

export function EternizeMemory({ slotId, currentVerse }: EternizeMemoryProps) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const supabase = createClient()

  const handleEternize = async () => {
    setStatus('saving')

    try {
      // Get current shared thoughts
      const { data: thoughts } = await supabase
        .from('shared_thoughts')
        .select('content')
        .eq('slot_id', slotId)
        .single()

      // Save eternal memory
      const { error } = await supabase
        .from('eternal_memories')
        .insert({
          slot_id: slotId,
          thoughts_content: thoughts?.content || '',
          verse_position: currentVerse || 1,
          metadata: {
            eternized_at: new Date().toISOString(),
            session_duration: 'unknown'
          }
        })

      if (error) throw error

      setStatus('saved')
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <button
      onClick={handleEternize}
      disabled={status === 'saving'}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg text-sm
        transition-berit
        ${status === 'saved' 
          ? 'bg-green-900/20 border border-green-500/30 text-green-400'
          : status === 'error'
          ? 'bg-red-900/20 border border-red-500/30 text-red-400'
          : 'bg-berit-gold/10 border border-berit-gold/30 text-berit-gold hover:berit-glow'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {status === 'saving' && <Loader2 className="w-4 h-4 animate-spin" />}
      {status === 'saved' && <Check className="w-4 h-4" />}
      {status === 'error' && <span className="text-xs">Erro</span>}
      {status === 'idle' && <Sparkles className="w-4 h-4" />}
      
      <span>
        {status === 'saving' && 'Eternizando...'}
        {status === 'saved' && 'Memória Eternizada'}
        {status === 'error' && 'Tentar Novamente'}
        {status === 'idle' && 'Eternizar Memória'}
      </span>
    </button>
  )
}
