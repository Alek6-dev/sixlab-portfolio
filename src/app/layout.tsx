import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactChatLauncher from '@/components/ContactChatLauncher'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Alek - Product Builder & Tester',
  description:
    'Portfolio : apps, SaaS, outils internes, workflows, tests et amélioration produit.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-canvas font-sans text-copy antialiased">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <ContactChatLauncher />
      </body>
    </html>
  )
}
