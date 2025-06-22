'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';

export default function ImageUploader({
  onUpload,
  initialUrls = [],
  multiple = false,
  label = 'Image'
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState(() => Array.isArray(initialUrls) ? initialUrls : (initialUrls ? [initialUrls] : []));
  const [linkInput, setLinkInput] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Ensure initialUrls is always treated as an array
    const urls = Array.isArray(initialUrls) ? initialUrls : (initialUrls ? [initialUrls] : []);
    setImageUrls(urls);
  }, [initialUrls]);

  const handleUploadResult = (newUrls) => {
    const finalUrls = multiple ? newUrls : newUrls[0] || '';
    onUpload(finalUrls);
  };

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    let uploadedUrls = [];

    for (const file of files) {
      const isImage = file.type.startsWith('image/');
      const isSvg = file.type === 'image/svg+xml';
      
      if (!isImage && !isSvg) {
        alert(`Skipping invalid file type: ${file.name}`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`File is too large: ${file.name}`);
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
        uploadedUrls.push(result.url);
      } catch (error) {
        console.error('Upload error:', error);
        alert(`Failed to upload ${file.name}. Please try again.`);
      }
    }

    const currentUrls = Array.isArray(imageUrls) ? imageUrls : (imageUrls ? [imageUrls] : []);
    const newImageState = multiple ? [...currentUrls, ...uploadedUrls] : uploadedUrls;
    setImageUrls(newImageState);
    handleUploadResult(newImageState);
    setIsUploading(false);
  };

  const addImageFromLink = () => {
    if (linkInput) {
      const currentUrls = Array.isArray(imageUrls) ? imageUrls : (imageUrls ? [imageUrls] : []);
      const newImageState = multiple ? [...currentUrls, linkInput] : [linkInput];
      setImageUrls(newImageState);
      handleUploadResult(newImageState);
      setLinkInput('');
    }
  };

  const removeImage = (urlToRemove) => {
    const currentUrls = Array.isArray(imageUrls) ? imageUrls : (imageUrls ? [imageUrls] : []);
    const newImageState = currentUrls.filter(url => url !== urlToRemove);
    setImageUrls(newImageState);
    handleUploadResult(newImageState);
  };
  
  const SinglePreview = ({ url }) => (
    <div className="space-y-4">
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        <Image src={url} alt="Preview" fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
      </div>
      <div className="flex justify-center space-x-2">
        <button type="button" onClick={() => fileInputRef.current?.click()} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Change</button>
        <button type="button" onClick={() => removeImage(url)} className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700">Remove</button>
      </div>
    </div>
  );

  const MultiPreview = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {imageUrls.map((url, index) => (
        <div key={index} className="relative w-full h-32 rounded-lg overflow-hidden group">
          <Image src={url} alt={`Gallery image ${index + 1}`} fill className="object-cover" sizes="(max-width: 768px) 50vw, 200px" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button type="button" onClick={() => removeImage(url)} className="px-3 py-1 text-xs bg-red-600 text-white rounded-full hover:bg-red-700">Remove</button>
          </div>
        </div>
      ))}
    </div>
  );

  const hasImages = imageUrls && imageUrls.length > 0;

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      
      {multiple && hasImages && <MultiPreview />}
      {!multiple && hasImages && <SinglePreview url={imageUrls[0]} />}
      
      {(multiple || !hasImages) && (
        <div className={`border-2 border-dashed rounded-lg p-6 text-center ${isUploading ? 'border-blue-300' : 'border-gray-300 hover:border-blue-400'}`}>
          {isUploading ? (
            <div className="space-y-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm text-gray-600">Uploading...</p>
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
              <p className="text-sm text-gray-600">
                <button type="button" onClick={() => fileInputRef.current?.click()} className="text-blue-600 hover:text-blue-500 font-medium">Click to upload</button> or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, SVG up to 5MB</p>
            </div>
          )}
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*,image/svg+xml" onChange={handleFileSelect} multiple={multiple} className="hidden" />

      {(multiple || !hasImages) && (
        <div className="flex items-center space-x-2">
          <input type="text" value={linkInput} onChange={(e) => setLinkInput(e.target.value)} placeholder="Or paste an image URL" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"/>
          <button type="button" onClick={addImageFromLink} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">Add</button>
        </div>
      )}
    </div>
  );
} 