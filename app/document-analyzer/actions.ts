'use server'

import { prisma } from '@lib/prisma'
import { auth0 } from '@lib/auth0'
import { calculateDocumentSize, validateDocumentSize, compressImage, decompressImage } from './utils'

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

    if (!title || !markdown) {
      throw new Error('Title and markdown are required')
    }

    if (!images || typeof images !== 'object') {
      images = {}
    }

    const validatedInterlineEquations = Array.isArray(interlineEquations) ? interlineEquations : []
    const validatedInlineEquations = Array.isArray(inlineEquations) ? inlineEquations : []

    // Compress all images
    const compressedImages: Record<string, string> = {}
    for (const [key, value] of Object.entries(images)) {
      if (value) {
        compressedImages[key] = await compressImage(value)
      }
    }

    const totalSize = calculateDocumentSize({
      markdown,
      images: compressedImages,
      interlineEquations: validatedInterlineEquations,
      inlineEquations: validatedInlineEquations,
    })
    validateDocumentSize(totalSize)

    return await prisma.document.create({
      data: {
        userId: session.user.sub,
        title,
        markdown,
        images: compressedImages,
        interlineEquations: validatedInterlineEquations,
        inlineEquations: validatedInlineEquations,
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
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getDocument(id: string) {
  const session = await auth0.getSession()
  if (!session?.user?.sub) throw new Error('Unauthorized')

  const document = await prisma.document.findFirst({
    where: {
      id,
      userId: session.user.sub,
    },
  })

  if (!document) {
    return null
  }

  // Decompress all images
  const decompressedImages: Record<string, string> = {}
  const images = document.images as Record<string, string>
  for (const [key, value] of Object.entries(images)) {
    if (value && typeof value === 'string') {
      decompressedImages[key] = await decompressImage(value)
    }
  }

  return {
    ...document,
    images: decompressedImages,
  }
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