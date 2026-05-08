import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
// import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { AppProviders } from '@/components/AppProviders'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif'
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: {
    default: 'Optica Morea - Anteojos, Lentes de Contacto y Terapia Visual',
    template: '%s | Optica Morea',
  },
  description: 'Tu optica de confianza en Villa Maria, Cordoba. Anteojos recetados, anteojos de sol, lentes de contacto, accesorios y terapia visual. Trabajamos con todas las obras sociales.',
  keywords: ['optica', 'anteojos', 'lentes de contacto', 'optometria', 'terapia visual', 'lentes recetados', 'anteojos de sol', 'Villa Maria', 'Cordoba'],
  authors: [{ name: 'Optica Morea' }],
  creator: 'Optica Morea',
  publisher: 'Optica Morea',
  metadataBase: new URL('https://optica-morea.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'es-AR': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://optica-morea.vercel.app/',
    siteName: 'Optica Morea',
    title: 'Optica Morea - Anteojos, Lentes de Contacto y Terapia Visual',
    description: 'Tu optica de confianza en Villa Maria, Cordoba. Anteojos recetados, anteojos de sol, lentes de contacto, accesorios y terapia visual.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Optica Morea - Anteojos, Lentes de Contacto y Terapia Visual',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Optica Morea - Anteojos, Lentes de Contacto y Terapia Visual',
    description: 'Tu optica de confianza en Villa Maria, Cordoba. Anteojos recetados, anteojos de sol, lentes de contacto, accesorios y terapia visual.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
  },
  verification: {
    google: '', // Completar con tu codigo de Google Search Console
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        <AppProviders>{children}</AppProviders>
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
