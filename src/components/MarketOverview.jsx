import { MarketOverview } from "react-ts-tradingview-widgets";

export default function MarketOverviewWidget() {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-2">
      <h3 className="text-lg font-bold text-gray-800 mb-4 px-2">Ringkasan Pasar</h3>
      <MarketOverview 
        colorTheme="light" 
        height={400} 
        width="100%"
        tabs={[
          {
            title: "Indonesia",
            symbols: [
              { s: "IDX:COMPOSITE", d: "IHSG" },
              { s: "IDX:BBCA", d: "BBCA" },
              { s: "IDX:BBRI", d: "BBRI" },
              { s: "IDX:TLKM", d: "TLKM" }
            ]
          },
          {
            title: "Global/US",
            symbols: [
            { s: "SPX", d: "S&P 500" },          // Simbol standar indeks S&P 500
            { s: "NDX", d: "Nasdaq 100" },       // Simbol standar Nasdaq 100
            { s: "DJI", d: "Dow Jones" },        // Simbol standar Dow Jones
            { s: "NKY", d: "Nikkei 225" }        // Simbol standar Nikkei
            ]
          },
          {
            title: "Crypto",
            symbols: [
              { s: "BINANCE:BTCUSDT", d: "Bitcoin" },
              { s: "BINANCE:ETHUSDT", d: "Ethereum" },
              { s: "BINANCE:SOLUSDT", d: "Solana" }
            ]
          }
        ]}
      />
    </div>
  );
}