"use client"
import { useRef } from 'react'

export type Movie = { id: string; title: string; posterUrl: string }

function Card({ movie }: { movie: Movie }) {
  return (
    <div className="min-w-[180px] sm:min-w-[200px] lg:min-w-[220px] snap-start">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={movie.posterUrl} alt={movie.title} className="w-full h-[270px] object-cover rounded-lg shadow-lg" />
      <p className="mt-2 text-sm text-gray-300 line-clamp-1">{movie.title}</p>
    </div>
  )
}

export default function ContentCarousel({ title, movies }: { title: string; movies: Movie[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.8
    el.scrollTo({ left: dir === 'left' ? el.scrollLeft - amount : el.scrollLeft + amount, behavior: 'smooth' })
  }
  return (
    <div className="px-4 md:px-12 lg:px-24 group/carousel relative">
      <h3 className="text-xl md:text-2xl font-bold mb-4">{title}</h3>
      <button aria-label="Prev" onClick={() => scroll('left')} className="hidden md:grid place-items-center absolute top-1/2 -translate-y-1/2 -left-2 z-20 h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover/carousel:opacity-100">◀</button>
      <div ref={scrollRef} className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 pr-1">
        {movies.map(m => <Card key={m.id} movie={m} />)}
      </div>
      <button aria-label="Next" onClick={() => scroll('right')} className="hidden md:grid place-items-center absolute top-1/2 -translate-y-1/2 -right-2 z-20 h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover/carousel:opacity-100">▶</button>
    </div>
  )
}

