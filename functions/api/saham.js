export async function onRequest(context) {
  const { env } = context;
  const { STOCK_CACHE } = env;
  const cacheKey = "harga_saham_rwa";

  try {
    // 1. Cek cache
    const cachedData = await STOCK_CACHE.get(cacheKey, { type: 'json' });
    if (cachedData) {
      return new Response(JSON.stringify({ data: cachedData, source: 'cache' }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // 2. Fetch dengan User-Agent agar tidak diblokir
    const response = await fetch('https://query1.finance.yahoo.com/v7/finance/quote?symbols=AAPL', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Yahoo API error: ${response.status}`);
    }

    const result = await response.json();

    // 3. Simpan ke cache
    await STOCK_CACHE.put(cacheKey, JSON.stringify(result), { expirationTtl: 18000 });

    return new Response(JSON.stringify({ data: result, source: 'live-api' }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}