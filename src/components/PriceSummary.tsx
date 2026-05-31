import { SymbolInfo } from "react-ts-tradingview-widgets";

interface Props {
  symbol: string;
  theme?: 'light' | 'dark';
}

export default function PriceSummary({ symbol, theme = 'light' }: Props) {
  return (
    <div style={{ marginBottom: '-10px', marginTop: '10px' }}>
      <SymbolInfo 
        symbol={symbol} 
        locale="id" 
        colorTheme={theme} 
        isTransparent={true}
      />
    </div>
  );
}