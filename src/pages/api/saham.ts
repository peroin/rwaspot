import type { APIRoute } from 'astro';
import yahooFinance from 'yahoo-finance2';

// 1. PENTING: Mencegah Astro melakukan prerendering statis agar menjadi SSR (Server Side Rendering)
export const prerender = false;

// 2. Memberitahu Astro/Cloudflare bahwa ini berjalan di lingkungan Node.js
// Ini sangat penting karena library yahoo-finance2 memerlukan fitur Node.js
export const runtime = 'nodejs';

export const GET: APIRoute = async ({ locals }) => {
  // Mengakses binding KV (STOCK_CACHE) yang sudah Anda buat di dashboard Cloudflare
  // locals.runtime.env adalah cara standar mengakses binding di Cloudflare Pages
  const env = locals.runtime?.env;

  if (!env || !env.STOCK_CACHE) {
    return new Response(
      JSON.stringify({ 
        error: "Server Error: KV Binding 'STOCK_CACHE' tidak ditemukan di Cloudflare." 
      }), 
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  const { STOCK_CACHE } = env;
  const cacheKey = "harga_saham_rwa";

  try {
    // 3. Coba ambil data dari KV Cache (Kecepatan tinggi)
    const cachedData = await STOCK_CACHE.get(cacheKey, { type: 'json' });

    if (cachedData) {
      return new Response(JSON.stringify({ 
        data: cachedData, 
        source: 'cache' 
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 4. Jika cache kosong, ambil data dari API Yahoo Finance
    const result = await yahooFinance.quote('AAPL');

    // 5. Simpan ke KV dengan TTL 5 jam (18000 detik) agar tidak boros request API
    await STOCK_CACHE.put(cacheKey, JSON.stringify(result), { expirationTtl: 18000 });

    return new Response(JSON.stringify({ 
      data: result, 
      source: 'live-api' 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Yahoo Finance API Error:", error);
    return new Response(JSON.stringify({ 
      error: "Gagal mengambil data dari Yahoo Finance",
      details: error instanceof Error ? error.message : "Unknown error"
    }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};