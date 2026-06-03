import yahooFinance from 'yahoo-finance2';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 7200 }); // TTL 2 jam (7200 detik)

export async function GET() {
  const CACHE_KEY = "stocks_data";
  const cachedData = cache.get(CACHE_KEY);

  if (cachedData) return Response.json(cachedData);

  try {
    // Daftar saham (contoh IDX)
    const symbols = ['BBCA.JK', 'TLKM.JK', 'GOTO.JK', 'BBRI.JK'];
    const results = await Promise.all(symbols.map(s => yahooFinance.quote(s)));
    
    const data = results.map(r => ({
      symbol: r.symbol.replace('.JK', ''),
      name: r.shortName,
      price: r.regularMarketPrice,
      change: r.regularMarketChangePercent
    }));

    cache.set(CACHE_KEY, data);
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Failed to fetch" }, { status: 500 });
  }
}