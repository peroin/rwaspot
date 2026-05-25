// src/lib/sanity.ts
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: '1dgx0sfa',
  dataset: 'production',
  apiVersion: '2025-05-22',
  useCdn: true, // Gunakan true untuk kecepatan akses global
});