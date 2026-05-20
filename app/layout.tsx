import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'OZMO Innovations | Engineering Digital Excellence',
  description: 'We build powerful websites, scalable applications, and AI-driven solutions. Premium technology partner for your digital transformation.',
  keywords: ['web development', 'app development', 'AI solutions', 'digital marketing', 'technology', 'innovation'],
  authors: [{ name: 'OZMO Innovations' }],
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-48.png', type: 'image/png', sizes: '48x48' },
    ],
    shortcut: '/favicon.png',
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'OZMO Innovations | Engineering Digital Excellence',
    description: 'We build powerful websites, scalable applications, and AI-driven solutions.',
    type: 'website',
    images: [{ url: '/logo.png', width: 1500, height: 1500, alt: 'OZMO Innovations' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
