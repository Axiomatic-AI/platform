import React from 'react'
import '@styles/globals.css'
import { ThemeProvider } from 'next-themes'
import Layout from '@components/Layout'
import type { AppProps } from 'next/app'

function Application({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default Application 