/**
 * ============================================================================
 * BERIT - Laboratório (Study Screen)
 * ============================================================================
 * 
 * LAYOUT:
 * - Desktop: Split-View (Texto à esquerda, Análise à direita)
 * - Mobile: Sistema de Abas Rápidas (Texto | Análise) na parte inferior
 * 
 * TAILWIND CLASSES:
 * - lg:grid lg:grid-cols-2: Split view em desktop
 * - fixed bottom-0: Tab bar móvel na parte inferior
 * - bg-berit-black: Fundo preto consistente
 * - border-berit-border: Divisórias sutis
 * 
 * COMPONENTS:
 * - ScriptureText: Texto bíblico clicável
 * - LexicoPanel: Dicionário Strong's
 * - SharedThoughts: Pensamentos em tempo real
 * - EternizeMemory: Salvar sessão
 * - ArchitectMode: Feedback flutuante
 * 
 * MAINTENANCE:
 * - Tab state gerenciado localmente para mobile
 * - selectedWord compartilhado entre texto e léxico
 * ============================================================================
 */

'use client'

import { useState, useEffect } from 'react'
import { genesisChapter1, type WordData } from '@/lib/genesis-data'
import { ScriptureText } from './scripture-text'
import { LexicoPanel } from './lexico-panel'
import { SharedThoughts } from './shared-thoughts'
import { EternizeMemory } from './eternize-memory'
import { ArchitectMode } from './architect-mode'
import { beritConfig } from '@/lib/berit-config'
import { BookOpen, Search, ArrowLeft, Settings } from 'lucide-react'

interface LaboratorioProps {
  slotId: string
  onBack: () => void
}

type MobileTab = 'texto' | 'analise'

export function Laboratorio({ slotId, onBack }: LaboratorioProps) {
  const [selectedWord, setSelectedWord] = useState<WordData | null>(null)
  const [mobileTab, setMobileTab] = useState<MobileTab>('texto')
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [compareMode, setCompareMode] = useState(beritConfig.alwaysCompare)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleWordClick = (word: WordData) => {
    setSelectedWord(word)
    // On mobile, switch to analysis tab when word is clicked
    if (window.innerWidth < 1024) {
      setMobileTab('analise')
    }
  }

  return (
    <div 
      className={`
        min-h-screen bg-berit-black flex flex-col
        transition-berit-slow
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-berit-border">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-berit-surface rounded-lg transition-berit"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5 text-berit-text/50" />
          </button>
          
          <div>
            <h1 className="text-berit-gold font-medium tracking-wide">Gênesis 1</h1>
            <p className="text-berit-text/50 text-xs">A Criação</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <EternizeMemory slotId={slotId} currentVerse={1} />
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-berit-surface rounded-lg transition-berit"
            aria-label="Configurações"
          >
            <Settings className="w-5 h-5 text-berit-text/50" />
          </button>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className="p-4 border-b border-berit-border bg-berit-surface/50 animate-in slide-in-from-top duration-300">
          <div className="flex items-center justify-between max-w-md">
            <div>
              <p className="text-berit-text text-sm">Modo Comparação</p>
              <p className="text-berit-text/50 text-xs">Abrir sempre em split-view</p>
            </div>
            <button
              onClick={() => setCompareMode(!compareMode)}
              className={`
                w-12 h-6 rounded-full transition-berit relative
                ${compareMode ? 'bg-berit-gold' : 'bg-berit-border'}
              `}
            >
              <span 
                className={`
                  absolute top-1 w-4 h-4 rounded-full bg-white transition-berit
                  ${compareMode ? 'left-7' : 'left-1'}
                `}
              />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-2 overflow-hidden">
        {/* Left Panel - Scripture Text */}
        <div 
          className={`
            flex-1 overflow-y-auto p-6 lg:border-r lg:border-berit-border
            ${mobileTab === 'texto' ? 'block' : 'hidden lg:block'}
          `}
        >
          <div className="max-w-2xl mx-auto">
            <ScriptureText 
              verses={genesisChapter1}
              onWordClick={handleWordClick}
              selectedWord={selectedWord}
            />
          </div>
        </div>

        {/* Right Panel - Analysis */}
        <div 
          className={`
            flex-1 flex flex-col overflow-hidden bg-berit-surface/30
            ${mobileTab === 'analise' ? 'flex' : 'hidden lg:flex'}
          `}
        >
          {/* Lexicon */}
          <div className="flex-1 overflow-y-auto border-b border-berit-border">
            <LexicoPanel 
              word={selectedWord}
              onClose={() => setSelectedWord(null)}
            />
          </div>

          {/* Shared Thoughts */}
          <div className="p-4 border-t border-berit-border">
            <SharedThoughts slotId={slotId} />
          </div>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-berit-black border-t border-berit-border safe-area-pb">
        <div className="grid grid-cols-2">
          <button
            onClick={() => setMobileTab('texto')}
            className={`
              flex flex-col items-center gap-1 py-4 transition-berit
              ${mobileTab === 'texto' 
                ? 'text-berit-gold' 
                : 'text-berit-text/50'
              }
            `}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-xs">Texto</span>
          </button>

          <button
            onClick={() => setMobileTab('analise')}
            className={`
              flex flex-col items-center gap-1 py-4 transition-berit
              ${mobileTab === 'analise' 
                ? 'text-berit-gold' 
                : 'text-berit-text/50'
              }
            `}
          >
            <Search className="w-5 h-5" />
            <span className="text-xs">Análise</span>
            {selectedWord && mobileTab !== 'analise' && (
              <span className="absolute top-2 right-1/4 w-2 h-2 bg-berit-gold rounded-full" />
            )}
          </button>
        </div>
      </nav>

      {/* Architect Mode - Floating Button */}
      <ArchitectMode />

      {/* Mobile bottom padding for tab bar */}
      <div className="lg:hidden h-20" />
    </div>
  )
}
