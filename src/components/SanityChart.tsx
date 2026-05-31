// src/components/SanityChart.tsx
import { AdvancedRealTimeChart, SymbolInfo } from "react-ts-tradingview-widgets";

interface SanityChartProps {
  value: {
    chartType: 'preset' | 'manual';
    presetSymbol?: string;
    manualSymbol?: string;
    comparisonSymbol?: string;
    height?: number;
    theme?: 'light' | 'dark';
    showPriceSummary?: boolean; // Fitur baru
  };
}

const SanityChart = ({ value }: SanityChartProps) => {
  const symbol = value.chartType === 'preset' ? value.presetSymbol : value.manualSymbol;

  if (!symbol) {
    return (
      <div style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center', color: '#666' }}>
        Konfigurasi Chart belum lengkap.
      </div>
    );
  }

  return (
    <div className="stock-chart-wrapper" style={{ margin: "2rem 0" }}>
      
      {/* Fitur Ringkasan Harga (Google Finance Style) */}
      {value.showPriceSummary && (
        <div style={{ marginBottom: '10px' }}>
          <SymbolInfo 
            symbol={symbol} 
            locale="id" 
            colorTheme={value.theme || 'light'} 
            isTransparent={true}
          />
        </div>
      )}

      {/* Container Chart Utama */}
      <div 
        style={{ 
          height: `${value.height || 500}px`, 
          width: "100%", 
          borderRadius: "12px", 
          overflow: "hidden" 
        }}
      >
        <AdvancedRealTimeChart 
          key={symbol}
          symbol={symbol} 
          theme={value.theme || 'light'}
          autosize
          timezone="Asia/Jakarta"
          container_id="tradingview_chart" 
          hide_side_toolbar={false}
          allow_symbol_change={true}
          studies={value.comparisonSymbol ? [
            {
              id: "Overlay@tv-basicstudies",
              inputs: { symbol: value.comparisonSymbol }
            }
          ] : []}
        />
      </div>
    </div>
  );
};

export default SanityChart;