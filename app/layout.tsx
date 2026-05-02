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
  openGraph: {
    title: 'OZMO Innovations | Engineering Digital Excellence',
    description: 'We build powerful websites, scalable applications, and AI-driven solutions.',
    type: 'website',
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
