// src/lib/sanity.ts
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: '1dgx0sfa', // Dapatkan dari dashboard Sanity
  dataset: 'production',
  apiVersion: '2025-05-22', // Gunakan tanggal hari ini
  useCdn: false, // Set 'true' untuk produksi
});