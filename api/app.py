from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import joblib
import os

app = Flask(__name__)
CORS(app)

# --- Model Loading ---
# We define the path to ensure the app looks in the correct directory
MODEL_PATH = 'stroke-SVM.joblib'
SCALER_PATH = 'stroke-scaler.joblib'

try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    print("✅ Model and scaler loaded successfully!")
except FileNotFoundError as e:
    print(f"❌ WARNING: File not found: {e}")
    model = None
    scaler = None

def predict_stroke(data):
    """
    SVM prediction based on the stroke-SVM.joblib model.
    """
    if model is None:
        return {
            'error': 'Model files not loaded on server',
            'prediction': None,
            'probability': 0.0,
            'risk_level': 'unknown'
        }

    try:
        # 1. Prepare input features
        feature_names = [
        'gender', 'age', 'hypertension', 'heart_disease', 'ever_married',
        'work_type', 'Residence_type', 'avg_glucose_level', 'bmi', 'smoking_status'
        ]
        # 2. Create a DataFrame instead of a simple NumPy array
        features_df = pd.DataFrame([[
            data['gender'],
            data['age'],
            data['hypertension'],
            data['heart_disease'],
            data['ever_married'],
            data['work_type'],
            data['Residence_type'],
            data['avg_glucose_level'],
            data['bmi'],
            data['smoking_status']
        ]], columns=feature_names)  

        # 3. Scale using the DataFrame
        if scaler is not None:
            features_scaled = scaler.transform(features_df)
            
        # 4. Predict
        prediction = model.predict(features_scaled)[0]
        has_stroke = int(prediction)

        # 4. Calculate Probability
        # SVMs don't always provide probabilities by default. 
        # This logic handles both Platt scaling and Decision Function conversion.
        if hasattr(model, 'predict_proba'):
            # Requires model was trained with probability=True
            proba = model.predict_proba(features_scaled)[0]
            probability = float(proba[1]) 
        elif hasattr(model, 'decision_function'):
            # Convert distance from hyperplane to a 0-1 score via Sigmoid
            decision = model.decision_function(features_scaled)[0]
            probability = float(1 / (1 + np.exp(-decision)))
        else:
            probability = 1.0 if has_stroke else 0.0

        return {
            'prediction': has_stroke,
            'probability': round(probability, 4),
            'risk_level': 'high' if has_stroke == 1 else 'low'
        }
    
    except Exception as e:
        raise ValueError(f"Prediction Error: {str(e)}")

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy' if model is not None else 'degraded',
        'model_loaded': model is not None,
        'scaler_loaded': scaler is not None
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Validate required fields
        required_fields = [
            'gender', 'age', 'hypertension', 'heart_disease',
            'ever_married', 'work_type', 'Residence_type',
            'avg_glucose_level', 'bmi', 'smoking_status'
        ]

        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing field: {field}'}), 400

        # Perform prediction
        result = predict_stroke(data)

        return jsonify({
            'success': True,
            'data': result
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/model-info', methods=['GET'])
def model_info():
    return jsonify({
        'model': 'Support Vector Machine (SVM)',
        'filename': 'stroke-SVM.joblib',
        'accuracy': 0.7407,
        'recall': 0.82,
        'status': 'Active'
    })

if __name__ == '__main__':
    # Using 0.0.0.0 allows access from other devices on your network
    app.run(debug=True, host='0.0.0.0', port=5000)