import metricsImg from '../../imports/metrics-comparison.png';
import accuracyImg from '../../imports/accuracy-comparison.png';

export function ModelPerformance() {
  const modelData = [
    {
      model: 'Logistic Regression',
      accuracy: 74.17,
      precision: 13.61,
      recall: 80.0,
      f1: 23.26,
    },
    {
      model: 'SVM',
      accuracy: 74.07,
      precision: 13.80,
      recall: 82.0,
      f1: 23.63,
    },
    {
      model: 'Random Forest',
      accuracy: 92.47,
      precision: 24.53,
      recall: 26.0,
      f1: 25.24,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl mb-4">Model Performance</h2>
      <p className="text-gray-600 text-sm mb-6">
        Comparison of three machine learning models for stroke prediction
      </p>

      {/* Model Comparison Table */}
      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Model</th>
              <th className="text-right py-2">Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {modelData.map((row, idx) => (
              <tr
                key={idx}
                className={`border-b last:border-0 ${
                  row.model === 'SVM' ? 'bg-pink-50' : ''
                }`}
              >
                <td className="py-2 text-gray-700">
                  {row.model}
                  {row.model === 'SVM' && (
                    <span className="ml-2 text-xs bg-pink-600 text-white px-2 py-0.5 rounded">
                      Active
                    </span>
                  )}
                </td>
                <td className="text-right py-2">{row.accuracy.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detailed Metrics */}
      <div className="mb-6">
        <h3 className="text-sm mb-3">Detailed Metrics</h3>
        <div className="space-y-3">
          {modelData.map((row, idx) => (
            <div
              key={idx}
              className={`rounded-md p-3 ${
                row.model === 'SVM'
                  ? 'bg-pink-100 border-2 border-pink-500'
                  : 'bg-gray-50'
              }`}
            >
              <div className="text-sm mb-2 flex items-center gap-2">
                {row.model}
                {row.model === 'SVM' && (
                  <span className="text-xs bg-pink-600 text-white px-2 py-0.5 rounded">
                    Active
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                <div>
                  <div>Precision</div>
                  <div>{row.precision.toFixed(2)}%</div>
                </div>
                <div>
                  <div>Recall</div>
                  <div>{row.recall.toFixed(2)}%</div>
                </div>
                <div>
                  <div>F1</div>
                  <div>{row.f1.toFixed(2)}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm mb-2">Accuracy Comparison</h3>
          <img
            src={accuracyImg}
            alt="Accuracy Comparison Chart"
            className="w-full rounded-md border"
          />
        </div>
        <div>
          <h3 className="text-sm mb-2">Metrics Comparison</h3>
          <img
            src={metricsImg}
            alt="Model Metrics Comparison Chart"
            className="w-full rounded-md border"
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-pink-50 rounded-md border-2 border-pink-300">
        <p className="text-xs text-pink-800">
          <strong>Active Model:</strong> SVM (Support Vector Machine) is currently being utilized for predictions.
          It provides a balanced performance with 74.07% accuracy and 82% recall, making it effective at identifying stroke risk cases.
        </p>
      </div>
    </div>
  );
}
