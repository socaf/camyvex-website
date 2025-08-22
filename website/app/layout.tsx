import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Camyvex - Luxury AI Photos',
  description: 'Transform your photos into luxury lifestyle moments with AI-powered photo enhancement. Create professional-quality luxury photos instantly.',
  keywords: ['photo', 'AI', 'luxury', 'lifestyle', 'enhancement', 'transformation', 'professional'],
  authors: [{ name: 'Camyvex' }],
  openGraph: {
    title: 'Camyvex - Luxury AI Photos',
    description: 'Transform your photos into luxury lifestyle moments with AI-powered photo enhancement.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Camyvex - Luxury AI Photos',
    description: 'Transform your photos into luxury lifestyle moments with AI-powered photo enhancement.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-dark text-white`}>
        {children}
      </body>
    </html>
  )
}