import { AlertTriangle, CheckCircle } from 'lucide-react';

interface PredictionResultProps {
  hasStroke: boolean;
  probability: number;
}

export function PredictionResult({ hasStroke, probability }: PredictionResultProps) {
  return (
    <div
      className={`rounded-lg p-6 ${
        hasStroke ? 'bg-pink-50 border-2 border-pink-300' : 'bg-green-50 border-2 border-green-300'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {hasStroke ? (
            <AlertTriangle className="w-8 h-8 text-pink-600" />
          ) : (
            <CheckCircle className="w-8 h-8 text-green-600" />
          )}
        </div>
        <div className="flex-1">
          <h3 className={`text-xl mb-2 ${hasStroke ? 'text-pink-900' : 'text-green-900'}`}>
            {hasStroke ? 'High Risk Detected' : 'Low Risk Detected'}
          </h3>
          <p className={`mb-4 ${hasStroke ? 'text-pink-800' : 'text-green-800'}`}>
            {hasStroke
              ? 'Based on your data, you have high-risk factors. We recommend sharing these results with a healthcare professional.'
              : 'Based on your data, you have low-risk factors. Continue maintaining a healthy lifestyle.'}
          </p>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${hasStroke ? 'text-pink-700' : 'text-green-700'}`}>
              Risk Score:
            </span>
            <div className="flex-1 bg-gray-200 rounded-full h-2.5 max-w-xs">
              <div
                className={`h-2.5 rounded-full ${hasStroke ? 'bg-pink-600' : 'bg-green-600'}`}
                style={{ width: `${Math.min(probability * 100, 100)}%` }}
              ></div>
            </div>
            <span className={`text-sm ${hasStroke ? 'text-pink-700' : 'text-green-700'}`}>
              {(probability * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
