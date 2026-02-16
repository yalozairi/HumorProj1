'use client'

import { createClient } from '@/lib/supabase/client'
import { getURL } from '@/lib/utils'

export default function LoginForm() {
  const supabase = createClient()

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: `${getURL()}auth/callback`,
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
