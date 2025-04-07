import LZString from 'lz-string'

export const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024 // 10 MiB in bytes
export const MAX_IMAGE_SIZE = 1024 // Maximum width/height for compressed images
export const IMAGE_QUALITY = 80 // JPEG quality (0-100)

export async function compressImage(base64Image: string): Promise<string> {
  try {
    // Compress the base64 string using LZString
    return LZString.compressToBase64(base64Image)
  } catch (error) {
    console.error('Error compressing image:', error)
    throw new Error('Failed to compress image')
  }
}

export async function decompressImage(compressedImage: string): Promise<string> {
  try {
    // Decompress the base64 string using LZString
    return LZString.decompressFromBase64(compressedImage)
  } catch (error) {
    console.error('Error decompressing image:', error)
    throw new Error('Failed to decompress image')
  }
}

export function calculateDocumentSize({
  markdown,
  images,
  interlineEquations,
  inlineEquations,
}: {
  markdown: string
  images: Record<string, string>
  interlineEquations: string[]
  inlineEquations: string[]
}): number {
  const calculateSize = (data: any): number => {
    if (typeof data === 'string') {
      return new TextEncoder().encode(data).length
    } else if (typeof data === 'object') {
      return new TextEncoder().encode(JSON.stringify(data)).length
    }
    return 0
  }

  return (
    calculateSize(markdown) +
    calculateSize(images) +
    calculateSize(interlineEquations) +
    calculateSize(inlineEquations)
  )
}

export function validateDocumentSize(size: number): void {
  if (size > MAX_DOCUMENT_SIZE) {
    throw new Error(
      `Document size (${(size / (1024 * 1024)).toFixed(2)} MiB) exceeds the maximum allowed size of 10 MiB`
    )
  }
} 