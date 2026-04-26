# How to Integrate Your Trained Model

## Step 1: Your Model File

You already have a joblib model file! The app is configured to use joblib for loading.

If you need to save a new model in the future:

```python
import joblib

# After training your model
# model = SVC(...)  # your trained model

joblib.dump(model, 'svm_model.joblib')
```

## Step 2: Place the Model and Scaler Files

Copy both your model and StandardScaler files into the `api/` directory:

```
api/
├── app.py
├── requirements.txt
├── svm_model.joblib  ← Your SVM model file here
├── scaler.joblib     ← Your StandardScaler file here
└── README.md
```

**Important:** You need BOTH files:
- `svm_model.joblib` - Your trained SVM model
- `scaler.joblib` - Your fitted StandardScaler

If you haven't saved your scaler yet, do it in your training script:
```python
import joblib
from sklearn.preprocessing import StandardScaler

# After fitting your scaler
# scaler = StandardScaler()
# X_scaled = scaler.fit_transform(X)

joblib.dump(scaler, 'scaler.joblib')
```

## Step 3: Update app.py (Already Done!)

The `api/app.py` file has been configured to:
- Load your joblib model and StandardScaler on startup
- Apply StandardScaler transformation before predictions
- Use the model for predictions
- Handle probability calculations for SVM
- Fallback to mock predictions if model not found

**If your files have different names**, update lines 9-10 in `app.py`:
```python
model = joblib.load('your_model_filename.joblib')
scaler = joblib.load('your_scaler_filename.joblib')
```

## Step 4: Verify Feature Order

**IMPORTANT:** Make sure the feature order in `app.py` matches your training data!

Current order in `app.py`:
```python
features = np.array([[
    data['gender'],           # 0
    data['age'],              # 1
    data['hypertension'],     # 2
    data['heart_disease'],    # 3
    data['ever_married'],     # 4
    data['work_type'],        # 5
    data['Residence_type'],   # 6
    data['avg_glucose_level'], # 7
    data['bmi'],              # 8
    data['smoking_status']    # 9
]])
```

If your training data had a different column order, update this section in `app.py`.

## Step 5: Install Additional Dependencies (if needed)

If you used joblib, update `requirements.txt`:

```bash
Flask==3.0.0
flask-cors==4.0.0
numpy==1.26.0
scikit-learn==1.3.0  # Add this if you trained with sklearn
joblib==1.3.2        # Add this if using joblib
```

Then reinstall:
```bash
pip install -r requirements.txt
```

## Step 6: Test Your Model

1. Start the Flask server:
```bash
python app.py
```

2. Look for the startup message:
```
Model loaded successfully!
```

3. Test with a sample prediction from the frontend

## Troubleshooting

### Model or Scaler Not Loading
- Check that BOTH files (`svm_model.joblib` and `scaler.joblib`) are in the `api/` directory
- Verify the filenames match in `app.py` (lines 9-10)
- Check file permissions

### Import Errors
- Make sure scikit-learn version matches your training version
- Install joblib if you're using `.joblib` files

### Wrong Predictions
- Verify feature order matches your training data
- Check if your model expects scaled/normalized features
- If you used StandardScaler or other preprocessing, you need to:
  1. Save the scaler along with the model
  2. Load and apply it in `app.py` before prediction

## Example: If You Used Preprocessing

```python
# When saving (in your training script):
import joblib

joblib.dump(model, 'svm_model.joblib')
joblib.dump(scaler, 'scaler.joblib')  # Save your StandardScaler/preprocessing

# In app.py (add after loading the model):
model = joblib.load('svm_model.joblib')
scaler = joblib.load('scaler.joblib')

# Then in predict_stroke():
features = np.array([[...]])
features_scaled = scaler.transform(features)  # Apply preprocessing
prediction = model.predict(features_scaled)[0]
```

## Questions?

If you encounter issues, check:
1. Python version compatibility
2. scikit-learn version match
3. Feature preprocessing requirements
4. Model file path and permissions
