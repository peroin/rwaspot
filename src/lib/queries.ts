// src/lib/queries.ts

// Hapus import dari 'astro/content' karena itu penyebab errornya
export const allPostsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  "imageUrl": image.asset->url
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  body,
  "imageUrl": image.asset->url
}`;