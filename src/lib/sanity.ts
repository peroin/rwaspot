// src/lib/sanity.ts
import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url'; // Gunakan named export ini

export const client = createClient({
  projectId: '1dgx0sfa',
  dataset: 'production',
  apiVersion: '2025-05-22',
  useCdn: true,
});

// Gunakan createImageUrlBuilder yang baru
const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}