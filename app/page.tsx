import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import LoginForm from '@/app/login/login-form'

export default async function Home() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Hello World from Gemini
      </h1>
      {user ? (
        <div className="flex flex-col items-center mt-4">
          <p className="text-white text-xl">Welcome, {user.email}</p>
          <Link href="/university_majors" className="text-2xl text-white mt-4">View University Majors</Link>
          <Link href="/captions" className="text-2xl text-white mt-2">Rate Captions</Link>
        </div>
      ) : (
        <div className="mt-8">
          <LoginForm />
        </div>
      )}
    </main>
  )
}
