/**
 * ============================================================================
 * BERIT - Supabase Browser Client (Singleton)
 * ============================================================================
 * 
 * USO:
 * - Importar createClient() em componentes client-side
 * - Singleton pattern evita múltiplas instâncias
 * 
 * MAINTENANCE:
 * - Usar apenas em 'use client' components
 * - Para server-side, usar /lib/supabase/server.ts
 * ============================================================================
 */

import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

let client: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (!isSupabaseConfigured) {
    return null
  }

  if (client) return client
  
  client = createBrowserClient(supabaseUrl as string, supabaseAnonKey as string)
  
  return client
}
