"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { use } from "react";
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
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`/api/tours/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch tour");
        const tour = await res.json();

        // Extract number of nights from duration string
        let durationNights = "";
        if (tour.duration) {
          const match = tour.duration.match(/(\d+)\s*Nights?/i);
          if (match) {
            durationNights = match[1];
          } else {
            // Fallback: try to extract any number from the duration
            const numberMatch = tour.duration.match(/(\d+)/);
            if (numberMatch) {
              durationNights = numberMatch[1];
            }
          }
        }

        setFormData({
          title: tour.title,
          slug: tour.slug,
          description: tour.description,
          duration: durationNights,
          price: tour.price,
          imageUrl: tour.imageUrl || tour.image,
          groupSize: tour.groupSize,
          difficulty: tour.difficulty,
          bestTime: tour.bestTime,
          isHero: tour.isHero,
          featured: tour.featured || false,
        });
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load tour");
        setIsLoading(false);
      }
    };

    fetchTour();
  }, [slug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate slug from title
    if (name === "title") {
      const slug = generateSlug(value);
      setFormData((prev) => ({
        ...prev,
        slug: slug,
      }));
    }
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
        duration: formattedDuration,
      };

      const response = await fetch(`/api/tours/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tourData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update tour");
      }

      const result = await response.json();
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

  if (error && error === "Tour not found") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Tour Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The tour you&apos;re trying to edit doesn&apos;t exist.
          </p>
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
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
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
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
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
              <p className="mt-1 text-sm text-gray-500">
                This will be used in the URL: /tours/your-slug
              </p>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
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
                placeholder="Describe the tour experience..."
              />
            </div>

            {/* Duration */}
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Duration (Nights) *
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                placeholder="e.g., 7"
              />
              <p className="mt-1 text-sm text-gray-500">
                Enter the number of nights. Days will be calculated
                automatically (nights + 1).
              </p>
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
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

            {/* Group Size */}
            <div>
              <label
                htmlFor="groupSize"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Group Size *
              </label>
              <input
                type="text"
                id="groupSize"
                name="groupSize"
                value={formData.groupSize}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                placeholder="e.g., 2-8 people"
              />
            </div>

            {/* Difficulty */}
            <div>
              <label
                htmlFor="difficulty"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Difficulty Level *
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              >
                <option value="">Select difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Challenging">Challenging</option>
                <option value="Difficult">Difficult</option>
              </select>
            </div>

            {/* Best Time */}
            <div>
              <label
                htmlFor="bestTime"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Best Time to Visit *
              </label>
              <input
                type="text"
                id="bestTime"
                name="bestTime"
                value={formData.bestTime}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                placeholder="e.g., March to May, September to November"
              />
            </div>

            {/* Image Upload */}
            <div>
              <ImageUpload
                onImageUpload={handleImageUpload}
                label="Tour Image *"
                currentImage={formData.imageUrl}
              />
            </div>

            {/* Is Hero Tour */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isHero"
                name="isHero"
                checked={formData.isHero}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, isHero: e.target.checked }))
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isHero"
                className="text-sm font-medium text-gray-700"
              >
                Show in Hero Section
              </label>
            </div>

            {/* Featured Tour */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    featured: e.target.checked,
                  }))
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="featured"
                className="text-sm font-medium text-gray-700"
              >
                Featured Tour
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className={`px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors ${
                  isSaving ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
