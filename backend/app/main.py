```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.data import get_stock_data, get_market_movers, get_sp500_data
from app.analysis import calculate_technical_indicators
import os

app = FastAPI()

# Configure CORS - support both development and production
origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,https://stock-manager-liard.vercel.app").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Stock Professional Analysis API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/api/stock/{symbol}")
def read_stock(symbol: str):
    data = get_stock_data(symbol)
    if "error" in data:
        raise HTTPException(status_code=404, detail=data["error"])
    return data

@app.get("/api/market-movers")
def read_market_movers():
    return get_market_movers()

@app.get("/api/sp500")
def read_sp500():
    return get_sp500_data()

@app.get("/api/analyze/{symbol}")
def analyze_stock(symbol: str):
    # Get 1 year of data for analysis
    data = get_stock_data(symbol, period="2y")
    if "error" in data:
        raise HTTPException(status_code=404, detail=data["error"])
    
    analysis = calculate_technical_indicators(data["history"])
    return {
        "symbol": symbol,
        "analysis": analysis
    }
