'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '../../../components/ImageUpload';
import { generateSlug } from '../../../lib/utils';

export default function CreateTour() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    duration: '',
    price: '',
    imageUrl: '',
    groupSize: '',
    difficulty: '',
    bestTime: '',
    isHero: false,
    featured: false,
    travelTheme: '',
    included: [''],
  });
  const [travelThemes, setTravelThemes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchThemes() {
      try {
        const res = await fetch('/api/content?section=travel-themes');
        if (res.ok) {
          const data = await res.json();
          if (data.content && data.content.items) {
            setTravelThemes(data.content.items);
            if (data.content.items.length > 0) {
              setFormData(prev => ({ ...prev, travelTheme: data.content.items[0].title }));
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch travel themes", err);
      }
    }
    fetchThemes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));

    if (name === 'title') {
      setFormData(prev => ({ ...prev, slug: generateSlug(value) }));
    }
  };

  const handleImageUpload = (url) => {
    setFormData(prev => ({ ...prev, imageUrl: url }));
  };

  const handleIncludedChange = (index, value) => {
    const newIncluded = [...formData.included];
    newIncluded[index] = value;
    setFormData(prev => ({ ...prev, included: newIncluded }));
  };

  const addIncludedField = () => {
    setFormData(prev => ({ ...prev, included: [...formData.included, ''] }));
  };

  const removeIncludedField = (index) => {
    const newIncluded = formData.included.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, included: newIncluded }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.duration || !formData.price || !formData.imageUrl) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          included: formData.included.filter(item => item),
        }),
      });

      if (res.ok) {
        router.push('/admin/tours');
      } else {
        const data = await res.json();
        setError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Tour</h1>
              <p className="mt-2 text-gray-600">Add a new tour to your collection</p>
            </div>
            <Link
              href="/admin"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
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
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                URL Slug *
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                placeholder="e.g., cultural-immersion-tour"
              />
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                  Duration *
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
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price (USD) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  placeholder="e.g., 2500"
                />
              </div>
              <div>
                <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700 mb-2">
                  Group Size
                </label>
                <input
                  type="text"
                  id="groupSize"
                  name="groupSize"
                  value={formData.groupSize}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  placeholder="e.g., 2-8 people"
                />
              </div>
              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty
                </label>
                <input
                  type="text"
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                />
              </div>
              <div>
                <label htmlFor="bestTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Best Time to Visit
                </label>
                <input
                  type="text"
                  id="bestTime"
                  name="bestTime"
                  value={formData.bestTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  placeholder="e.g., March to May, September to November"
                />
              </div>
              <div>
                <label htmlFor="travelTheme" className="block text-sm font-medium text-gray-700 mb-2">
                  Travel Theme
                </label>
                <select
                  id="travelTheme"
                  name="travelTheme"
                  value={formData.travelTheme}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                >
                  <option value="">Select a theme</option>
                  {travelThemes.map((theme) => (
                    <option key={theme.title} value={theme.title}>
                      {theme.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What&apos;s Included
              </label>
              {formData.included.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleIncludedChange(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeIncludedField(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addIncludedField}
                className="mt-2 text-blue-600 hover:text-blue-800"
              >
                + Add Item
              </button>
            </div>
            <div>
              <ImageUpload onUpload={handleImageUpload} label="Tour Image *" />
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isHero"
                name="isHero"
                checked={formData.isHero}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="isHero" className="text-sm font-medium text-gray-700">
                Show in Hero Section
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                Featured Tour
              </label>
            </div>
            <div className="flex justify-end pt-4">
              <Link
                href="/admin"
                className="text-gray-600 px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 mr-4"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Tour'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 