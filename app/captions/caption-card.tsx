'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CaptionCardProps {
  caption: {
    id: string
    content: string
    like_count: number
    image_url: string | null
  }
  userId: string
  initialVote: number | null // +1, -1, or null
}

export default function CaptionCard({ caption, userId, initialVote }: CaptionCardProps) {
  const supabase = createClient()
  const router = useRouter()
  const [currentVote, setCurrentVote] = useState<number | null>(initialVote)
  const [likeCount, setLikeCount] = useState(caption.like_count)
  const [loading, setLoading] = useState(false)

  const handleVote = async (voteValue: number) => {
    if (loading) return
    setLoading(true)

    try {
      if (currentVote === voteValue) {
        // Remove vote
        const { error } = await supabase
          .from('caption_votes')
          .delete()
          .eq('profile_id', userId)
          .eq('caption_id', caption.id)

        if (!error) {
          setLikeCount(prev => prev - voteValue)
          setCurrentVote(null)
        }
      } else {
        if (currentVote !== null) {
          // Update existing vote
          const { error } = await supabase
            .from('caption_votes')
            .update({
              vote_value: voteValue,
              modified_by_user_id: userId,
            })
            .eq('profile_id', userId)
            .eq('caption_id', caption.id)

          if (!error) {
            setLikeCount(prev => prev - currentVote + voteValue)
            setCurrentVote(voteValue)
          }
        } else {
          // Insert new vote
          const { error } = await supabase
            .from('caption_votes')
            .insert({
              vote_value: voteValue,
              profile_id: userId,
              caption_id: caption.id,
              created_by_user_id: userId,
              modified_by_user_id: userId,
            })

          if (!error) {
            setLikeCount(prev => prev + voteValue)
            setCurrentVote(voteValue)
          }
        }
      }
    } finally {
      setLoading(false)
      router.refresh()
    }
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 flex flex-col gap-4 overflow-hidden min-w-0">
      {caption.image_url && (
        <img
          src={caption.image_url}
          alt="Caption image"
          className="w-full h-64 object-cover rounded-lg"
        />
      )}
      <p className="text-white text-lg text-center line-clamp-3 break-all">{caption.content}</p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleVote(1)}
          disabled={loading}
          className={`px-4 py-2 rounded-lg font-bold transition-colors ${
            currentVote === 1
              ? 'bg-green-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          ▲ Upvote
        </button>
        <span className="text-white text-xl font-bold">{likeCount}</span>
        <button
          onClick={() => handleVote(-1)}
          disabled={loading}
          className={`px-4 py-2 rounded-lg font-bold transition-colors ${
            currentVote === -1
              ? 'bg-red-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          ▼ Downvote
        </button>
      </div>
    </div>
  )
}
