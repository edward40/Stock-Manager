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
    Get list of market movers (mock implementation for now as yfinance doesn't provide easy list).
    In a real app, this would scrape a news site or use a specific API.
    """
    # This is a placeholder. Real implementation would require a different source.
    return []
