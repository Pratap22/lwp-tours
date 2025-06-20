"use client";
import { useState, useEffect } from 'react';

export default function NavigationSection({ content, onSave, saving }) {
  const [data, setData] = useState({
    isActive: true,
    navigationItems: []
  });

  useEffect(() => {
    if (content) {
      setData({
        isActive: content.isActive !== false,
        navigationItems: content.navigationItems || []
      });
    }
  }, [content]);

  const addItem = () => {
    setData(prevData => ({
      ...prevData,
      navigationItems: [...(prevData.navigationItems || []), {
        name: '',
        href: '',
        isActive: true,
        order: prevData.navigationItems?.length || 0
      }]
    }));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...data.navigationItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setData({ ...data, navigationItems: newItems });
  };

  const removeItem = (index) => {
    const newItems = data.navigationItems.filter((_, i) => i !== index);
    setData({ ...data, navigationItems: newItems });
  };

  const toggleItem = (index) => {
    const newItems = [...data.navigationItems];
    newItems[index] = { ...newItems[index], isActive: !newItems[index].isActive };
    setData({ ...data, navigationItems: newItems });
  };

  const handleSave = () => {
    onSave(data);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Navigation</h2>
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Navigation Items</h3>
            <button
              onClick={addItem}
              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add Item
            </button>
          </div>

          <div className="space-y-4">
            {data.navigationItems && data.navigationItems.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={item.isActive}
                      onChange={() => toggleItem(index)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Active</span>
                  </div>
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateItem(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                      placeholder="e.g., Home, About, Tours"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                    <input
                      type="text"
                      value={item.href}
                      onChange={(e) => updateItem(index, 'href', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                      placeholder="e.g., /, /about-us, /tours"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                    <input
                      type="number"
                      value={item.order}
                      onChange={(e) => updateItem(index, 'order', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Navigation Tips:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use &quot;/&quot; for the home page</li>
            <li>• Use &quot;/about-us&quot; for the about page</li>
            <li>• Use &quot;/tours&quot; for the tours page</li>
            <li>• Use &quot;/contact-us&quot; for the contact page</li>
            <li>• Order determines the display sequence</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 