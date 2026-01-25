/**
 * ============================================================================
 * BERIT - A Porta (Login Screen)
 * ============================================================================
 * 
 * TAILWIND CLASSES:
 * - min-h-screen: Altura mínima da viewport
 * - flex items-center justify-center: Centralização
 * - bg-berit-black: Fundo preto puro
 * - text-berit-text: Texto zinc-300
 * - text-berit-gold: Elementos dourados de aliança
 * - transition-berit: Transição lenta 700ms
 * - berit-input: Input customizado com borda inferior
 * 
 * STATES:
 * - 'slots': Exibindo save slots
 * - 'entering': Transição para Laboratório
 * 
 * MAINTENANCE:
 * - Save slots iniciais em /lib/genesis-data.ts
 * ============================================================================
 */

'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { beritConfig } from '@/lib/berit-config'
import { defaultSaveSlots } from '@/lib/genesis-data'
import { BookOpen, ChevronRight } from 'lucide-react'

interface APortaProps {
  onEnterLaboratory: (slotId: string) => void
}

export function APorta({ onEnterLaboratory }: APortaProps) {
  const [state, setState] = useState<'slots' | 'entering'>('slots')
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Fade in on mount
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlot(slotId)
    setState('entering')
    
    // Delay to show transition
    setTimeout(() => {
      onEnterLaboratory(slotId)
    }, 1000)
  }

  return (
    <main 
      className={`
        min-h-screen bg-berit-black flex flex-col items-center justify-center
        px-6 transition-berit-slow
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${state === 'entering' ? 'opacity-0 scale-95' : ''}
      `}
    >
      {/* Title */}
      <div className="text-center mb-12 transition-berit">
        <h1 className="text-3xl md:text-4xl font-light tracking-[0.3em] text-berit-gold mb-2">
          {beritConfig.systemName}
        </h1>
        <p className="text-sm tracking-[0.2em] text-berit-text/60 uppercase">
          {beritConfig.systemSubtitle}
        </p>
      </div>

      {/* Save Slots State */}
      {state === 'slots' && (
        <div className="w-full max-w-md transition-berit animate-in fade-in duration-700">
          <p className="text-center text-berit-text/50 text-sm mb-8 tracking-wide">
            Selecione uma jornada
          </p>
          
          <div className="space-y-4">
            {defaultSaveSlots.map((slot, index) => (
              <button
                key={slot.id}
                onClick={() => handleSlotSelect(slot.id)}
                className={`
                  berit-slot w-full text-left flex items-center gap-4
                  ${selectedSlot === slot.id ? 'active' : ''}
                `}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-berit-border/50 flex items-center justify-center
                              border border-berit-border">
                  <BookOpen className="w-5 h-5 text-berit-gold/70" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-berit-text font-medium">{slot.title}</span>
                    <span className="text-berit-gold/70 text-sm">{slot.subtitle}</span>
                  </div>
                  <p className="text-berit-text/50 text-sm mt-1">{slot.description}</p>
                </div>
                
                <ChevronRight className="w-5 h-5 text-berit-text/30" />
              </button>
            ))}
            
            {/* Empty slots */}
            {[1, 2].map((_, index) => (
              <div
                key={`empty-${index}`}
                className="berit-slot w-full opacity-30 cursor-not-allowed"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-berit-border/30 flex items-center justify-center
                                border border-berit-border/50 border-dashed">
                    <span className="text-berit-text/30 text-xl">+</span>
                  </div>
                  <span className="text-berit-text/30 text-sm">Slot vazio</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="absolute bottom-6 text-center">
        <p className="text-berit-text/20 text-xs tracking-widest">
          TEMPLO DIGITAL
        </p>
      </footer>
    </main>
  )
}
