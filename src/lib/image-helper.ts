// src/lib/image-helper.ts
export function getOptimizedImageUrl(url: string, width = 600, height = 400) {
  if (!url) return '';
  return `${url}?w=${width}&h=${height}&fit=crop&auto=format&q=80`;
}