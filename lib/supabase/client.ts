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

let client: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (client) return client
  
  client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  
  return client
}
