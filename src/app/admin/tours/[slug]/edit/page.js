'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { use } from 'react';
import ImageUpload from '../../../../components/ImageUpload';
import { generateSlug } from '../../../../lib/utils';

export default function EditTour({ params }) {
  const router = useRouter();
  const { slug } = use(params);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    duration: '',
    price: '',
    image: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTour();
  }, [slug]);

  const fetchTour = async () => {
    try {
      const response = await fetch(`/api/tours/${slug}`);
      if (!response.ok) throw new Error('Tour not found');
      const tour = await response.json();
      console.log('Tour data:', tour);
      
      // Extract nights from duration format (e.g., "8 Days / 7 Nights" -> "7")
      let durationInput = tour.duration;
      if (tour.duration && tour.duration.includes('Nights')) {
        const nightsMatch = tour.duration.match(/(\d+)\s+Nights/);
        if (nightsMatch) {
          durationInput = nightsMatch[1]; // Extract just the number of nights
        }
      }
      
      setFormData({
        title: tour.title,
        slug: tour.slug,
        description: tour.description,
        duration: durationInput,
        price: tour.price.toString(),
        image: tour.image,
      });
    } catch (err) {
      console.error(err)
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = generateSlug(value);
      setFormData(prev => ({
        ...prev,
        slug: slug
      }));
    }
  };

  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      image: imageUrl
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      // Convert duration if it's just a number
      const duration = formData.duration;
      let formattedDuration = duration;
      
      const nights = parseInt(duration);
      if (!isNaN(nights) && nights > 0 && duration === nights.toString()) {
        const days = nights + 1;
        formattedDuration = `${days} Days / ${nights} Nights`;
      }

      const tourData = {
        ...formData,
        duration: formattedDuration
      };

      const response = await fetch(`/api/tours/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tourData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update tour');
      }

      const result = await response.json();
      router.push('/admin/tours');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tour...</p>
        </div>
      </div>
    );
  }

  if (error && error === 'Tour not found') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tour Not Found</h1>
          <p className="text-gray-600 mb-6">The tour you're trying to edit doesn't exist.</p>
          <Link
            href="/admin/tours"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Tours
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Tour</h1>
              <p className="mt-2 text-gray-600">Update tour information</p>
            </div>
            <Link
              href="/admin/tours"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Tours
            </Link>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Tour Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                placeholder="e.g., Cultural Immersion Tour"
              />
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                URL Slug *
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  placeholder="e.g., cultural-immersion-tour"
                />
                {formData.title && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      Auto-generated
                    </span>
                  </div>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                This will be used in the tour URL: /tours/[slug]
              </p>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                placeholder="Describe the tour experience, highlights, and what makes it special..."
              />
            </div>

            {/* Duration */}
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Duration (Nights) *
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                placeholder="e.g., 6 or 7 Days / 6 Nights"
              />
              <p className="mt-1 text-sm text-gray-500">
                Type just the number of nights (e.g., 6) or the full format (e.g., 7 Days / 6 Nights)
              </p>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price (USD) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  placeholder="1899"
                />
              </div>
            </div>

            {/* Image Upload */}
            <ImageUpload onImageUpload={handleImageUpload} currentImage={formData.image} />

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6">
              <Link
                href="/admin/tours"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 