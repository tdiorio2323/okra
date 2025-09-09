"use client"
import GlassCard from 'components/GlassCard'
import { getCountryTexture } from 'lib/textures'
import Image from 'next/image'
import { useState, type FormEvent } from 'react'

export default function AuthPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccess(null)
    try {
      const fd = new FormData(e.currentTarget)
      const vip = String(fd.get('vipCode') || '').trim().toLowerCase()
      if (vip !== 'td2025') {
        setError('Invalid VIP code')
        return
      }
      setSuccess('VIP access granted')
      // TODO: proceed with actual auth flow here if needed
    } finally {
      setSubmitting(false)
    }
  }
  const bg = getCountryTexture('colombia') ?? '/images/red_tufted_texture.jpg'
  return (
    <main
      className="relative min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 w-full max-w-md">
        <GlassCard>
          <div className="w-full flex justify-center mb-5">
            <Image
              src="/images/tdstudios-auth-logo.png"
              alt="TD Studios Logo"
              width={200}
              height={80}
              priority
              className="h-16 w-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            />
          </div>
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="mt-1 text-sm text-white/80">Sign in to continue</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-white">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="w-full rounded-md bg-white/90 text-black px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="yourusername"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-md bg-white/90 text-black px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="••••••••"
              />
            </div>
            <div className="h-px bg-white/20" />
            <div className="space-y-2">
              <label htmlFor="vipCode" className="block text-sm font-medium text-white">VIP Code</label>
              <input
                id="vipCode"
                name="vipCode"
                type="text"
                inputMode="text"
                aria-invalid={error ? true : undefined}
                className="w-full rounded-md bg-white/90 text-black px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-300 tracking-widest"
                placeholder="VIP-XXXXX"
              />
            </div>
            <button type="submit" className="btn-primary w-full" disabled={submitting}>
              {submitting ? 'Please wait…' : 'MYLOW CODE'}
            </button>
            {error && <p className="text-red-300 text-sm">{error}</p>}
            {success && <p className="text-emerald-300 text-sm">{success}</p>}
          </form>
        </GlassCard>
      </div>
    </main>
  )
}
