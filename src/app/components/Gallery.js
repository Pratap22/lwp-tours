"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Gallery() {
  const [galleryContent, setGalleryContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryContent();
  }, []);

  const fetchGalleryContent = async () => {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      setGalleryContent(data.gallery);
    } catch (error) {
      console.error('Error fetching gallery content:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fallback content if API fails or content is not available
  const fallbackImages = [
    { src: "/gallery-1.jpg", alt: "Tiger's Nest Monastery" },
    { src: "/gallery-2.jpg", alt: "Bhutanese Festival" },
    { src: "/gallery-3.jpg", alt: "Mountain Landscape" },
    { src: "/gallery-4.jpg", alt: "Traditional Dance" },
    { src: "/gallery-5.jpg", alt: "Prayer Flags" },
    { src: "/gallery-6.jpg", alt: "Punakha Dzong" }
  ];

  // Use database content if available, otherwise use fallback
  const images = galleryContent?.images?.filter(img => img.isActive) || fallbackImages;
  const title = galleryContent?.title || "Bhutan Photo Gallery";
  const subtitle = galleryContent?.subtitle || "Discover the Beauty of Bhutan";

  // Don't render if section is disabled
  if (!galleryContent?.isActive && !loading) {
    return null;
  }

  if (loading) {
    return (
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          <h3 className="text-2xl font-semibold text-gray-700 mb-8">
            {subtitle}
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div key={idx} className="overflow-hidden rounded-xl shadow-lg card-hover">
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={300}
                className="object-cover w-full h-60 hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 