import { TickerTape } from "react-ts-tradingview-widgets";

export default function TickerMobile() {
  return (
    <div className="lg:hidden w-full mb-6">
      <TickerTape 
        symbols={[
          { proName: "IDX:COMPOSITE", title: "IHSG" },
          { proName: "SPX", title: "S&P 500" },
          { proName: "BINANCE:BTCUSDT", title: "BTC" }
        ]} 
        colorTheme="light" 
      />
    </div>
  );
}