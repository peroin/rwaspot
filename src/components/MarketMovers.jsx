import { useState } from 'react';

export default function MarketMovers({ initialActiveData = [], initialGainers = [], initialLosers = [] }) {
  const [activeTab, setActiveTab] = useState('aktif');

  // Kurs konversi (bisa disesuaikan dengan kurs real-time)
  const USD_TO_IDR = 15500;

  const data = activeTab === 'aktif' ? initialActiveData : 
               activeTab === 'naik' ? initialGainers : initialLosers;

  const tabs = [
    { id: 'aktif', label: 'Aktif' },
    { id: 'naik', label: 'Naik' },
    { id: 'turun', label: 'Turun' }
  ];

  return (
    <div className="w-full max-w-sm bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden font-sans">
      {/* Header Tab */}
      <div className="flex border-b border-gray-50">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors ${
              activeTab === tab.id 
              ? 'text-gray-900 border-b-2 border-gray-900 bg-gray-50/50' 
              : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Konten Data */}
      <div className="divide-y divide-gray-50">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item) => {
            const rawPrice = item.price ?? item.current_price ?? 0;
            const change = item.change ?? item.price_change_percentage_24h ?? 0;
            const symbol = (item.symbol ?? item.id ?? 'N/A').toUpperCase();
            const name = item.name ?? 'Unknown Asset';

            // Jika harga masih terlalu kecil (seperti harga USD), kita kalikan dengan kurs
            // Logika: Jika harga < 1000, asumsikan itu USD dan konversi ke IDR
            const finalPrice = rawPrice < 1000 ? rawPrice * USD_TO_IDR : rawPrice;

            return (
              <div key={item.symbol || item.id} className="px-4 py-3 flex justify-between items-center hover:bg-gray-50/50 transition-colors">
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-gray-900">{symbol}</span>
                  <span className="text-[10px] text-gray-400 truncate max-w-[140px]">{name}</span>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-mono font-medium text-gray-900">
                    Rp{finalPrice.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                  <div className={`text-[11px] font-bold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="px-4 py-6 text-center text-gray-400 text-xs">
            Data tidak tersedia
          </div>
        )}
      </div>
    </div>
  );
}