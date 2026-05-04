# Stroke Prediction Web Application

A full-stack web application for stroke risk prediction using machine learning (SVM model) with a React + Tailwind CSS frontend and Flask backend.

## Features

- **Manual Input Form**: Enter patient data with 10 health parameters
- **Real-time Prediction**: Get stroke risk predictions via SVM model
- **Risk Assessment**: Visual display of high/low risk with probability scores
- **Model Performance**: View comparison of ML models (Logistic Regression, SVM, Random Forest)

## Dataset
From Kaggle, [Stroke Risk Dataset](https://www.kaggle.com/datasets/ranaghulamnabi/stroke-risk-dataset) by ranaghulamnabi

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS v4
- Vite

### Backend
- Python 3.10
- Flask
- Flask-CORS
- NumPy

## Setup Instructions

### Backend Setup


1. Navigate to the API directory:
```bash
cd api
```

2. Create a virtual environment:
```bash
python -m venv venv
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Run the Flask server:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

### Frontend Setup

0. If first time installing node.js:
```bash
npm install -g pnpm
pnpm -v
```

2. Install Node.js dependencies (from root directory):
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

The application will be available in the preview window.

## Running the Full Application

1. **Terminal 1** - Start Flask backend:
```bash
cd api
venv\Scripts\activate
python app.py
```

2. **Terminal 2** - Start React frontend:
```bash
pnpm dev
```

## API Endpoints

### `GET /api/health`
Health check endpoint

### `POST /api/predict`
Predict stroke risk

**Request:**
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

### `GET /api/model-info`
Get SVM model performance metrics

## Input Field Mappings

### Gender
- 0: Male
- 1: Female
- 2: Other

### Hypertension / Heart Disease / Ever Married
- 0: No
- 1: Yes

### Work Type
- 0: Children
- 1: Self-employed
- 2: Never worked
- 3: Private
- 4: Government job

### Residence Type
- 0: Rural
- 1: Urban

### Smoking Status
- 0: Never smoked
- 1: Formerly smoked
- 2: Smokes
- 3: Unknown

## Model Performance

The application uses an SVM (Support Vector Machine) model with the following metrics:
- Accuracy: 74.07%
- Precision: 13.80%
- Recall: 82.00%
- F1 Score: 23.63%

## Notes

- The current implementation uses a simplified prediction algorithm. In production, replace with a trained ML model using joblib or pickle.
- Ensure the Flask backend is running before using the prediction feature.
- The frontend will display an error message if it cannot connect to the backend.
