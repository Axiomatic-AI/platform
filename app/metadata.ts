import { Metadata } from 'next'

export const defaultMetadata: Metadata = {
  title: {
    default: 'Axiomatic Platform',
    template: '%s | Axiomatic Platform',
  },
  description: 'A modern platform for managing your projects and analytics',
  icons: {
    icon: '/favicon.svg',
  },
} 