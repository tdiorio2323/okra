import NetflixHeader from '@/components/netflix/Header'
import NetflixHero from '@/components/netflix/Hero'
import ContentCarousel, { type Movie } from '@/components/netflix/ContentCarousel'

const mockMovies: Movie[] = Array.from({ length: 10 }, (_, i) => ({
  id: `movie-${i + 1}`,
  title: `Abstract Dimension ${i + 1}`,
  posterUrl: `https://picsum.photos/seed/n${i + 1}/400/600`,
}))

const mockTrending: Movie[] = Array.from({ length: 10 }, (_, i) => ({
  id: `trending-${i + 11}`,
  title: `Neon Future ${i + 1}`,
  posterUrl: `https://picsum.photos/seed/n${i + 11}/400/600`,
}))

export default function NetflixPage() {
  return (
    <main className="bg-black min-h-screen text-white">
      <NetflixHeader />
      <NetflixHero />
      <div className="py-4 md:py-8 space-y-12">
        <ContentCarousel title="New Releases" movies={mockMovies} />
        <ContentCarousel title="Trending Now" movies={mockTrending} />
      </div>
      <footer className="text-center py-8 text-gray-500 border-t border-gray-800">InstaFlix © 2024</footer>
    </main>
  )
}

