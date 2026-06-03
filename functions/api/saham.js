export async function onRequest(context) {
  const { env } = context;
  const { STOCK_CACHE } = env;
  const cacheKey = "harga_saham_rwa";

  try {
    // Cek cache
    const cachedData = await STOCK_CACHE.get(cacheKey, { type: 'json' });
    if (cachedData) {
      return new Response(JSON.stringify({ data: cachedData, source: 'cache' }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // Karena di dalam folder /functions, kita tidak bisa langsung import library besar seperti yahoo-finance2
    // karena batasan ukuran file worker.
    // SARAN: Gunakan fetch biasa ke API Yahoo Finance untuk menghindari error "script too large"
    const response = await fetch('https://query1.finance.yahoo.com/v7/finance/quote?symbols=AAPL');
    const result = await response.json();

    await STOCK_CACHE.put(cacheKey, JSON.stringify(result), { expirationTtl: 18000 });

    return new Response(JSON.stringify({ data: result, source: 'live-api' }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}