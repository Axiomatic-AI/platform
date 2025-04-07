export const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024 // 10 MiB in bytes

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