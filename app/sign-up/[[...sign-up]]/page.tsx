import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-berit-black flex items-center justify-center px-6">
      <SignUp appearance={{ baseTheme: undefined }} />
    </main>
  )
}
