import { useState, useEffect } from 'react';

export default function CryptoTable({ value }) {
  const [coinsData, setCoinsData] = useState([]);
  const coins = value?.coins || [];

  useEffect(() => {
    if (coins.length === 0) return;
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins.join(',')}&sparkline=true&price_change_percentage=24h`)
      .then(res => res.json())
      .then(data => setCoinsData(data))
      .catch(err => console.error("Error:", err));
  }, [coins.join(',')]);

  const renderSparkline = (prices, isPositive) => {
    if (!prices) return null;
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const width = 50; 
    const height = 16;
    const points = prices.map((p, i) => `${(i / (prices.length - 1)) * width},${height - ((p - min) / (max - min)) * height}`).join(' ');

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline fill="none" stroke={isPositive ? '#16a34a' : '#dc2626'} strokeWidth="1" points={points} />
      </svg>
    );
  };

  return (
    <div className="my-6 w-full border border-gray-100 rounded-lg shadow-sm bg-white overflow-hidden">
      <div className="px-3 py-2 border-b border-gray-50 bg-gray-50/30">
        <h3 className="font-bold text-gray-600 text-[10px] uppercase tracking-widest">{value.title || "Market Update"}</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-[11px]">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-3 py-2 font-bold text-gray-400 uppercase">Aset</th>
              <th className="px-2 py-2 text-right font-bold text-gray-400 uppercase">Harga</th>
              <th className="px-2 py-2 text-right font-bold text-gray-400 uppercase">24h</th>
              <th className="hidden sm:table-cell px-2 py-2 text-right font-bold text-gray-400 uppercase">Cap</th>
              <th className="px-3 py-2 text-right font-bold text-gray-400 uppercase">Tren</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {coinsData.map(coin => {
              const isPos = coin.price_change_percentage_24h >= 0;
              return (
                <tr key={coin.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-3 py-2.5 font-bold text-gray-900 whitespace-nowrap">
                    {coin.symbol.toUpperCase()}
                  </td>
                  
                  <td className="px-2 py-2.5 text-right font-mono text-gray-600">
                    ${coin.current_price.toLocaleString(undefined, {minimumFractionDigits: 2})}
                  </td>
                  
                  <td className={`px-2 py-2.5 text-right font-bold ${isPos ? 'text-green-600' : 'text-red-600'}`}>
                    {coin.price_change_percentage_24h?.toFixed(1)}%
                  </td>
                  
                  <td className="hidden sm:table-cell px-2 py-2.5 text-right text-gray-400">
                    ${(coin.market_cap / 1_000_000_000).toFixed(0)}B
                  </td>
                  
                  <td className="px-3 py-2.5 flex justify-end">
                    {renderSparkline(coin.sparkline_in_7d.price, isPos)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}