'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function GalleryUpload({ onGalleryUpload, currentGallery = [] }) {
  const [isUploading, setIsUploading] = useState(false);
  const [gallery, setGallery] = useState(currentGallery);
  const [linkInput, setLinkInput] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    setGallery(currentGallery);
  }, [currentGallery]);

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    const newImageUrls = [];

    for (const file of files) {
      if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
        console.warn(`Skipping invalid file: ${file.name}`);
        continue;
      }
      try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error(`Upload failed for ${file.name}`);
        const result = await response.json();
        newImageUrls.push(result.url);
      } catch (error) {
        console.error('Upload error:', error);
        alert(`Failed to upload ${file.name}. Please try again.`);
      }
    }
    
    const updatedGallery = [...gallery, ...newImageUrls];
    setGallery(updatedGallery);
    onGalleryUpload(updatedGallery);
    setIsUploading(false);
  };

  const addImageFromLink = () => {
    if (linkInput && !gallery.includes(linkInput)) {
      const updatedGallery = [...gallery, linkInput];
      setGallery(updatedGallery);
      onGalleryUpload(updatedGallery);
      setLinkInput(''); // Reset input after adding
    }
  };

  const removeImage = (indexToRemove) => {
    const updatedGallery = gallery.filter((_, index) => index !== indexToRemove);
    setGallery(updatedGallery);
    onGalleryUpload(updatedGallery);
  };
  
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Tour Gallery
      </label>

      {/* Gallery Previews */}
      {gallery.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((url, index) => (
            <div key={index} className="relative w-full h-32 rounded-lg overflow-hidden group">
              <Image
                src={url}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 200px"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="px-3 py-1 text-xs bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors border-gray-300 hover:border-blue-400 hover:bg-gray-50`}
      >
        {isUploading ? (
          <div className="space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-sm text-gray-600">Uploading images...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <p className="text-sm text-gray-600">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Click to upload
                </button>{' '}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Upload multiple PNG, JPG files (max 5MB each)
              </p>
            </div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        multiple
        className="hidden"
      />

      {/* URL Input */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={linkInput}
          onChange={(e) => setLinkInput(e.target.value)}
          placeholder="https://... Paste image URL here"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
        />
        <button
          type="button"
          onClick={addImageFromLink}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
} 