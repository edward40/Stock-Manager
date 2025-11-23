# Stock Professional Analysis App

A professional stock analysis application featuring real-time data, technical analysis, and AI-driven buy/sell recommendations.

## Features
- **Real-time Data**: US and Taiwan stock market coverage.
- **Technical Analysis**: SMA, RSI, MACD, Bollinger Bands.
- **News Aggregation**: Latest financial news and sentiment analysis.
- **Professional UI**: Dark mode, glassmorphism design, and interactive charts.

## Tech Stack
- **Frontend**: Next.js 14, Tailwind CSS, Recharts, Lucide React.
- **Backend**: Python FastAPI, yfinance, pandas, ta-lib.

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/edward40/Stock-Manager.git
   cd Stock-Manager
   ```

2. **Backend Setup**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r backend/requirements.txt
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

### Running the App

1. **Start Backend**
   ```bash
   # In root directory
   source venv/bin/activate
   uvicorn backend.app.main:app --reload
   ```
   Backend runs on http://localhost:8000

2. **Start Frontend**
   ```bash
   # In frontend directory
   npm run dev
   ```
   Frontend runs on http://localhost:3000

## API Endpoints
- `GET /api/stock/{symbol}`: Get current stock data.
- `GET /api/analyze/{symbol}`: Get technical analysis and buy/sell signals.
