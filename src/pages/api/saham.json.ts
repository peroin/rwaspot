import type { APIRoute } from 'astro';
import yahooFinance from 'yahoo-finance2';

export const GET: APIRoute = async ({ locals }) => {
  // 1. Ambil binding KV dari Cloudflare Pages
  // Pastikan Anda sudah membuat binding dengan nama STOCK_CACHE di dashboard
  const { STOCK_CACHE } = locals.runtime.env;
  const cacheKey = "harga_saham_rwa";

  try {
    // 2. Coba ambil dari Cache (KV)
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

    // 3. Jika cache kosong, ambil data dari Yahoo Finance
    // Ganti 'AAPL' dengan simbol saham yang Anda butuhkan
    const query = 'AAPL'; 
    const result = await yahooFinance.quote(query);

    // 4. Simpan ke KV dengan TTL 5 jam (18000 detik)
    await STOCK_CACHE.put(cacheKey, JSON.stringify(result), { expirationTtl: 18000 });

    return new Response(JSON.stringify({ 
      data: result, 
      source: 'live-api' 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Error fetching stock data:", error);
    return new Response(JSON.stringify({ 
      error: "Gagal mengambil data saham",
      details: error instanceof Error ? error.message : "Unknown error"
    }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};