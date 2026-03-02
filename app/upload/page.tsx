import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import UploadForm from './upload-form'

export default async function UploadPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-900 py-12 px-4">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
        Upload Image
      </h1>

      <UploadForm />
    </main>
  )
}
