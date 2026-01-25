/**
 * ============================================================================
 * BERIT - Supabase Browser Client
 * ============================================================================
 * 
 * USO:
 * - Importar createClient() em componentes client-side
 * - Token do Clerk é injetado via Authorization header
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
export const supabaseJwtTemplate =
  process.env.NEXT_PUBLIC_SUPABASE_JWT_TEMPLATE ?? 'supabase'

export function createClient(accessToken?: string | null) {
  if (!isSupabaseConfigured) {
    return null
  }

  return createBrowserClient(supabaseUrl as string, supabaseAnonKey as string, {
    global: {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    },
  })
}
