// src/lib/sanity.ts
import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: '1dgx0sfa',
  dataset: 'production',
  apiVersion: '2025-05-22',
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  // .auto('format') akan otomatis mengubah file jadi WebP/AVIF
  return builder.image(source).auto('format');
}