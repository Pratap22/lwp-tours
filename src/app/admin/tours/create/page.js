'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUploader from '../../../components/ImageUploader';
import StickyFooter from '../../components/StickyFooter';
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
    excluded: [''],
    itinerary: [{ short: '', long: '' }],
    gallery: [],
  });
  const [travelThemes, setTravelThemes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchThemes() {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const data = await res.json();
          if (data.sections) {
            const travelThemesSection = data.sections.find(section => section.sectionId === 'travelThemes');
            if (travelThemesSection && travelThemesSection.themes) {
              setTravelThemes(travelThemesSection.themes);
              if (travelThemesSection.themes.length > 0) {
                setFormData(prev => ({ ...prev, travelTheme: travelThemesSection.themes[0].title }));
              }
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

  const handleSingleImageUpload = (url) => {
    setFormData(prev => ({ ...prev, imageUrl: url }));
  };

  const handleGalleryUpload = (urls) => {
    setFormData(prev => ({ ...prev, gallery: urls }));
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

  const handleExcludedChange = (index, value) => {
    const newExcluded = [...formData.excluded];
    newExcluded[index] = value;
    setFormData(prev => ({ ...prev, excluded: newExcluded }));
  };

  const addExcludedField = () => {
    setFormData(prev => ({ ...prev, excluded: [...formData.excluded, ''] }));
  };

  const removeExcludedField = (index) => {
    const newExcluded = formData.excluded.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, excluded: newExcluded }));
  };

  const handleItineraryChange = (index, field, value) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[index] = { ...newItinerary[index], [field]: value };
    setFormData(prev => ({ ...prev, itinerary: newItinerary }));
  };

  const addItineraryField = () => {
    setFormData(prev => ({ ...prev, itinerary: [...formData.itinerary, { short: '', long: '' }] }));
  };

  const removeItineraryField = (index) => {
    const newItinerary = formData.itinerary.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, itinerary: newItinerary }));
  };

  const handleSave = async () => {
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
          excluded: formData.excluded.filter(item => item),
          itinerary: formData.itinerary.filter(item => item.short && item.long),
          gallery: formData.gallery.filter(item => item),
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

  const handleCancel = () => {
    router.push('/admin/tours');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between py-6 px-4 sm:px-6 lg:px-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Tour</h1>
              <p className="mt-2 text-lg text-gray-600">Add a new tour to your collection</p>
            </div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 m-6 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="p-8 space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Basic Information</h2>
              
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-colors duration-200"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-colors duration-200"
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
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-colors duration-200"
                  placeholder="Describe the tour experience..."
                />
              </div>
            </div>

            {/* Images */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Images</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Tour Image *
                </label>
                <ImageUploader
                  currentImage={formData.imageUrl}
                  onImageUpload={handleSingleImageUpload}
                  folder="tours"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tour Gallery
                </label>
                <ImageUploader
                  currentImage={formData.gallery}
                  onImageUpload={handleGalleryUpload}
                  folder="tours"
                  multiple
                />
              </div>
            </div>

            {/* Tour Details */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Tour Details</h2>
              
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-colors duration-200"
                    placeholder="e.g., 7 days / 6 nights"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-colors duration-200"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-colors duration-200"
                    placeholder="e.g., Max 12 people"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-colors duration-200"
                    placeholder="e.g., Moderate"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-colors duration-200"
                    placeholder="e.g., March - May, Sept - Nov"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
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
            </div>

            {/* What's Included */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">What&apos;s Included</h2>
              {formData.included.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleIncludedChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="e.g., All meals"
                  />
                  <button 
                    type="button" 
                    onClick={() => removeIncludedField(index)} 
                    className="p-3 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={addIncludedField} 
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Item
              </button>
            </div>
            
            {/* What's Excluded */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">What&apos;s Excluded</h2>
              {formData.excluded.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleExcludedChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="e.g., International flights"
                  />
                  <button 
                    type="button" 
                    onClick={() => removeExcludedField(index)} 
                    className="p-3 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={addExcludedField} 
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Item
              </button>
            </div>

            {/* Itinerary */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Itinerary</h2>
              {formData.itinerary.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Day {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeItineraryField(index)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium hover:bg-red-50 px-3 py-1 rounded-lg transition-colors duration-200"
                    >
                      Remove Day
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Short Itinerary</label>
                      <input
                        type="text"
                        value={item.short}
                        onChange={(e) => handleItineraryChange(index, 'short', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Brief description of the day's activities"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Long Itinerary</label>
                      <textarea
                        value={item.long}
                        onChange={(e) => handleItineraryChange(index, 'long', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Detailed description of the day's activities, meals, accommodation, etc."
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addItineraryField}
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Day
              </button>
            </div>
            
            {/* Tour Settings */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Tour Settings</h2>
              
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <input 
                  type="checkbox" 
                  id="isHero" 
                  name="isHero" 
                  checked={formData.isHero} 
                  onChange={handleInputChange} 
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="isHero" className="text-sm font-medium text-gray-700">
                  Show in Hero Section on Homepage
                </label>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <input 
                  type="checkbox" 
                  id="featured" 
                  name="featured" 
                  checked={formData.featured} 
                  onChange={handleInputChange} 
                  className="h-5 w-5 text-green-600 rounded focus:ring-green-500"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                  Featured Tour on Tours Page
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <StickyFooter 
        onSave={handleSave}
        onCancel={handleCancel}
        saving={isSubmitting}
      />
    </div>
  );
} 