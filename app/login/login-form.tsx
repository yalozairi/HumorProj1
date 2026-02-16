'use client'

import { createClient } from '@/lib/supabase/client'

export default function LoginForm() {
  const supabase = createClient()

  const signInWithGoogle = async () => {
    const redirectTo = `${window.location.origin}/auth/callback`
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo,
      },
    })
  }

  return (
    <button
      onClick={signInWithGoogle}
      className="px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-600 text-white text-xl font-bold rounded-lg hover:opacity-90 transition-opacity"
    >
      Login with Google
    </button>
  )
}
