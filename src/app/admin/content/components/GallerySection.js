"use client";
import { useState } from 'react';
import ImageUploader from '../../../components/ImageUploader';

export default function GallerySection({ content, onSave, saving }) {
  const [images, setImages] = useState(content.images || []);
  const [isActive, setIsActive] = useState(content.isActive);
  const [title, setTitle] = useState(content.title || '');
  const [subtitle, setSubtitle] = useState(content.subtitle || '');

  const addImage = () => {
    setImages([...images, {
      src: '',
      alt: '',
      isActive: true,
      order: images.length
    }]);
  };

  const updateImage = (index, field, value) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], [field]: value };
    setImages(newImages);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const toggleImage = (index) => {
    const newImages = [...images];
    newImages[index].isActive = !newImages[index].isActive;
    setImages(newImages);
  };

  const handleSave = () => {
    onSave({
      images: images.map((image, index) => ({ ...image, order: index })),
      isActive,
      title,
      subtitle
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gallery</h2>
          <p className="text-gray-600 mt-1">Manage the photo gallery section</p>
        </div>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Show Section</span>
          </label>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Section Settings */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Section Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              placeholder="Bhutan Photo Gallery"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Subtitle
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              placeholder="Discover the Beauty of Bhutan"
            />
          </div>
        </div>
      </div>

      {/* Gallery Images */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Gallery Images</h3>
          <button
            onClick={addImage}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            + Add Image
          </button>
        </div>

        {images.map((image, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-medium text-gray-900">Image {index + 1}</h4>
              <div className="flex items-center space-x-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={image.isActive}
                    onChange={() => toggleImage(index)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Active</span>
                </label>
                <button
                  onClick={() => removeImage(index)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={image.alt}
                  onChange={(e) => updateImage(index, 'alt', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  placeholder="Describe the image for accessibility"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gallery Image
                </label>
                <ImageUploader
                  currentImage={image.src}
                  onImageUpload={(imageUrl) => updateImage(index, 'src', imageUrl)}
                  folder="gallery"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 