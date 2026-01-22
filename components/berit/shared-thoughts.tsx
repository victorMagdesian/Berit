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

type SupabaseClient = NonNullable<ReturnType<typeof createClient>>

export function SharedThoughts({ slotId }: SharedThoughtsProps) {
  const [content, setContent] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [otherTyping, setOtherTyping] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createClient()
  const debounceRef = useRef<NodeJS.Timeout>()
  const channelRef = useRef<ReturnType<SupabaseClient['channel']> | null>(null)
  const isSupabaseAvailable = Boolean(supabase)

  // Load initial content
  useEffect(() => {
    if (!supabase) return

    const loadContent = async () => {
      try {
        const { data, error } = await supabase
          .from('shared_thoughts')
          .select('content')
          .eq('slot_id', slotId)
          .maybeSingle()
        
        if (error) {
          console.log('[v0] SharedThoughts: Table may not exist yet, using local state')
          return
        }
        
        if (data) {
          setContent(data.content || '')
        }
      } catch (err) {
        console.log('[v0] SharedThoughts: Error loading content, using local state')
      }
    }
    loadContent()
  }, [slotId, supabase])

  // Setup realtime subscription
  useEffect(() => {
    if (!supabase) return

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
    if (!supabase) return

    setIsSaving(true)
    try {
      await supabase
        .from('shared_thoughts')
        .upsert({ 
          slot_id: slotId, 
          content: newContent,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'slot_id'
        })
    } catch (err) {
      console.log('[v0] SharedThoughts: Error saving, continuing with local state')
    }
    setIsSaving(false)
  }, [slotId, supabase])

  // Handle content change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setContent(newContent)

    if (!supabase) return

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
          {!isSupabaseAvailable && (
            <span className="text-berit-gold/60 text-xs">Modo local</span>
          )}
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
        placeholder={
          isSupabaseAvailable
            ? "Compartilhe seus pensamentos..."
            : "Supabase indisponível: salvamento local ativo."
        }
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
