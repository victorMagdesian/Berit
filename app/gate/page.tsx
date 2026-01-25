import { redirect } from 'next/navigation'
import { PassphraseGate } from '@/components/berit/passphrase-gate'
import { getBeritActivationStatus } from '@/lib/berit/access'

export const dynamic = 'force-dynamic'

export default async function GatePage() {
  const { activated } = await getBeritActivationStatus()

  if (activated) {
    redirect('/')
  }

  return <PassphraseGate />
}
