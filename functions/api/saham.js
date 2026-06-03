export async function onRequest(context) {
  // context.env akan otomatis berisi variabel yang Anda simpan di Dashboard
  const { STOCK_CACHE, FINNHUB_API_KEY } = context.env;
  const cacheKey = "harga_saham_rwa";

  try {
    // 1. Cek cache
    const cachedData = await STOCK_CACHE.get(cacheKey, { type: 'json' });
    if (cachedData) {
      return new Response(JSON.stringify({ data: cachedData, source: 'cache' }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // 2. Fetch data menggunakan API Key dari env
    const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=AAPL&token=${FINNHUB_API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`Finnhub API error: ${response.status}`);
    }

    const result = await response.json();

    // 3. Simpan ke cache
    await STOCK_CACHE.put(cacheKey, JSON.stringify(result), { expirationTtl: 3600 });

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