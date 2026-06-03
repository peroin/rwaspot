import type { APIRoute } from 'astro';
import yahooFinance from 'yahoo-finance2';

// Pastikan ini ada agar tidak ter-prerender statis
export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  // Ambil env dengan aman dari locals.runtime
  const env = locals.runtime?.env;

  if (!env || !env.STOCK_CACHE) {
    return new Response(JSON.stringify({ error: "KV Binding STOCK_CACHE tidak ditemukan" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  const { STOCK_CACHE } = env;
  const cacheKey = "harga_saham_rwa";

  try {
    const cachedData = await STOCK_CACHE.get(cacheKey, { type: 'json' });

    if (cachedData) {
      return new Response(JSON.stringify({ data: cachedData, source: 'cache' }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    const result = await yahooFinance.quote('AAPL');
    await STOCK_CACHE.put(cacheKey, JSON.stringify(result), { expirationTtl: 18000 });

    return new Response(JSON.stringify({ data: result, source: 'live-api' }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Gagal ambil data" }), { status: 500 });
  }
};