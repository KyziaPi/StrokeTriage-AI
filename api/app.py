from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib

app = Flask(__name__)
CORS(app)

# Load your trained SVM model and scaler
# REPLACE filenames with your actual model and scaler files
try:
    model = joblib.load('atroke-SVM.joblib')
    scaler = joblib.load('stroke-scaler.joblib')  # Load StandardScaler
    print("Model and scaler loaded successfully!")
except FileNotFoundError as e:
    print(f"WARNING: Model or scaler file not found: {e}")
    print("Place your model file (svm_model.joblib) and scaler (scaler.joblib) in the api/ directory")
    model = None
    scaler = None

# SVM model prediction function
def predict_stroke(data):
    """
    SVM prediction based on trained model.
    """
    if model is None:
        # Fallback to mock prediction if model not loaded
        risk_score = 0.0
        if data['age'] > 60:
            risk_score += 0.3
        else:
            risk_score += 0.1
        if data['hypertension'] == 1:
            risk_score += 0.2
        if data['heart_disease'] == 1:
            risk_score += 0.25
        if data['avg_glucose_level'] > 200:
            risk_score += 0.15
        if data['bmi'] > 30:
            risk_score += 0.1
        if data['smoking_status'] == 2:
            risk_score += 0.05

        has_stroke = 1 if risk_score > 0.5 else 0
        probability = min(risk_score, 1.0)
    else:
        # ============================================
        # USE YOUR ACTUAL TRAINED MODEL HERE
        # ============================================

        # Prepare input features in the same order as your training data
        # Adjust this list to match your model's expected feature order
        features = np.array([[
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
        ]])

        # Apply StandardScaler transformation
        if scaler is not None:
            features = scaler.transform(features)

        # Make prediction using your trained model
        prediction = model.predict(features)[0]
        has_stroke = int(prediction)

        # Get probability if your model supports it
        if hasattr(model, 'predict_proba'):
            # For models with probability support (most sklearn classifiers)
            proba = model.predict_proba(features)[0]
            probability = float(proba[1])  # Probability of stroke (class 1)
        elif hasattr(model, 'decision_function'):
            # For SVM with decision_function
            decision = model.decision_function(features)[0]
            # Convert decision function to probability-like score (0-1 range)
            # Using sigmoid function
            probability = float(1 / (1 + np.exp(-decision)))
        else:
            # Fallback if no probability available
            probability = 1.0 if has_stroke else 0.0

    return {
        'prediction': has_stroke,
        'probability': probability,
        'risk_level': 'high' if has_stroke else 'low'
    }

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model': 'SVM',
        'version': '1.0'
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    """
    Predict stroke risk based on patient data.

    Expected JSON payload:
    {
        "gender": int (0=Male, 1=Female, 2=Other),
        "age": float,
        "hypertension": int (0=No, 1=Yes),
        "heart_disease": int (0=No, 1=Yes),
        "ever_married": int (0=No, 1=Yes),
        "work_type": int (0=children, 1=Self-employed, 2=Never_worked, 3=Private, 4=Govt_job),
        "Residence_type": int (0=Rural, 1=Urban),
        "avg_glucose_level": float,
        "bmi": float,
        "smoking_status": int (0=never, 1=formerly, 2=smokes, 3=Unknown)
    }
    """
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
                return jsonify({
                    'error': f'Missing required field: {field}'
                }), 400

        # Make prediction
        result = predict_stroke(data)

        return jsonify({
            'success': True,
            'data': result,
            'input': data
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/model-info', methods=['GET'])
def model_info():
    """Return information about the model"""
    return jsonify({
        'model': 'SVM',
        'accuracy': 0.7407,
        'precision': 0.1380,
        'recall': 0.82,
        'f1_score': 0.2363,
        'description': 'Support Vector Machine classifier for stroke prediction'
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
