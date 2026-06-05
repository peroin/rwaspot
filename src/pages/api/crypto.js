export async function GET(context) {
  const CACHE_KEY = "crypto_market_data";
  const STOCK_CACHE = context.locals?.runtime?.env?.STOCK_CACHE;

  // 1. Cek Cache (TTL 15 Menit)
  if (STOCK_CACHE) {
    const cachedData = await STOCK_CACHE.get(CACHE_KEY, { type: 'json' });
    if (cachedData) {
      return new Response(JSON.stringify({ data: cachedData, source: 'cache' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  try {
    // 2. Fetch 20 Data Crypto dari CoinGecko
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=idr&order=market_cap_desc&per_page=20&sparkline=false');
    const data = await res.json();

    const results = data.map(coin => ({
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      price: coin.current_price,
      change: coin.price_change_percentage_24h
    }));

    // 3. Simpan ke Cache (900 detik = 15 menit)
    if (STOCK_CACHE) {
      await STOCK_CACHE.put(CACHE_KEY, JSON.stringify(results), { expirationTtl: 900 });
    }

    return new Response(JSON.stringify({ data: results, source: 'live-api' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}