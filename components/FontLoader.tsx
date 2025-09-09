"use client"
import { useEffect } from 'react'

function toGoogleFamily(family: string, weights: number[]) {
  const fam = family.trim().replace(/\s+/g, '+')
  const uniq = Array.from(new Set(weights)).sort()
  const w = uniq.length ? `:wght@${uniq.join(';')}` : ''
  return `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fam)}${w}&display=swap`
}

export default function FontLoader({ family, weights = [300,400,600,700] }: { family: string; weights?: number[] }) {
  useEffect(() => {
    if (!family) return
    const id = 'dynamic-font-loader'
    let link = document.getElementById(id) as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
    link.href = toGoogleFamily(family, weights)
    return () => {
      // keep the font link for navigation continuity
    }
  }, [family, weights.join(',')])
  return null
}

