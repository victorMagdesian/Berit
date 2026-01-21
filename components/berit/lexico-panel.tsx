/**
 * ============================================================================
 * BERIT - Léxico Panel (Strong's Dictionary)
 * ============================================================================
 * 
 * TAILWIND CLASSES:
 * - bg-berit-surface: Fundo elevado
 * - border-berit-border: Bordas sutis
 * - text-berit-gold: Elementos de destaque
 * - font-serif: Texto transliterado
 * 
 * PROPS:
 * - word: WordData selecionada
 * - onClose: Callback para fechar painel
 * 
 * MAINTENANCE:
 * - Expandir para incluir mais dados Strong's
 * - Adicionar links para recursos externos
 * ============================================================================
 */

'use client'

import type { WordData } from '@/lib/genesis-data'
import { X, BookMarked, Languages, FileText } from 'lucide-react'

interface LexicoPanelProps {
  word: WordData | null
  onClose: () => void
}

export function LexicoPanel({ word, onClose }: LexicoPanelProps) {
  if (!word) {
    return (
      <div className="h-full flex items-center justify-center text-berit-text/30">
        <div className="text-center">
          <BookMarked className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-sm">Selecione uma palavra</p>
          <p className="text-xs mt-1">para ver o léxico</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-berit-border">
        <h3 className="text-berit-gold font-medium tracking-wide">Léxico</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-berit-border/50 rounded-lg transition-berit"
          aria-label="Fechar léxico"
        >
          <X className="w-4 h-4 text-berit-text/50" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Word */}
        <div>
          <p className="text-2xl text-berit-text font-serif mb-2">{word.text}</p>
          {word.strong && (
            <span className="inline-block px-2 py-1 bg-berit-gold/10 text-berit-gold 
                           text-xs rounded border border-berit-gold/20">
              {word.strong}
            </span>
          )}
        </div>

        {/* Transliteration */}
        {word.transliteration && (
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-berit-text/50 text-xs uppercase tracking-wider">
              <Languages className="w-3 h-3" />
              <span>Transliteração</span>
            </div>
            <p className="text-berit-text font-serif text-lg italic">
              {word.transliteration}
            </p>
          </div>
        )}

        {/* Part of Speech */}
        {word.partOfSpeech && (
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-berit-text/50 text-xs uppercase tracking-wider">
              <FileText className="w-3 h-3" />
              <span>Classe Gramatical</span>
            </div>
            <p className="text-berit-text">
              {word.partOfSpeech}
            </p>
          </div>
        )}

        {/* Definition */}
        {word.definition && (
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-berit-text/50 text-xs uppercase tracking-wider">
              <BookMarked className="w-3 h-3" />
              <span>Definição</span>
            </div>
            <p className="text-berit-text leading-relaxed">
              {word.definition}
            </p>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-berit-border pt-4">
          <p className="text-berit-text/30 text-xs">
            Fonte: Strong&apos;s Concordance
          </p>
        </div>
      </div>
    </div>
  )
}
