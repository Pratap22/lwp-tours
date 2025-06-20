"use client";
import { useState } from 'react';

export default function SmallGroupToursSection({ content, onSave, saving }) {
  const [data, setData] = useState(content || {
    isActive: true,
    title: 'Small Group Tours',
    subtitle: 'Intimate Experiences with Like-Minded Travelers',
    description: '',
    benefits: []
  });

  const addBenefit = () => {
    setData({
      ...data,
      benefits: [...data.benefits, {
        text: '',
        isActive: true,
        order: data.benefits.length
      }]
    });
  };

  const updateBenefit = (index, field, value) => {
    const newBenefits = [...data.benefits];
    newBenefits[index] = { ...newBenefits[index], [field]: value };
    setData({ ...data, benefits: newBenefits });
  };

  const removeBenefit = (index) => {
    const newBenefits = data.benefits.filter((_, i) => i !== index);
    setData({ ...data, benefits: newBenefits });
  };

  const toggleBenefit = (index) => {
    const newBenefits = [...data.benefits];
    newBenefits[index] = { ...newBenefits[index], isActive: !newBenefits[index].isActive };
    setData({ ...data, benefits: newBenefits });
  };

  const handleSave = () => {
    onSave(data);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Small Group Tours</h2>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.isActive}
              onChange={(e) => setData({ ...data, isActive: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Active</span>
          </label>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label>
          <input
            type="text"
            value={data.subtitle}
            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Section Description</label>
          <textarea
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Benefits</h3>
            <button
              onClick={addBenefit}
              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add Benefit
            </button>
          </div>

          <div className="space-y-4">
            {data.benefits.map((benefit, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={benefit.isActive}
                      onChange={() => toggleBenefit(index)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Active</span>
                  </div>
                  <button
                    onClick={() => removeBenefit(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Benefit Text</label>
                    <input
                      type="text"
                      value={benefit.text}
                      onChange={(e) => updateBenefit(index, 'text', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Benefit Description</label>
                    <textarea
                      value={benefit.description}
                      onChange={(e) => updateBenefit(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                    <input
                      type="number"
                      value={benefit.order}
                      onChange={(e) => updateBenefit(index, 'order', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 