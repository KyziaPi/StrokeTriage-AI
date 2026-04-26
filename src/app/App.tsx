import { useState } from 'react';
import { PredictionForm } from './components/PredictionForm';
import { PredictionResult } from './components/PredictionResult';
import { ModelPerformance } from './components/ModelPerformance';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [prediction, setPrediction] = useState<{ hasStroke: boolean; probability: number } | null>(null);
  const [activeTab, setActiveTab] = useState<'prediction' | 'performance'>('prediction');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePrediction = async (formData: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction from server');
      }

      const result = await response.json();

      if (result.success) {
        const hasStroke = result.data.prediction === 1;
        setPrediction({
          hasStroke,
          probability: result.data.probability,
        });
      } else {
        throw new Error(result.error || 'Prediction failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Prediction error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl mb-2 bg-gradient-to-r from-green-600 to-pink-600 bg-clip-text text-transparent">
            Stroke Risk Prediction
          </h1>
          <p className="text-gray-600">
            Assess stroke risk using machine learning models
          </p>
        </header>

        {/* Main Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex gap-4 px-6 pt-6 border-b">
            <button
              onClick={() => setActiveTab('prediction')}
              className={`pb-3 px-4 transition-colors ${
                activeTab === 'prediction'
                  ? 'border-b-2 border-green-600 text-green-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Prediction
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`pb-3 px-4 transition-colors ${
                activeTab === 'performance'
                  ? 'border-b-2 border-pink-600 text-pink-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Model Performance
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'prediction' ? (
              <div>
                <PredictionForm onSubmit={handlePrediction} isLoading={isLoading} />
                {error && (
                  <div className="mt-6 p-4 bg-pink-50 border-2 border-pink-200 rounded-lg">
                    <p className="text-pink-800 text-sm">
                      <strong>Error:</strong> {error}
                    </p>
                    <p className="text-pink-600 text-xs mt-2">
                      Make sure the Flask API server is running on port 5000
                    </p>
                  </div>
                )}
                {prediction && (
                  <div className="mt-6">
                    <PredictionResult
                      hasStroke={prediction.hasStroke}
                      probability={prediction.probability}
                    />
                  </div>
                )}
              </div>
            ) : (
              <ModelPerformance />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}