import { createClient } from '@/lib/supabase/server'
import SignOutButton from '@/app/university_majors/sign-out-button'
import HomeLink from './home-link'

export default async function Navbar() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  return (
    <nav
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}
      className="sticky top-0 z-50 bg-gray-800 border-b border-gray-700 px-5 py-3"
    >
      <div style={{ width: '140px', flexShrink: 0 }}>
        <HomeLink />
      </div>

      <div style={{ flex: 1, textAlign: 'center', overflow: 'hidden' }}>
        <span className="text-gray-300 text-sm block truncate">{user.email}</span>
      </div>

      <div style={{ width: '140px', flexShrink: 0, display: 'flex', justifyContent: 'flex-end' }}>
        <SignOutButton />
      </div>
    </nav>
  )
}
