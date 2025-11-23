"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import StockCard from '@/components/StockCard';
import NewsCard from '@/components/NewsCard';
import Chart from '@/components/Chart';
import { Search, TrendingUp, Zap, Globe, Activity, Loader2 } from 'lucide-react';

// API URL configuration - uses environment variable in production, localhost in development
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Home() {
  const [searchSymbol, setSearchSymbol] = useState('');
  const [stockData, setStockData] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchSymbol.trim()) return;

    setLoading(true);
    setError('');

    try {
      // Fetch stock data
      const stockResponse = await fetch(`${API_URL}/api/stock/${searchSymbol}`);
      if (!stockResponse.ok) throw new Error('Stock not found');
      const stockJson = await stockResponse.json();
      setStockData(stockJson);

      // Fetch analysis
      const analysisResponse = await fetch(`${API_URL}/api/analyze/${searchSymbol}`);
      if (!analysisResponse.ok) throw new Error('Analysis failed');
      const analysisJson = await analysisResponse.json();
      setAnalysis(analysisJson);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
      setStockData(null);
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for display
  const marketMovers = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 189.45, change: 2.34, changePercent: 1.25, recommendation: 'BUY' as const },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: 245.67, change: -5.12, changePercent: -2.04, recommendation: 'HOLD' as const },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 485.09, change: 12.45, changePercent: 2.63, recommendation: 'BUY' as const },
    { symbol: 'AMD', name: 'Adv. Micro Devices', price: 138.00, change: 4.50, changePercent: 3.37, recommendation: 'BUY' as const },
  ];

  return (
    <div className="min-h-screen bg-[url('/grid.svg')] bg-fixed">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/20 blur-[100px] rounded-full -z-10" />
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
            Professional Stock Analysis
          </h1>
          <p className="text-neutral-400 text-lg mb-8 max-w-2xl mx-auto">
            Advanced technical indicators, real-time market data, and AI-powered valuation models to guide your investment decisions.
          </p>

          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center bg-neutral-900 border border-white/10 rounded-xl p-2">
              <Search className="w-6 h-6 text-neutral-400 ml-3" />
              <input
                type="text"
                placeholder="Search symbol (e.g., AAPL, 2330.TW)..."
                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-neutral-500 text-lg px-4 outline-none"
                value={searchSymbol}
                onChange={(e) => setSearchSymbol(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Analyze
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 text-rose-400 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Search Results */}
        {stockData && analysis && (
          <div className="mb-12 glass-panel p-8 rounded-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{stockData.name}</h2>
                  <p className="text-neutral-400">{stockData.symbol}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="glass-panel p-4 rounded-lg">
                    <p className="text-neutral-400 text-sm mb-1">Price</p>
                    <p className="text-2xl font-bold text-white">${stockData.current_price?.toFixed(2) || 'N/A'}</p>
                  </div>
                  <div className="glass-panel p-4 rounded-lg">
                    <p className="text-neutral-400 text-sm mb-1">Market Cap</p>
                    <p className="text-2xl font-bold text-white">{stockData.market_cap ? `$${(stockData.market_cap / 1e9).toFixed(2)}B` : 'N/A'}</p>
                  </div>
                  <div className="glass-panel p-4 rounded-lg">
                    <p className="text-neutral-400 text-sm mb-1">P/E Ratio</p>
                    <p className="text-2xl font-bold text-white">{stockData.pe_ratio?.toFixed(2) || 'N/A'}</p>
                  </div>
                  <div className="glass-panel p-4 rounded-lg">
                    <p className="text-neutral-400 text-sm mb-1">RSI</p>
                    <p className="text-2xl font-bold text-white">{analysis.analysis.indicators.RSI?.toFixed(2) || 'N/A'}</p>
                  </div>
                </div>

                {stockData.history && stockData.history.length > 0 && (
                  <div className="glass-panel p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-white mb-4">Price History</h3>
                    <Chart data={stockData.history.slice(-90)} />
                  </div>
                )}
              </div>

              <div>
                <div className={`glass-panel p-6 rounded-xl border-t-4 mb-6 ${analysis.analysis.signal === 'BUY' ? 'border-t-emerald-500' :
                  analysis.analysis.signal === 'SELL' ? 'border-t-rose-500' :
                    'border-t-yellow-500'
                  }`}>
                  <h3 className="text-lg font-bold text-white mb-4">Recommendation</h3>
                  <div className={`text-4xl font-bold mb-2 ${analysis.analysis.signal === 'BUY' ? 'text-emerald-400' :
                    analysis.analysis.signal === 'SELL' ? 'text-rose-400' :
                      'text-yellow-400'
                    }`}>
                    {analysis.analysis.signal}
                  </div>
                  <p className="text-neutral-400 text-sm">Score: {analysis.analysis.score}</p>
                </div>

                <div className="glass-panel p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-white mb-4">Technical Indicators</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-neutral-400 text-sm">SMA 20</p>
                      <p className="text-white font-medium">{analysis.analysis.indicators.SMA_20?.toFixed(2) || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-neutral-400 text-sm">SMA 50</p>
                      <p className="text-white font-medium">{analysis.analysis.indicators.SMA_50?.toFixed(2) || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-neutral-400 text-sm">MACD</p>
                      <p className="text-white font-medium">{analysis.analysis.indicators.MACD?.toFixed(2) || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Market Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                <h2 className="text-xl font-bold text-white">Market Movers</h2>
              </div>
              <button className="text-sm text-emerald-500 hover:text-emerald-400 font-medium">View All</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {marketMovers.map((stock) => (
                <StockCard key={stock.symbol} {...stock} />
              ))}
            </div>

            <div className="glass-panel p-6 rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">S&P 500 Performance</h3>
                <div className="flex gap-2">
                  {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((period) => (
                    <button key={period} className="px-3 py-1 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors">
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <Chart data={[
                { date: 'Jan', price: 4000 },
                { date: 'Feb', price: 4100 },
                { date: 'Mar', price: 4050 },
                { date: 'Apr', price: 4200 },
                { date: 'May', price: 4150 },
                { date: 'Jun', price: 4300 },
                { date: 'Jul', price: 4400 },
              ]} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <h2 className="text-xl font-bold text-white">Latest News</h2>
              </div>
            </div>

            <div className="space-y-4">
              <NewsCard
                title="Fed Signals Potential Rate Cuts in Late 2024"
                source="Bloomberg"
                time="2h ago"
                summary="Federal Reserve officials indicated that inflation data is moving in the right direction, suggesting potential rate cuts later this year."
                url="#"
                sentiment="POSITIVE"
              />
              <NewsCard
                title="Tech Stocks Rally Ahead of Earnings Season"
                source="Reuters"
                time="4h ago"
                summary="Major technology companies see stock price increases as investors anticipate strong quarterly earnings reports."
                url="#"
                sentiment="POSITIVE"
              />
              <NewsCard
                title="Oil Prices Surge Amid Geopolitical Tensions"
                source="CNBC"
                time="5h ago"
                summary="Crude oil futures rose sharply today following new developments in the Middle East, raising concerns about supply chains."
                url="#"
                sentiment="NEGATIVE"
              />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="glass-panel p-6 rounded-xl border-t-4 border-t-emerald-500">
            <div className="bg-emerald-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Real-time Analysis</h3>
            <p className="text-neutral-400 text-sm">Instant technical analysis using moving averages, RSI, MACD, and Bollinger Bands.</p>
          </div>

          <div className="glass-panel p-6 rounded-xl border-t-4 border-t-blue-500">
            <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Global Coverage</h3>
            <p className="text-neutral-400 text-sm">Support for US Stocks (NYSE, NASDAQ) and Taiwan Stock Exchange (TWSE).</p>
          </div>

          <div className="glass-panel p-6 rounded-xl border-t-4 border-t-purple-500">
            <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Smart Valuation</h3>
            <p className="text-neutral-400 text-sm">AI-driven buy/sell signals based on multi-factor analysis and historical data.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
