// src/pages/api/saham.ts
import type { APIRoute } from 'astro';
import yahooFinance from 'yahoo-finance2';

export const GET: APIRoute = async ({ locals }) => {
  // Pastikan lingkungan runtime tersedia
  const env = locals.runtime?.env;
  
  if (!env || !env.STOCK_CACHE) {
    return new Response(JSON.stringify({ error: "KV Namespace binding 'STOCK_CACHE' not configured." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  const { STOCK_CACHE } = env;
  const cacheKey = "harga_saham_rwa";

  try {
    // 1. Coba ambil dari Cache (KV)
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

    // 2. Jika cache kosong, ambil data dari Yahoo Finance
    const query = 'AAPL'; 
    const result = await yahooFinance.quote(query);

    // 3. Simpan ke KV dengan TTL 5 jam (18000 detik)
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