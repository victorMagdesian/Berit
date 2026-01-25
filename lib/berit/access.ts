import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'

export async function getBeritActivationStatus() {
  const { userId } = auth()

  if (!userId) {
    return { activated: false, userId: null }
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('berit_access')
    .select('activated')
    .eq('clerk_user_id', userId)
    .maybeSingle()

  if (error) {
    return { activated: false, userId }
  }

  return { activated: data?.activated ?? false, userId }
}
