import { createClient } from '@/lib/supabase/server'
import { createClient as createPublicClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import SignOutButton from '@/app/university_majors/sign-out-button'
import CaptionCard from './caption-card'

export default async function CaptionsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const publicSupabase = createPublicClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Fetch captions with their image URLs
  const { data: captions } = await publicSupabase
    .from('captions')
    .select('id, content, like_count, image_id, images(url)')
    .eq('is_public', true)
    .order('like_count', { ascending: false })

  // Fetch the current user's votes
  const { data: votes } = await publicSupabase
    .from('caption_votes')
    .select('caption_id, vote_value')
    .eq('profile_id', user.id)

  const voteMap = new Map<string, number>()
  if (votes) {
    for (const v of votes) {
      voteMap.set(v.caption_id, v.vote_value)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-900 py-12 px-4">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
        Rate Captions
      </h1>
      <p className="text-white text-lg mb-2">Welcome, {user.email}</p>
      <div className="flex gap-4 mb-8">
        <Link href="/university_majors" className="text-purple-400 hover:text-purple-300 underline">
          University Majors
        </Link>
        <SignOutButton />
      </div>

      {captions && captions.length > 0 ? (
        <div className="grid gap-6 w-full max-w-2xl">
          {captions.map((caption: any) => (
            <CaptionCard
              key={caption.id}
              caption={{
                id: caption.id,
                content: caption.content,
                like_count: caption.like_count,
                image_url: caption.images?.url ?? null,
              }}
              userId={user.id}
              initialVote={voteMap.get(caption.id) ?? null}
            />
          ))}
        </div>
      ) : (
        <p className="text-white text-2xl">No captions found.</p>
      )}
    </main>
  )
}
