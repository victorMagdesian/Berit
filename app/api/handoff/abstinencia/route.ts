import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getBeritActivationStatus } from '@/lib/berit/access'
import { createHmac, randomUUID } from 'crypto'

function base64UrlEncode(input: string) {
  return Buffer.from(input).toString('base64url')
}

export async function POST() {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { activated } = await getBeritActivationStatus()

  if (!activated) {
    return NextResponse.json({ error: 'Activation required' }, { status: 403 })
  }

  const secret = process.env.HANDOFF_SECRET
  const aud = process.env.HANDOFF_AUD ?? 'abstinenciahelp'

  if (!secret) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  const now = Math.floor(Date.now() / 1000)
  const payload = {
    sub: userId,
    aud,
    iss: 'berit',
    iat: now,
    exp: now + 120,
    nonce: randomUUID(),
  }

  const header = {
    alg: 'HS256',
    typ: 'JWT',
  }

  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedPayload = base64UrlEncode(JSON.stringify(payload))
  const signature = createHmac('sha256', secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url')

  const token = `${encodedHeader}.${encodedPayload}.${signature}`

  return NextResponse.json({ token })
}
