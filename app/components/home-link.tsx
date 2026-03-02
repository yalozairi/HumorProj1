'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function HomeLink() {
  const pathname = usePathname()

  if (pathname === '/') return null

  return (
    <Link
      href="/"
      className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg transition-all shadow-sm whitespace-nowrap"
    >
      Home
    </Link>
  )
}
