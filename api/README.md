# Flask API for Stroke Prediction

## Setup

### Option 1: Using Virtual Environment (Recommended)

1. Create a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the Flask server:
```bash
python app.py
```

### Option 2: Global Installation

1. Install dependencies directly:
```bash
pip install Flask flask-cors numpy
```

2. Run the Flask server:
```bash
python3 app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### GET /api/health
Health check endpoint

### POST /api/predict
Predict stroke risk

**Request body:**
```json
{
  "gender": 0,
  "age": 67.0,
  "hypertension": 0,
  "heart_disease": 1,
  "ever_married": 1,
  "work_type": 3,
  "Residence_type": 1,
  "avg_glucose_level": 228.69,
  "bmi": 36.6,
  "smoking_status": 1
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "prediction": 1,
    "probability": 0.8,
    "risk_level": "high"
  }
}
```

### GET /api/model-info
Get model performance metrics
