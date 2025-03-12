import '@styles/globals.css'
import { ThemeProvider } from 'next-themes'
import Layout from '@components/Layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Axiomatic Platform',
  description: 'Axiomatic Platform - Your Development Hub',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <Layout>
            {children}
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  )
} 