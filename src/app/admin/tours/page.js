'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ManageTours() {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await fetch('/api/tours');
      if (!response.ok) throw new Error('Failed to fetch tours');
      const data = await response.json();
      // Handle the new API response structure where tours are nested
      setTours(data.tours || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (tourSlug) => {
    if (!confirm('Are you sure you want to delete this tour?')) return;

    try {
      const response = await fetch(`/api/tours/${tourSlug}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete tour');
      
      // Remove the tour from the list
      setTours(tours.filter(tour => tour.slug !== tourSlug));
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Tours</h1>
              <p className="mt-2 text-gray-600">View, edit, and delete your tours</p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/admin"
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Dashboard
              </Link>
              <Link
                href="/admin/tours/create"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create New Tour
              </Link>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(tours) && tours.map((tour) => (
            <div key={tour._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Tour Image */}
              <div className="relative h-48">
                <Image
                  src={tour.imageUrl}
                  alt={tour.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Tour Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{tour.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-green-600 font-semibold">${tour.price}</span>
                  <span className="text-gray-500 text-sm">{tour.duration}</span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Link
                    href={`/tours/${tour.slug}`}
                    target="_blank"
                    className="flex-1 text-center px-3 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/tours/${tour.slug}/edit`}
                    className="flex-1 text-center px-3 py-2 text-sm text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(tour.slug)}
                    className="flex-1 px-3 py-2 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(!Array.isArray(tours) || tours.length === 0) && !isLoading && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No tours</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new tour.</p>
            <div className="mt-6">
              <Link
                href="/admin/tours/create"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Create Tour
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 