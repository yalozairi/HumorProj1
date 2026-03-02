'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const OPTIONS = [
  { value: 'top',    label: 'Top Rated' },
  { value: 'low',    label: 'Lowest Rated' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
]

export default function SortSelector() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const current = searchParams.get('sort') ?? 'newest'

  const setSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-3 mb-8 flex-wrap justify-center">
      <span className="text-gray-400 text-sm mr-1">Sort by:</span>
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setSort(opt.value)}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            current === opt.value
              ? 'bg-purple-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
