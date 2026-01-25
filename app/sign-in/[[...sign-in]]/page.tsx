import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-berit-black flex items-center justify-center px-6">
      <SignIn appearance={{ baseTheme: undefined }} />
    </main>
  )
}
