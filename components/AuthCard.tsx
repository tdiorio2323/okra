import { ReactNode } from 'react'
import { getCountryTexture } from 'lib/textures'

type AuthCardProps = {
  title?: string
  subtitle?: string
  backgroundCountry?: string // e.g., 'colombia'
  children?: ReactNode
}

export function AuthCard({
  title = 'Sign in',
  subtitle,
  backgroundCountry = 'colombia',
  children,
}: AuthCardProps) {
  const bg = getCountryTexture(backgroundCountry) ?? '/images/red_tufted_texture.jpg'

  return (
    <div
      className="relative w-full max-w-md overflow-hidden rounded-2xl shadow-2xl border border-white/10"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 p-6 sm:p-8 text-white">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle ? (
          <p className="mt-1 text-sm text-white/80">{subtitle}</p>
        ) : null}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}

export default AuthCard

