/**
 * ============================================================================
 * BERIT - ALIANÇA SAGRADA | Main Page
 * ============================================================================
 * 
 * NAVIGATION FLOW:
 * 1. A Porta (Login) -> Senha '06122025'
 * 2. Save Slots Selection -> Escolher jornada
 * 3. Laboratório (Study) -> Estudo bíblico
 * 
 * STATE MANAGEMENT:
 * - currentView: 'porta' | 'laboratorio'
 * - activeSlot: ID do slot selecionado
 * 
 * TAILWIND CLASSES:
 * - min-h-screen: Altura total da viewport
 * - bg-berit-black: Fundo preto puro (#000000)
 * 
 * MAINTENANCE:
 * - Transições entre views usam opacity/scale
 * - Estado persiste em sessionStorage para refresh
 * ============================================================================
 */

'use client'

import { useState, useEffect } from 'react'
import { APorta } from '@/components/berit/a-porta'
import { Laboratorio } from '@/components/berit/laboratorio'

type View = 'porta' | 'laboratorio'

export default function BeritPage() {
  const [currentView, setCurrentView] = useState<View>('porta')
  const [activeSlot, setActiveSlot] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Restore state from sessionStorage on mount
  useEffect(() => {
    const savedView = sessionStorage.getItem('berit-view') as View | null
    const savedSlot = sessionStorage.getItem('berit-slot')
    
    if (savedView && savedSlot) {
      setCurrentView(savedView)
      setActiveSlot(savedSlot)
    }
  }, [])

  // Save state to sessionStorage on change
  useEffect(() => {
    if (currentView && activeSlot) {
      sessionStorage.setItem('berit-view', currentView)
      sessionStorage.setItem('berit-slot', activeSlot)
    }
  }, [currentView, activeSlot])

  const handleEnterLaboratory = (slotId: string) => {
    setIsTransitioning(true)
    setActiveSlot(slotId)
    
    // Delay view change for smooth transition
    setTimeout(() => {
      setCurrentView('laboratorio')
      setIsTransitioning(false)
    }, 100)
  }

  const handleBackToPorta = () => {
    setIsTransitioning(true)
    
    setTimeout(() => {
      setCurrentView('porta')
      setActiveSlot(null)
      sessionStorage.removeItem('berit-view')
      sessionStorage.removeItem('berit-slot')
      setIsTransitioning(false)
    }, 100)
  }

  return (
    <div 
      className={`
        min-h-screen bg-berit-black
        transition-berit
        ${isTransitioning ? 'opacity-50' : 'opacity-100'}
      `}
    >
      {currentView === 'porta' && (
        <APorta onEnterLaboratory={handleEnterLaboratory} />
      )}
      
      {currentView === 'laboratorio' && activeSlot && (
        <Laboratorio 
          slotId={activeSlot}
          onBack={handleBackToPorta}
        />
      )}
    </div>
  )
}
