"use client";
import { useState } from 'react';

export default function WhyChooseUsSection({ content, onSave, saving }) {
  const [data, setData] = useState(content || {
    isActive: true,
    title: 'Why Choose Us',
    subtitle: 'Your Trusted Travel Partner',
    reasons: []
  });

  const addReason = () => {
    setData({
      ...data,
      reasons: [...data.reasons, {
        title: '',
        description: '',
        icon: '⭐',
        isActive: true,
        order: data.reasons.length
      }]
    });
  };

  const updateReason = (index, field, value) => {
    const newReasons = [...data.reasons];
    newReasons[index] = { ...newReasons[index], [field]: value };
    setData({ ...data, reasons: newReasons });
  };

  const removeReason = (index) => {
    const newReasons = data.reasons.filter((_, i) => i !== index);
    setData({ ...data, reasons: newReasons });
  };

  const toggleReason = (index) => {
    const newReasons = [...data.reasons];
    newReasons[index] = { ...newReasons[index], isActive: !newReasons[index].isActive };
    setData({ ...data, reasons: newReasons });
  };

  const handleSave = () => {
    onSave(data);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Why Choose Us</h2>
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Reasons</h3>
            <button
              onClick={addReason}
              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add Reason
            </button>
          </div>

          <div className="space-y-4">
            {data.reasons.map((reason, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={reason.isActive}
                      onChange={() => toggleReason(index)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Active</span>
                  </div>
                  <button
                    onClick={() => removeReason(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                    <input
                      type="text"
                      value={reason.icon}
                      onChange={(e) => updateReason(index, 'icon', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                      placeholder="⭐"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={reason.title}
                      onChange={(e) => updateReason(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                    <input
                      type="number"
                      value={reason.order}
                      onChange={(e) => updateReason(index, 'order', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={reason.description}
                    onChange={(e) => updateReason(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 