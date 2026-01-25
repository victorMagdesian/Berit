/**
 * ============================================================================
 * BERIT - Supabase Server Client
 * ============================================================================
 * 
 * USO:
 * - Importar createClient() em Server Components e Route Handlers
 * - Cada chamada cria nova instância com JWT do Clerk
 * 
 * MAINTENANCE:
 * - Usar apenas em server-side (RSC, API routes, Server Actions)
 * - Para client-side, usar /lib/supabase/client.ts
 * ============================================================================
 */

import { createServerClient } from '@supabase/ssr'
import { auth } from '@clerk/nextjs/server'
import { cookies } from 'next/headers'

export async function createClient() {
  const { getToken } = auth()
  const supabaseJwtTemplate = process.env.SUPABASE_JWT_TEMPLATE ?? 'supabase'
  const token = await getToken({ template: supabaseJwtTemplate })
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      },
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignore - called from Server Component
          }
        },
      },
    }
  )
}
