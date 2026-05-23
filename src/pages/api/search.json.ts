// src/pages/api/search.json.ts
import { client } from '../../lib/sanity';

export async function GET({ url }: { url: URL }) {
  const q = url.searchParams.get('q');

  if (!q || q.length < 2) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    // Penjelasan Query:
    // authors[]->name: Melakukan dereference ke dokumen author 
    // dan mengambil field 'name' saja untuk setiap penulis.
    const posts = await client.fetch(
      `*[_type == "post" && title match $q && category in ["dunia", "crypto", "rwa"]] 
       | order(publishedAt desc)[0...5] {
         title, 
         "slug": slug.current,
         "authors": authors[]->name
       }`,
      { q: `${q}*` } 
    );

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60" 
      }
    });
  } catch (error) {
    console.error("Error fetching search results:", error);
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
}