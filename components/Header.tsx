'use client'
import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b sticky top-0 bg-white/80 backdrop-blur z-40">
      <nav className="max-w-7xl mx-auto px-4 flex h-14 items-center gap-6">
        <Link href="/" className="font-bold">FORT MANER</Link>
        <Link href="/community" className="text-sm">Community</Link>
        <Link href="/builder" className="text-sm">Builder</Link>
        <Link href="/auth" className="text-sm">Auth</Link>
      </nav>
    </header>
  )
}
