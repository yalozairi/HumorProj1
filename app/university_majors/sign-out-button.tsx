'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
  const supabase = createClient()
  const router = useRouter()

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <button
      onClick={signOut}
      className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-red-300 border border-gray-600 hover:border-red-700 rounded-lg transition-all whitespace-nowrap"
    >
      Sign Out
    </button>
  )
}