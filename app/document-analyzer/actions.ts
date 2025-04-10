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
  images: Record<string, string>
  interlineEquations: string[]
  inlineEquations: string[]
}) {
  try {
    const session = await auth0.getSession()
    if (!session?.user?.sub) throw new Error('Unauthorized')

    return await prisma.document.create({
      data: {
        userId: session.user.sub,
        title,
        markdown,
        images,
        interlineEquations,
        inlineEquations,
      },
    })
  } catch (error) {
    console.error('Error creating document:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to create document: ${error.message}`)
    }
    throw new Error('Failed to create document: Unknown error')
  }
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

export async function deleteAllDocuments() {
  try {
    const session = await auth0.getSession()
    if (!session?.user?.sub) throw new Error('Unauthorized')

    return await prisma.document.deleteMany({
      where: {
        userId: session.user.sub,
      },
    })
  } catch (error) {
    console.error('Error deleting all documents:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to delete all documents: ${error.message}`)
    }
    throw new Error('Failed to delete all documents: Unknown error')
  }
} 