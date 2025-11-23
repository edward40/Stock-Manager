# Stock Professional Analysis App - Deployment Guide

## Prerequisites
- Python 3.9+
- Node.js 18+
- Git

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/edward40/Stock-Manager.git
cd Stock-Manager
```

### 2. Backend Setup

#### Create Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### Install Dependencies
```bash
pip install -r backend/requirements.txt
```

#### Start Backend Server
```bash
uvicorn backend.app.main:app --reload
```

The backend API will be available at **http://localhost:8000**

### 3. Frontend Setup

#### Install Dependencies
```bash
cd frontend
npm install
```

> **Note**: If `npm install` hangs, try:
> ```bash
> npm install --legacy-peer-deps
> ```

#### Start Development Server
```bash
npm run dev
```

The frontend will be available at **http://localhost:3000**

## Usage

1. Open **http://localhost:3000** in your browser
2. Enter a stock symbol (e.g., `AAPL`, `TSLA`, `2330.TW`)
3. Click "Analyze" to get:
   - Real-time stock price
   - Technical indicators (SMA, RSI, MACD)
   - Buy/Sell/Hold recommendation
   - Price history chart

## API Endpoints

### Get Stock Data
```
GET http://localhost:8000/api/stock/{symbol}
```

Example:
```bash
curl http://localhost:8000/api/stock/AAPL
```

### Get Analysis
```
GET http://localhost:8000/api/analyze/{symbol}
```

Example:
```bash
curl http://localhost:8000/api/analyze/AAPL
```

## Testing

### Backend Tests
```bash
cd backend
export PYTHONPATH=$PYTHONPATH:.
pytest tests/test_main.py
```

Expected: **3/3 tests passing**

## Troubleshooting

### Backend Issues
- **Import errors**: Make sure you're in the virtual environment (`source venv/bin/activate`)
- **Module not found**: Set PYTHONPATH: `export PYTHONPATH=$PYTHONPATH:.`

### Frontend Issues
- **Dependencies not installing**: Use `npm install --legacy-peer-deps`
- **CORS errors**: Ensure backend is running on port 8000
- **API connection failed**: Check that both servers are running

## Production Deployment

### Backend (Heroku/Railway/Render)
1. Add `Procfile`:
   ```
   web: uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT
   ```
2. Update CORS origins in `backend/app/main.py` to include your frontend URL

### Frontend (Vercel/Netlify)
1. Update API URL in `frontend/src/app/page.tsx`:
   ```typescript
   const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
   ```
2. Set environment variable `NEXT_PUBLIC_API_URL` to your backend URL

## Features

✅ Real-time stock data (US & Taiwan markets)
✅ Technical analysis (SMA, RSI, MACD)
✅ Buy/Sell/Hold recommendations
✅ Interactive price charts
✅ Dark mode UI with glassmorphism
✅ Responsive design
