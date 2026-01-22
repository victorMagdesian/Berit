/**
 * ============================================================================
 * BERIT - Modo Arquiteta (Feedback Curatorial)
 * ============================================================================
 * 
 * TAILWIND CLASSES:
 * - fixed bottom-6 right-6: Posição flutuante
 * - bg-berit-surface: Fundo do painel
 * - berit-glow: Efeito de brilho no botão
 * 
 * CATEGORIES:
 * - 'Ajustar Brilho' (bug): Reportar problemas
 * - 'Expandir Horizonte' (idea): Sugerir melhorias
 * 
 * MAINTENANCE:
 * - Tabela: feedback
 * - Categorias configuradas em /lib/berit-config.ts
 * ============================================================================
 */

'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { beritConfig } from '@/lib/berit-config'
import { Compass, X, Lightbulb, Bug, Send, Check } from 'lucide-react'

export function ArchitectMode() {
  const [isOpen, setIsOpen] = useState(false)
  const [category, setCategory] = useState<'bug' | 'idea' | null>(null)
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const supabase = createClient()
  const isSupabaseAvailable = Boolean(supabase)

  const handleSubmit = async () => {
    if (!category || !content.trim() || !supabase) return

    setStatus('sending')

    try {
      await supabase.from('feedback').insert({
        category,
        content: content.trim(),
      })

      setStatus('sent')
      setTimeout(() => {
        setStatus('idle')
        setContent('')
        setCategory(null)
        setIsOpen(false)
      }, 2000)
    } catch {
      setStatus('idle')
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`
          fixed bottom-6 right-6 z-50
          w-12 h-12 rounded-full
          bg-berit-surface border border-berit-border
          flex items-center justify-center
          hover:border-berit-gold/50 hover:berit-glow
          transition-berit
          ${isOpen ? 'opacity-0 pointer-events-none' : ''}
        `}
        aria-label="Abrir Modo Arquiteta"
      >
        <Compass className="w-5 h-5 text-berit-gold" />
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/80 animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-berit-surface border border-berit-border rounded-xl overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-berit-border">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-berit-gold" />
                <h3 className="text-berit-gold font-medium">Modo Arquiteta</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-berit-border/50 rounded-lg transition-berit"
              >
                <X className="w-4 h-4 text-berit-text/50" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {!isSupabaseAvailable && (
                <div className="rounded-lg border border-berit-gold/30 bg-berit-black/80 p-3 text-xs text-berit-gold/70">
                  Supabase indisponível. O feedback ficará desativado até que as credenciais estejam configuradas.
                </div>
              )}
              {status === 'sent' ? (
                <div className="text-center py-8">
                  <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-berit-text">Feedback enviado</p>
                  <p className="text-berit-text/50 text-sm">Obrigado pela contribuição</p>
                </div>
              ) : (
                <>
                  {/* Category Selection */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setCategory('bug')}
                      className={`
                        p-4 rounded-lg border text-left transition-berit
                        ${category === 'bug' 
                          ? 'border-berit-gold bg-berit-gold/10' 
                          : 'border-berit-border hover:border-berit-gold/30'
                        }
                      `}
                    >
                      <Bug className={`w-5 h-5 mb-2 ${category === 'bug' ? 'text-berit-gold' : 'text-berit-text/50'}`} />
                      <p className="text-berit-text text-sm font-medium">
                        {beritConfig.feedbackCategories.bug}
                      </p>
                      <p className="text-berit-text/50 text-xs mt-1">Reportar bugs</p>
                    </button>

                    <button
                      onClick={() => setCategory('idea')}
                      className={`
                        p-4 rounded-lg border text-left transition-berit
                        ${category === 'idea' 
                          ? 'border-berit-gold bg-berit-gold/10' 
                          : 'border-berit-border hover:border-berit-gold/30'
                        }
                      `}
                    >
                      <Lightbulb className={`w-5 h-5 mb-2 ${category === 'idea' ? 'text-berit-gold' : 'text-berit-text/50'}`} />
                      <p className="text-berit-text text-sm font-medium">
                        {beritConfig.feedbackCategories.idea}
                      </p>
                      <p className="text-berit-text/50 text-xs mt-1">Sugerir ideias</p>
                    </button>
                  </div>

                  {/* Text Area */}
                  {category && (
                    <div className="space-y-3 animate-in fade-in duration-300">
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Descreva em detalhes..."
                        className="w-full h-24 p-3 bg-berit-black border border-berit-border rounded-lg
                                 text-berit-text placeholder:text-berit-text/30 resize-none text-sm
                                 focus:outline-none focus:border-berit-gold/30 transition-berit"
                        autoFocus
                      />

                      <button
                        onClick={handleSubmit}
                        disabled={!content.trim() || status === 'sending' || !isSupabaseAvailable}
                        className="w-full py-3 bg-berit-gold/10 border border-berit-gold/30 
                                 text-berit-gold rounded-lg flex items-center justify-center gap-2
                                 hover:bg-berit-gold/20 transition-berit
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                        <span>{status === 'sending' ? 'Enviando...' : 'Enviar Feedback'}</span>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
