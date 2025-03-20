import '@styles/globals.css'
import { ThemeProvider } from 'next-themes'
import Layout from '@components/Layout'
import { Metadata } from 'next'
import AuthProvider from '@components/AuthProvider'
import { Providers } from './pic-designer/providers'

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
        <AuthProvider>
          <ThemeProvider attribute="class">
            <Providers>
              <Layout>
                {children} 
              </Layout>
            </Providers>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
} 