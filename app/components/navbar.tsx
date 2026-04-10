import { createClient } from '@/lib/supabase/server'
import SignOutButton from '@/app/university_majors/sign-out-button'
import NavLinks from './nav-links'

export default async function Navbar() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  return (
    <nav
      className="sticky top-0 z-50 bg-gray-800 border-b border-gray-700 px-5 py-3 flex flex-row items-center gap-4"
    >
      <NavLinks />

      <div className="flex-1" />

      <span className="text-gray-400 text-sm hidden sm:block truncate max-w-[180px]">{user.email}</span>

      <SignOutButton />
    </nav>
  )
}
