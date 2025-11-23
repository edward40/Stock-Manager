import pandas as pd
import numpy as np
from typing import Dict, Any

def calculate_technical_indicators(history_data: list) -> Dict[str, Any]:
    """
    Calculate technical indicators (SMA, RSI, MACD) from historical data.
    """
    if not history_data:
        return {}
        
    df = pd.DataFrame(history_data)
    df['price'] = pd.to_numeric(df['price'])
    
    # Simple Moving Averages
    df['SMA_20'] = df['price'].rolling(window=20).mean()
    df['SMA_50'] = df['price'].rolling(window=50).mean()
    df['SMA_200'] = df['price'].rolling(window=200).mean()
    
    # RSI (Relative Strength Index)
    delta = df['price'].diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
    rs = gain / loss
    df['RSI'] = 100 - (100 / (1 + rs))
    
    # MACD
    exp1 = df['price'].ewm(span=12, adjust=False).mean()
    exp2 = df['price'].ewm(span=26, adjust=False).mean()
    df['MACD'] = exp1 - exp2
    df['Signal_Line'] = df['MACD'].ewm(span=9, adjust=False).mean()
    
    # Get latest values
    latest = df.iloc[-1]
    
    analysis = {
        "SMA_20": latest['SMA_20'] if not pd.isna(latest['SMA_20']) else None,
        "SMA_50": latest['SMA_50'] if not pd.isna(latest['SMA_50']) else None,
        "SMA_200": latest['SMA_200'] if not pd.isna(latest['SMA_200']) else None,
        "RSI": latest['RSI'] if not pd.isna(latest['RSI']) else None,
        "MACD": latest['MACD'] if not pd.isna(latest['MACD']) else None,
        "Signal_Line": latest['Signal_Line'] if not pd.isna(latest['Signal_Line']) else None,
    }
    
    # Simple Valuation / Signal
    signal = "HOLD"
    score = 0
    
    if analysis['RSI']:
        if analysis['RSI'] < 30: score += 1 # Oversold
        elif analysis['RSI'] > 70: score -= 1 # Overbought
        
    if analysis['MACD'] and analysis['Signal_Line']:
        if analysis['MACD'] > analysis['Signal_Line']: score += 1 # Bullish crossover
        elif analysis['MACD'] < analysis['Signal_Line']: score -= 1 # Bearish crossover
        
    if analysis['SMA_50'] and analysis['SMA_200']:
        if analysis['SMA_50'] > analysis['SMA_200']: score += 1 # Golden Cross
        elif analysis['SMA_50'] < analysis['SMA_200']: score -= 1 # Death Cross

    if score >= 2: signal = "BUY"
    elif score <= -2: signal = "SELL"
    
    return {
        "indicators": analysis,
        "signal": signal,
        "score": score
    }
