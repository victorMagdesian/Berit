import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'
import { timingSafeEqual } from 'crypto'

export async function POST(request: Request) {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const expectedPassphrase = process.env.BERIT_GATE_PASSPHRASE

  if (!expectedPassphrase) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  const body = await request.json().catch(() => null)
  const passphrase = typeof body?.passphrase === 'string' ? body.passphrase : ''

  const expectedBuffer = Buffer.from(expectedPassphrase)
  const providedBuffer = Buffer.from(passphrase)

  if (
    expectedBuffer.length !== providedBuffer.length ||
    !timingSafeEqual(expectedBuffer, providedBuffer)
  ) {
    return NextResponse.json({ error: 'Invalid passphrase' }, { status: 401 })
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from('berit_access')
    .upsert(
      {
        clerk_user_id: userId,
        activated: true,
        activated_at: new Date().toISOString(),
      },
      { onConflict: 'clerk_user_id' }
    )

  if (error) {
    return NextResponse.json({ error: 'Activation failed' }, { status: 500 })
  }

  return NextResponse.json({ activated: true })
}
