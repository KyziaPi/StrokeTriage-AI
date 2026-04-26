import { useState } from 'react';

interface FormData {
  gender: number;
  age: number;
  hypertension: number;
  heart_disease: number;
  ever_married: number;
  work_type: number;
  Residence_type: number;
  avg_glucose_level: number;
  bmi: number;
  smoking_status: number;
}

interface PredictionFormProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

export function PredictionForm({ onSubmit, isLoading = false }: PredictionFormProps) {
  const [formData, setFormData] = useState<FormData>({
    gender: 0,
    age: 50,
    hypertension: 0,
    heart_disease: 0,
    ever_married: 0,
    work_type: 3,
    Residence_type: 1,
    avg_glucose_level: 100,
    bmi: 25,
    smoking_status: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof FormData, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gender */}
        <div>
          <label className="block text-sm mb-2">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => handleChange('gender', Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value={0}>Male</option>
            <option value={1}>Female</option>
            <option value={2}>Other</option>
          </select>
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm mb-2">Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => handleChange('age', Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            min="0"
            max="120"
          />
        </div>

        {/* Hypertension */}
        <div>
          <label className="block text-sm mb-2">Hypertension</label>
          <select
            value={formData.hypertension}
            onChange={(e) => handleChange('hypertension', Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>

        {/* Heart Disease */}
        <div>
          <label className="block text-sm mb-2">Heart Disease</label>
          <select
            value={formData.heart_disease}
            onChange={(e) => handleChange('heart_disease', Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>

        {/* Ever Married */}
        <div>
          <label className="block text-sm mb-2">Ever Married</label>
          <select
            value={formData.ever_married}
            onChange={(e) => handleChange('ever_married', Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>

        {/* Work Type */}
        <div>
          <label className="block text-sm mb-2">Work Type</label>
          <select
            value={formData.work_type}
            onChange={(e) => handleChange('work_type', Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value={0}>Children</option>
            <option value={1}>Self-employed</option>
            <option value={2}>Never worked</option>
            <option value={3}>Private</option>
            <option value={4}>Government job</option>
          </select>
        </div>

        {/* Residence Type */}
        <div>
          <label className="block text-sm mb-2">Residence Type</label>
          <select
            value={formData.Residence_type}
            onChange={(e) => handleChange('Residence_type', Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value={0}>Rural</option>
            <option value={1}>Urban</option>
          </select>
        </div>

        {/* Average Glucose Level */}
        <div>
          <label className="block text-sm mb-2">Average Glucose Level (mg/dL)</label>
          <input
            type="number"
            value={formData.avg_glucose_level}
            onChange={(e) => handleChange('avg_glucose_level', Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            min="0"
            step="0.01"
          />
        </div>

        {/* BMI */}
        <div>
          <label className="block text-sm mb-2">BMI</label>
          <input
            type="number"
            value={formData.bmi}
            onChange={(e) => handleChange('bmi', Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            min="0"
            step="0.1"
          />
        </div>

        {/* Smoking Status */}
        <div>
          <label className="block text-sm mb-2">Smoking Status</label>
          <select
            value={formData.smoking_status}
            onChange={(e) => handleChange('smoking_status', Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value={0}>Never smoked</option>
            <option value={1}>Formerly smoked</option>
            <option value={2}>Smokes</option>
            <option value={3}>Unknown</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Predicting...' : 'Predict Stroke Risk'}
      </button>
    </form>
  );
}
