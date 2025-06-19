'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Tours() {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');

  useEffect(() => {
    async function fetchTours() {
      try {
        const res = await fetch('/api/tours', {
          next: { 
            revalidate: 3600 // Cache for 1 hour
          }
        });
        if (!res.ok) throw new Error('Failed to fetch tours');
        const data = await res.json();
        setTours(data.tours || []);
        setFilteredTours(data.tours || []);
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTours();
  }, []);

  useEffect(() => {
    let filtered = tours;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(tour =>
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    if (priceFilter !== 'all') {
      const [min, max] = priceFilter.split('-').map(Number);
      filtered = filtered.filter(tour => {
        if (max) {
          return tour.price >= min && tour.price <= max;
        } else {
          return tour.price >= min;
        }
      });
    }

    // Duration filter
    if (durationFilter !== 'all') {
      filtered = filtered.filter(tour => {
        const days = parseInt(tour.duration.match(/\d+/)[0]);
        if (durationFilter === 'short') return days <= 5;
        if (durationFilter === 'medium') return days > 5 && days <= 8;
        if (durationFilter === 'long') return days > 8;
        return true;
      });
    }

    setFilteredTours(filtered);
  }, [tours, searchTerm, priceFilter, durationFilter]);

  if (loading) {
    return (
      <main className="bg-white min-h-[70vh] mx-auto py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tours...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-[70vh] mx-auto py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-blue-900 text-center">Our Tours</h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Discover the magic of Bhutan with our carefully curated tours. From cultural immersions to adventure treks, 
          we offer experiences that will create lasting memories.
        </p>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search tours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-72 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            />
            {/* Price Filter */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full md:w-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            >
              <option value="all">All Prices</option>
              <option value="0-2000">Under $2,000</option>
              <option value="2000-3000">$2,000 - $3,000</option>
              <option value="3000-">Over $3,000</option>
            </select>
            {/* Duration Filter */}
            <select
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
              className="w-full md:w-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            >
              <option value="all">All Durations</option>
              <option value="short">Short (1-5 days)</option>
              <option value="medium">Medium (6-8 days)</option>
              <option value="long">Long (9+ days)</option>
            </select>
            {/* Clear Filters */}
            {(searchTerm || priceFilter !== 'all' || durationFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setPriceFilter('all');
                  setDurationFilter('all');
                }}
                className="px-4 py-3 text-blue-600 hover:text-blue-800 font-semibold border border-blue-100 rounded-lg bg-blue-50"
              >
                Clear Filters
              </button>
            )}
          </div>
          {/* Results Count */}
          <div className="text-center text-gray-600 mt-6">
            {filteredTours.length} of {tours.length} tours found
          </div>
        </div>
        
        {filteredTours.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tours match your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setPriceFilter('all');
                setDurationFilter('all');
              }}
              className="mt-4 text-blue-600 hover:text-blue-800 font-semibold"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <div key={tour._id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={tour.imageUrl}
                    alt={tour.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 text-blue-900 line-clamp-2">{tour.title}</h2>
                  <p className="text-blue-600 font-semibold mb-3">{tour.duration}</p>
                  <p className="text-gray-600 mb-4 line-clamp-3">{tour.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">${tour.price}</span>
                    <Link
                      href={`/tours/${tour.slug}`}
                      className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 