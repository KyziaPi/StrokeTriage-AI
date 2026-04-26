from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

# Mock SVM model prediction function
def predict_stroke(data):
    """
    Mock SVM prediction based on input features.
    In production, this would load a trained model and make actual predictions.
    """
    # Calculate risk score based on features (simplified heuristic)
    risk_score = 0.0

    # Age factor
    if data['age'] > 60:
        risk_score += 0.3
    else:
        risk_score += 0.1

    # Hypertension
    if data['hypertension'] == 1:
        risk_score += 0.2

    # Heart disease
    if data['heart_disease'] == 1:
        risk_score += 0.25

    # Glucose level
    if data['avg_glucose_level'] > 200:
        risk_score += 0.15

    # BMI
    if data['bmi'] > 30:
        risk_score += 0.1

    # Smoking status
    if data['smoking_status'] == 2:  # Currently smokes
        risk_score += 0.05

    # Determine prediction
    has_stroke = 1 if risk_score > 0.5 else 0
    probability = min(risk_score, 1.0)

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
