/**
 * ============================================================================
 * BERIT - App Shell (Client)
 * ============================================================================
 * 
 * NAVIGATION FLOW:
 * 1. A Porta (Slots) -> Selecionar jornada
 * 2. Laboratório (Study) -> Estudo bíblico
 * 
 * STATE MANAGEMENT:
 * - currentView: 'porta' | 'laboratorio'
 * - activeSlot: ID do slot selecionado
 * ============================================================================
 */

'use client'

import { useState, useEffect } from 'react'
import { APorta } from '@/components/berit/a-porta'
import { Laboratorio } from '@/components/berit/laboratorio'

type View = 'porta' | 'laboratorio'

export function BeritApp() {
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
