"use client";
import ImageUploader from '../../../components/ImageUploader';

export default function SiteSettingsSection({ 
  content, 
  onDataChange, 
  saving 
}) {
  const handleInputChange = (field, value) => {
    onDataChange({ ...content, [field]: value });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Site Settings</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
          <input
            type="text"
            value={content?.siteName || ''}
            onChange={(e) => handleInputChange('siteName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white"
            disabled={saving}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Site Logo</label>
          <ImageUploader
            onUpload={(url) => handleInputChange('siteLogo', url)}
            initialUrls={content?.siteLogo ? [content.siteLogo] : []}
            label=""
            disabled={saving}
          />
        </div>
      </div>
    </div>
  );
} 