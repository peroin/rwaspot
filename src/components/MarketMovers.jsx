import { useState } from 'react';

export default function MarketMovers({ initialActiveData, initialGainers, initialLosers }) {
  const [activeTab, setActiveTab] = useState('aktif');

  // Mengambil data yang relevan berdasarkan tab
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
        {data.map((item) => (
          <div key={item.symbol} className="px-4 py-3 flex justify-between items-center hover:bg-gray-50/50 transition-colors">
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-gray-900">{item.symbol}</span>
              <span className="text-[10px] text-gray-400 truncate max-w-[140px]">{item.name}</span>
            </div>
            <div className="text-right">
              <div className="text-[13px] font-mono font-medium text-gray-900">
                Rp{item.price.toLocaleString('id-ID', { minimumFractionDigits: 2 })}
              </div>
              <div className={`text-[11px] font-bold ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {item.change >= 0 ? '▲' : '▼'} {Math.abs(item.change).toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}