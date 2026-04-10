'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/captions', label: 'Rate Captions' },
  { href: '/upload', label: 'Upload' },
]

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <div className="flex flex-row items-center gap-2">
      {links.map(({ href, label }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
              isActive
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}
