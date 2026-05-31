// src/components/MarketOverview.jsx
import { MarketOverview } from "react-ts-tradingview-widgets";

export default function MarketOverviewWidget() {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4 px-2">Ringkasan Pasar</h3>
      <MarketOverview 
        colorTheme="light" 
        height={400} 
        width="100%"
        tabs={[
          {
            title: "Indo",
            symbols: [
              { s: "IDX:COMPOSITE", d: "IHSG" },
              { s: "IDX:BBCA", d: "BBCA" },
              { s: "IDX:BBRI", d: "BBRI" },
              { s: "IDX:TLKM", d: "TLKM" }
            ]
          },
          {
            title: "Global",
            symbols: [
              { s: "SPX", d: "S&P 500" },
              { s: "IXIC", d: "Nasdaq" },
              { s: "INDEX:NKY", d: "Nikkei 225" }
            ]
          }
        ]}
      />
    </div>
  );
}