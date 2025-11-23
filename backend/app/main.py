from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.data import get_stock_data
from app.analysis import calculate_technical_indicators

app = FastAPI(title="Stock Professional Analysis API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
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
def stock_data(symbol: str, period: str = "1y"):
    data = get_stock_data(symbol, period)
    if "error" in data:
        raise HTTPException(status_code=404, detail=data["error"])
    return data

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
