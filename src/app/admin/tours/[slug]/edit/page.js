"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageUpload from "../../../../components/ImageUpload";
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
          if (themesData.travelThemes && themesData.travelThemes.themes) {
            setTravelThemes(themesData.travelThemes.themes);
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

  const handleImageUpload = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: imageUrl,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      const tourData = {
        ...formData,
        included: formData.included.filter(item => item),
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Tour</h1>
              <p className="mt-2 text-gray-600">Update tour information for &quot;{formData.title}&quot;</p>
            </div>
            <Link
              href="/admin/tours"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Tours
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Tour Title *</label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"/>
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">URL Slug *</label>
              <input type="text" id="slug" name="slug" value={formData.slug} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"/>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required rows={6} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
                <input type="text" id="duration" name="duration" value={formData.duration} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"/>
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Price (USD) *</label>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"/>
              </div>
              <div>
                <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700 mb-2">Group Size</label>
                <input type="text" id="groupSize" name="groupSize" value={formData.groupSize} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"/>
              </div>
              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <input type="text" id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"/>
              </div>
              <div>
                <label htmlFor="bestTime" className="block text-sm font-medium text-gray-700 mb-2">Best Time to Visit</label>
                <input type="text" id="bestTime" name="bestTime" value={formData.bestTime} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"/>
              </div>
              <div>
                <label htmlFor="travelTheme" className="block text-sm font-medium text-gray-700 mb-2">Travel Theme</label>
                <select id="travelTheme" name="travelTheme" value={formData.travelTheme} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">What&apos;s Included</label>
              {formData.included.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input type="text" value={item} onChange={(e) => handleIncludedChange(index, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"/>
                  <button type="button" onClick={() => removeIncludedField(index)} className="ml-2 text-red-600 hover:text-red-800">Remove</button>
                </div>
              ))}
              <button type="button" onClick={addIncludedField} className="mt-2 text-blue-600 hover:text-blue-800">+ Add Item</button>
            </div>

            <div>
              <ImageUpload
                onImageUpload={handleImageUpload}
                label="Tour Image *"
                currentImage={formData.imageUrl}
              />
            </div>

            <div className="flex items-center space-x-3">
              <input type="checkbox" id="isHero" name="isHero" checked={formData.isHero} onChange={handleInputChange} className="h-4 w-4 text-blue-600 rounded"/>
              <label htmlFor="isHero" className="text-sm font-medium text-gray-700">Show in Hero Section</label>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleInputChange} className="h-4 w-4 text-blue-600 rounded"/>
              <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured Tour</label>
            </div>

            <div className="flex justify-end pt-4">
              <Link href="/admin/tours" className="text-gray-600 px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 mr-4">Cancel</Link>
              <button type="submit" disabled={isSaving} className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
