import '@styles/globals.css'
import { ThemeProvider } from 'next-themes'
import Layout from '@components/layout'
import { Metadata } from 'next'
import AuthProvider from '@components/AuthProvider'
import AuthNav from '@components/AuthNav'

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
            <Layout>
              <div className="fixed top-4 right-4 z-50">
                <AuthNav />
              </div>
              {children}
            </Layout>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
} 