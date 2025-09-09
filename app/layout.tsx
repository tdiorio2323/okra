import "@/shims/icon-shims";
import './globals.css'
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Space_Mono, Poppins, Montserrat, Roboto, Lato, Oswald, Raleway } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter', weight: ['300','400','600','700'] })
const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap', variable: '--font-playfair', weight: ['400','700'] })
const spaceMono = Space_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-space-mono', weight: ['400','700'] })
const poppins = Poppins({ subsets: ['latin'], display: 'swap', variable: '--font-poppins', weight: ['300','400','600','700'] })
const montserrat = Montserrat({ subsets: ['latin'], display: 'swap', variable: '--font-montserrat', weight: ['300','400','600','700'] })
const roboto = Roboto({ subsets: ['latin'], display: 'swap', variable: '--font-roboto', weight: ['300','400','500','700'] })
const lato = Lato({ subsets: ['latin'], display: 'swap', variable: '--font-lato', weight: ['300','400','700'] })
const oswald = Oswald({ subsets: ['latin'], display: 'swap', variable: '--font-oswald', weight: ['300','400','600','700'] })
const raleway = Raleway({ subsets: ['latin'], display: 'swap', variable: '--font-raleway', weight: ['300','400','600','700'] })

export const metadata: Metadata = {
  title: 'TD Studios',
  description: 'TD Studios site',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={[inter.variable, playfair.variable, spaceMono.variable, poppins.variable, montserrat.variable, roboto.variable, lato.variable, oswald.variable, raleway.variable].join(' ')}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
