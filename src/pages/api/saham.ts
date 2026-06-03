import type { APIRoute } from 'astro';
import yahooFinance from 'yahoo-finance2';

// 1. PENTING: Mencegah Astro melakukan prerendering statis
export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  // 2. Mengakses binding KV melalui runtime.env
  // Catatan: 'STOCK_CACHE' harus sesuai dengan nama yang Anda masukkan di Dashboard Cloudflare
  const env = locals.runtime?.env;

  if (!env || !env.STOCK_CACHE) {
    return new Response(
      JSON.stringify({ 
        error: "Server Error: KV Binding 'STOCK_CACHE' tidak terdeteksi oleh Cloudflare Pages." 
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
    // 3. Coba ambil data dari KV Cache
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

    // 5. Simpan ke KV dengan TTL 5 jam (18000 detik)
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