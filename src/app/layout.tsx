import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactChatLauncher from '@/components/ContactChatLauncher'
import { defaultSeo, siteUrl } from '@/data/seo'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultSeo.title,
    template: '%s',
  },
  description: defaultSeo.description,
  applicationName: defaultSeo.siteName,
  creator: 'Alexis',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/logo/sixlab-icon-light.svg',
  },
  openGraph: {
    title: defaultSeo.title,
    description: defaultSeo.description,
    url: '/',
    siteName: defaultSeo.siteName,
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: defaultSeo.title,
    description: defaultSeo.description,
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: defaultSeo.siteName,
    url: siteUrl,
    description: defaultSeo.description,
    inLanguage: 'fr-FR',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alexis',
    url: siteUrl,
    jobTitle: 'Product Builder & Tester',
    description:
      "Création d'applications web, de logiciels sur mesure, d'automatisations et de produits digitaux avec une approche produit, IA et QA.",
    sameAs: ['https://github.com/Alek6-dev'],
  },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-canvas font-sans text-copy antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <ContactChatLauncher />
      </body>
    </html>
  )
}
