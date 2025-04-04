'use server'

import { prisma } from '@lib/prisma'
import { auth0 } from '@lib/auth0'

export async function createDocument({
  title,
  markdown,
  images,
  interlineEquations,
  inlineEquations,
}: {
  title: string
  markdown: string
  images: string[]
  interlineEquations: string[]
  inlineEquations: string[]
}) {
  const session = await auth0.getSession()
  if (!session?.user?.sub) throw new Error('Unauthorized')

  return prisma.document.create({
    data: {
      userId: session.user.sub,
      title,
      markdown,
      images,
      interlineEquations,
      inlineEquations,
    },
  })
}

export async function getDocuments() {
  const session = await auth0.getSession()
  if (!session?.user?.sub) throw new Error('Unauthorized')

  return prisma.document.findMany({
    where: {
      userId: session.user.sub,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getDocument(id: string) {
  const session = await auth0.getSession()
  if (!session?.user?.sub) throw new Error('Unauthorized')

  return prisma.document.findFirst({
    where: {
      id,
      userId: session.user.sub,
    },
  })
} 