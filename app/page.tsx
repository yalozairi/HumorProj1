import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import LoginForm from '@/app/login/login-form'

export default async function Home() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gray-900">
      {user && (
        <p className="text-white text-xl mb-8">Welcome to...</p>
      )}

      <h1 style={{ marginBottom: '5rem' }} className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Yousif's Project 1 (feat. Gemini)
      </h1>

      {user ? (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>
            <Link
              href="/captions"
              className="w-64 text-center px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 shadow-lg shadow-purple-900/40 transition-all"
            >
              Rate Captions
            </Link>
            <Link
              href="/upload"
              className="w-64 text-center px-6 py-3 rounded-xl font-semibold text-purple-300 border border-purple-600 hover:bg-purple-900/30 hover:text-white transition-all"
            >
              Upload & Caption Image
            </Link>
          </div>
          <div className="absolute bottom-8">
            <Link href="/university_majors" className="text-sm text-gray-500 hover:text-gray-400">
              [Old Assignment] Click to View Our University Majors!
            </Link>
          </div>
        </>
      ) : (
        <div className="mt-8">
          <LoginForm />
        </div>
      )}
    </main>
  )
}
