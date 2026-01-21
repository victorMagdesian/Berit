/**
 * ============================================================================
 * BERIT - Scripture Text Display
 * ============================================================================
 * 
 * TAILWIND CLASSES:
 * - font-serif: Merriweather para texto sagrado
 * - berit-scripture: Estilos base para escritura
 * - berit-word: Palavra clicável com hover dourado
 * - leading-relaxed: Espaçamento de linha confortável
 * 
 * PROPS:
 * - verses: Array de VerseData
 * - onWordClick: Callback quando palavra é clicada
 * - selectedWord: Palavra atualmente selecionada
 * 
 * MAINTENANCE:
 * - Cada palavra é um span clicável
 * - Versículos separados por número dourado
 * ============================================================================
 */

'use client'

import type { VerseData, WordData } from '@/lib/genesis-data'

interface ScriptureTextProps {
  verses: VerseData[]
  onWordClick: (word: WordData) => void
  selectedWord: WordData | null
}

export function ScriptureText({ verses, onWordClick, selectedWord }: ScriptureTextProps) {
  return (
    <div className="space-y-6">
      {verses.map((verse) => (
        <div key={verse.number} className="group">
          <p className="berit-scripture text-lg md:text-xl text-berit-text">
            {/* Verse number */}
            <span className="text-berit-gold/60 font-sans text-sm mr-2 select-none">
              {verse.number}
            </span>
            
            {/* Words */}
            {verse.words.map((word, index) => (
              <span key={`${verse.number}-${index}`}>
                <span
                  onClick={() => onWordClick(word)}
                  onKeyDown={(e) => e.key === 'Enter' && onWordClick(word)}
                  role="button"
                  tabIndex={0}
                  className={`
                    berit-word
                    ${selectedWord?.text === word.text && selectedWord?.strong === word.strong
                      ? 'text-berit-gold'
                      : ''
                    }
                  `}
                >
                  {word.text}
                </span>
                {index < verse.words.length - 1 && ' '}
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  )
}
