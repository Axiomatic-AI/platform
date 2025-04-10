import LZString from 'lz-string';

export function compressImages(images: Record<string, string>): Record<string, string> {
  const compressedImages: Record<string, string> = {};
  for (const [key, value] of Object.entries(images)) {
    compressedImages[key] = LZString.compressToBase64(value);
  }
  return compressedImages;
}

export function decompressImages(compressedImages: Record<string, string>): Record<string, string> {
  const decompressedImages: Record<string, string> = {};
  for (const [key, value] of Object.entries(compressedImages)) {
    decompressedImages[key] = LZString.decompressFromBase64(value) || '';
  }
  return decompressedImages;
} 