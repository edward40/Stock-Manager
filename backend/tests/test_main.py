from fastapi.testclient import TestClient
from app.main import app
from app.analysis import calculate_technical_indicators

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to Stock Professional Analysis API"}

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_technical_analysis_logic():
    # Mock data
    mock_history = [
        {"price": 100}, {"price": 101}, {"price": 102}, {"price": 103}, {"price": 104},
        {"price": 105}, {"price": 106}, {"price": 107}, {"price": 108}, {"price": 109},
        {"price": 110}, {"price": 111}, {"price": 112}, {"price": 113}, {"price": 114},
        {"price": 115}, {"price": 116}, {"price": 117}, {"price": 118}, {"price": 119},
        {"price": 120}
    ]
    result = calculate_technical_indicators(mock_history)
    assert "indicators" in result
    assert "signal" in result
    assert "score" in result
    # SMA_20 should be calculated (mean of last 20 prices)
    # 101..120 mean = 110.5
    assert result["indicators"]["SMA_20"] is not None
