"use client";
import { useState } from 'react';

export default function TravelThemesSection({ content, onSave, saving }) {
  const [themes, setThemes] = useState(content.themes || []);
  const [isActive, setIsActive] = useState(content.isActive !== undefined ? content.isActive : true);
  const [title, setTitle] = useState(content.title || 'Find Your Perfect Experience');
  const [subtitle, setSubtitle] = useState(content.subtitle || 'Whatever your travel style, we have a journey that\'s right for you. Explore our curated themes and find the adventure that awaits.');
  const [buttonText, setButtonText] = useState(content.buttonText || 'Explore our Tours');

  const addTheme = () => {
    setThemes([...themes, {
      icon: '🏛️',
      title: 'New Theme',
      description: 'A description for the new theme.',
      iconBackgroundColor: '#3b82f6', // Default to blue
      isActive: true,
      order: themes.length
    }]);
  };

  const updateTheme = (index, field, value) => {
    const newThemes = [...themes];
    newThemes[index] = { ...newThemes[index], [field]: value };
    setThemes(newThemes);
  };

  const removeTheme = (index) => {
    setThemes(themes.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave({
      themes: themes.map((item, index) => ({ ...item, order: index })),
      isActive,
      title,
      subtitle,
      buttonText
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Travel Themes Section</h2>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Show Section</span>
          </label>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
      
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
          <input
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white"
            placeholder="Explore our tours"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
        <textarea
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white"
        />
      </div>

      <div className="space-y-4">
        {themes.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Theme {index + 1}</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => removeTheme(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateTheme(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateTheme(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icon (emoji)
                </label>
                <input
                  type="text"
                  value={item.icon}
                  onChange={(e) => updateTheme(index, 'icon', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  placeholder="🏆"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icon Background Color
                </label>
                <input
                  type="color"
                  value={item.iconBackgroundColor || '#3b82f6'}
                  onChange={(e) => updateTheme(index, 'iconBackgroundColor', e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addTheme}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        Add New Theme
      </button>
    </div>
  );
} 