/**
 * ============================================================================
 * BERIT - Shared Thoughts (Realtime Sync)
 * ============================================================================
 * 
 * TAILWIND CLASSES:
 * - bg-berit-surface: Área de texto elevada
 * - border-berit-gold/20: Borda dourada sutil
 * - berit-glow: Efeito de brilho quando ativo
 * 
 * FUNCTIONALITY:
 * - Sincroniza texto em tempo real via Supabase Realtime
 * - Debounce de 500ms para evitar spam de updates
 * - Indicador de digitação quando outro usuário edita
 * 
 * MAINTENANCE:
 * - Canal Supabase: 'shared-thoughts'
 * - Tabela: shared_thoughts (slot_id, content, updated_at)
 * ============================================================================
 */

'use client'

import React from "react"

import { useState, useEffect, useCallback, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Users, Wifi, WifiOff } from 'lucide-react'

interface SharedThoughtsProps {
  slotId: string
}

export function SharedThoughts({ slotId }: SharedThoughtsProps) {
  const [content, setContent] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [otherTyping, setOtherTyping] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createClient()
  const debounceRef = useRef<NodeJS.Timeout>()
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null)

  // Load initial content
  useEffect(() => {
    const loadContent = async () => {
      const { data } = await supabase
        .from('shared_thoughts')
        .select('content')
        .eq('slot_id', slotId)
        .single()
      
      if (data) {
        setContent(data.content || '')
      }
    }
    loadContent()
  }, [slotId, supabase])

  // Setup realtime subscription
  useEffect(() => {
    const channel = supabase.channel(`thoughts-${slotId}`)
    channelRef.current = channel

    channel
      .on('presence', { event: 'sync' }, () => {
        setIsConnected(true)
      })
      .on('broadcast', { event: 'typing' }, () => {
        setOtherTyping(true)
        setTimeout(() => setOtherTyping(false), 1500)
      })
      .on('broadcast', { event: 'content-update' }, ({ payload }) => {
        setContent(payload.content)
      })
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [slotId, supabase])

  // Save content to database
  const saveContent = useCallback(async (newContent: string) => {
    setIsSaving(true)
    await supabase
      .from('shared_thoughts')
      .upsert({ 
        slot_id: slotId, 
        content: newContent,
        updated_at: new Date().toISOString()
      })
    setIsSaving(false)
  }, [slotId, supabase])

  // Handle content change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setContent(newContent)

    // Broadcast typing indicator
    channelRef.current?.send({
      type: 'broadcast',
      event: 'typing',
      payload: {}
    })

    // Broadcast content update
    channelRef.current?.send({
      type: 'broadcast',
      event: 'content-update',
      payload: { content: newContent }
    })

    // Debounce save to database
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => {
      saveContent(newContent)
    }, 500)
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-berit-text/50 text-xs uppercase tracking-wider">
          <Users className="w-3 h-3" />
          <span>Pensamentos Compartilhados</span>
        </div>
        
        <div className="flex items-center gap-2">
          {isSaving && (
            <span className="text-berit-gold/50 text-xs">Salvando...</span>
          )}
          {otherTyping && (
            <span className="text-berit-gold text-xs animate-pulse">
              Digitando...
            </span>
          )}
          {isConnected ? (
            <Wifi className="w-3 h-3 text-green-500/70" />
          ) : (
            <WifiOff className="w-3 h-3 text-berit-text/30" />
          )}
        </div>
      </div>

      {/* Text Area */}
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Compartilhe seus pensamentos..."
        className={`
          w-full h-32 p-4 bg-berit-surface border border-berit-border rounded-lg
          text-berit-text placeholder:text-berit-text/30 resize-none
          focus:outline-none focus:border-berit-gold/30 focus:berit-glow
          transition-berit text-sm leading-relaxed
        `}
      />
    </div>
  )
}
