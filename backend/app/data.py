import yfinance as yf
import pandas as pd
from typing import Dict, Any, Optional

def get_stock_data(symbol: str, period: str = "1y") -> Dict[str, Any]:
    """
    Fetch stock data from Yahoo Finance.
    """
    try:
        ticker = yf.Ticker(symbol)
        history = ticker.history(period=period)
        
        if history.empty:
            return {"error": "No data found for symbol"}
            
        info = ticker.info
        
        # Format historical data
        dates = history.index.strftime('%Y-%m-%d').tolist()
        prices = history['Close'].tolist()
        volumes = history['Volume'].tolist()
        
        chart_data = [{"date": d, "price": p, "volume": v} for d, p, v in zip(dates, prices, volumes)]
        
        return {
            "symbol": symbol,
            "name": info.get("longName", symbol),
            "current_price": info.get("currentPrice", prices[-1]),
            "market_cap": info.get("marketCap"),
            "pe_ratio": info.get("trailingPE"),
            "dividend_yield": info.get("dividendYield"),
            "history": chart_data
        }
    except Exception as e:
        return {"error": str(e)}

def get_market_movers() -> list:
    """
    Get list of market movers.
    Simulating 'movers' by fetching data for a list of popular active stocks
    and sorting by absolute percentage change.
    """
    tickers = ['NVDA', 'TSLA', 'AMD', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NFLX', 'INTC']
    movers = []
    
    try:
        # Batch fetch for efficiency
        data = yf.download(tickers, period="1d", group_by='ticker', progress=False)
        
        for ticker in tickers:
            try:
                # Handle multi-level column index from yfinance
                if len(tickers) > 1:
                    hist = data[ticker]
                else:
                    hist = data
                
                if not hist.empty and len(hist) > 0:
                    current_price = hist['Close'].iloc[-1]
                    open_price = hist['Open'].iloc[-1]
                    change = current_price - open_price
                    change_percent = (change / open_price) * 100
                    
                    movers.append({
                        "symbol": ticker,
                        "name": ticker, # yfinance download doesn't give names easily, using ticker as fallback
                        "price": float(current_price),
                        "change": float(change),
                        "changePercent": float(change_percent),
                        "recommendation": "BUY" if change_percent > 0 else "SELL" # Simple logic for demo
                    })
            except Exception:
                continue
                
        # Sort by absolute change percent to show most volatile
        movers.sort(key=lambda x: abs(x['changePercent']), reverse=True)
        return movers[:4] # Return top 4
    except Exception as e:
        print(f"Error fetching market movers: {e}")
        return []

def get_sp500_data() -> list:
    """
    Fetch S&P 500 (^GSPC) data for the last 3 months.
    """
    try:
        ticker = yf.Ticker("^GSPC")
        # Fetch 3 months of data as requested
        history = ticker.history(period="3mo")
        
        if history.empty:
            return []
            
        dates = history.index.strftime('%b %d').tolist()
        prices = history['Close'].tolist()
        
        # Downsample if too many points for the chart (optional, but good for UI)
        return [{"date": d, "price": p} for d, p in zip(dates, prices)]
    except Exception as e:
        print(f"Error fetching S&P 500 data: {e}")
        return []
