"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageUploader from "../../../../components/ImageUploader";
import StickyFooter from "../../../components/StickyFooter";
import { generateSlug } from "../../../../lib/utils";
import Image from "next/image";

export default function EditTour({ params }) {
  const router = useRouter();
  const { slug } = use(params);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    duration: "",
    price: "",
    imageUrl: "",
    groupSize: "",
    difficulty: "",
    bestTime: "",
    isHero: false,
    featured: false,
    travelTheme: "",
    included: [],
    excluded: [],
    itinerary: [],
    gallery: [],
  });
  const [travelThemes, setTravelThemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTourAndThemes = async () => {
      try {
        // Fetch themes
        const themesRes = await fetch('/api/content');
        if (themesRes.ok) {
          const themesData = await themesRes.json();
          if (themesData.sections) {
            const travelThemesSection = themesData.sections.find(section => section.sectionId === 'travelThemes');
            if (travelThemesSection && travelThemesSection.themes) {
              setTravelThemes(travelThemesSection.themes);
            }
          }
        }

        // Fetch tour
        const tourRes = await fetch(`/api/tours/${slug}`);
        if (!tourRes.ok) throw new Error("Failed to fetch tour");
        const tour = await tourRes.json();
        
        setFormData({
          title: tour.title,
          slug: tour.slug,
          description: tour.description,
          duration: tour.duration,
          price: tour.price,
          imageUrl: tour.imageUrl || tour.image,
          groupSize: tour.groupSize,
          difficulty: tour.difficulty,
          bestTime: tour.bestTime,
          isHero: tour.isHero,
          featured: tour.featured || false,
          travelTheme: tour.travelTheme || "",
          included: tour.included || [],
          excluded: tour.excluded || [],
          itinerary: tour.itinerary || [],
          gallery: tour.gallery || [],
        });

      } catch (err) {
        console.error(err);
        setError("Failed to load tour data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTourAndThemes();
  }, [slug]);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === "title") {
      setFormData((prev) => ({ ...prev, slug: generateSlug(value) }));
    }
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

  const handleImageUpload = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: imageUrl,
    }));
  };

  const handleGalleryUpload = (urls) => {
    setFormData((prev) => ({
      ...prev,
      gallery: urls,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");

    try {
      const tourData = {
        ...formData,
        included: formData.included.filter(item => item),
        excluded: formData.excluded.filter(item => item),
        itinerary: formData.itinerary.filter(item => item.short && item.long),
        gallery: formData.gallery.filter(item => item),
      };

      const response = await fetch(`/api/tours/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tourData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update tour");
      }

      router.push("/admin/tours");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/tours");
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between py-6 px-4 sm:px-6 lg:px-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Tour</h1>
              <p className="mt-2 text-lg text-gray-600">Update tour information for &quot;{formData.title}&quot;</p>
            </div>
            <Link
              href="/admin/tours"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Tours
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
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Tour Title *</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-colors duration-200"
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">URL Slug *</label>
                <input 
                  type="text" 
                  id="slug" 
                  name="slug" 
                  value={formData.slug} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-colors duration-200"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea 
                  id="description" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  required 
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-colors duration-200"
                ></textarea>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Images</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Main Tour Image *</label>
                <ImageUploader 
                  onUpload={handleImageUpload}
                  initialUrls={formData.imageUrl ? [formData.imageUrl] : []}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tour Gallery</label>
                <ImageUploader 
                  onUpload={handleGalleryUpload}
                  initialUrls={formData.gallery}
                  multiple
                />
              </div>
            </div>

            {/* Tour Details */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Tour Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
                  <input 
                    type="text" 
                    id="duration" 
                    name="duration" 
                    value={formData.duration} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Price (USD) *</label>
                  <input 
                    type="number" 
                    id="price" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700 mb-2">Group Size</label>
                  <input 
                    type="text" 
                    id="groupSize" 
                    name="groupSize" 
                    value={formData.groupSize} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <input 
                    type="text" 
                    id="difficulty" 
                    name="difficulty" 
                    value={formData.difficulty} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="bestTime" className="block text-sm font-medium text-gray-700 mb-2">Best Time to Visit</label>
                  <input 
                    type="text" 
                    id="bestTime" 
                    name="bestTime" 
                    value={formData.bestTime} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="travelTheme" className="block text-sm font-medium text-gray-700 mb-2">Travel Theme</label>
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
                  Show in Hero Section
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
                  Featured Tour
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
        saving={isSaving}
      />
    </div>
  );
}
