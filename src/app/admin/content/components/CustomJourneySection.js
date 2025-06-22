"use client";

export default function CustomJourneySection({ content, onSave, saving }) {
  const handleInputChange = (field, value) => {
    onSave({ ...content, [field]: value });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Custom Journey Section</h2>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={content?.isActive ?? true}
              onChange={(e) => handleInputChange('isActive', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              disabled={saving}
            />
            <span className="ml-2 text-gray-700">Show Section</span>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Title
          </label>
          <input
            type="text"
            value={content?.title || ''}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white"
            disabled={saving}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Main Content
          </label>
          <textarea
            value={content?.content || ''}
            onChange={(e) => handleInputChange('content', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white"
            placeholder="Enter the main content..."
            disabled={saving}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CTA Button Text
            </label>
            <input
              type="text"
              value={content?.ctaText || ''}
              onChange={(e) => handleInputChange('ctaText', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white"
              disabled={saving}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CTA Button Link
            </label>
            <input
              type="text"
              value={content?.ctaLink || ''}
              onChange={(e) => handleInputChange('ctaLink', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white"
              placeholder="e.g., /contact-us"
              disabled={saving}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Theme Box Title
          </label>
          <input
            type="text"
            value={content?.themeTitle || ''}
            onChange={(e) => handleInputChange('themeTitle', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white"
            disabled={saving}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Theme Box Content
          </label>
          <textarea
            value={content?.themeContent || ''}
            onChange={(e) => handleInputChange('themeContent', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white"
            placeholder="Enter the theme box content..."
            disabled={saving}
          />
        </div>
      </div>
    </div>
  );
} 