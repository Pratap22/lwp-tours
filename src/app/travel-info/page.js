'use client';

import Image from "next/image";
import Link from "next/link";
import Accordion from "../components/Accordion";
import { GlobeAltIcon, SunIcon, ShieldCheckIcon, CurrencyDollarIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export default function TravelInfo() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch('/api/content');
        const data = await response.json();
        const travelInfoSection = data.sections?.find(section => section.sectionId === 'travel-info');
        setPageData(travelInfoSection);
      } catch (error) {
        console.error('Error fetching page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Page content not found.</p>
        </div>
      </div>
    );
  }

  const getIconComponent = (iconName) => {
    const iconMap = {
      'GlobeAltIcon': GlobeAltIcon,
      'SunIcon': SunIcon,
      'ShieldCheckIcon': ShieldCheckIcon,
      'CurrencyDollarIcon': CurrencyDollarIcon,
      'BriefcaseIcon': BriefcaseIcon,
    };
    return iconMap[iconName] || GlobeAltIcon;
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-96">
        <Image
          src={pageData.hero?.image || "/hero-cultural.jpg"}
          alt="About Us Hero"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 to-transparent">
          <div className="text-center text-white p-4">
            <h1 className="text-5xl font-extrabold mb-4 text-shadow-md">{pageData.hero?.title || 'About LWP Travel & Tours'}</h1>
            <p className="text-xl max-w-2xl text-shadow-md">
              {pageData.hero?.subtitle || 'Your trusted local experts for unforgettable journeys in the Land of the Thunder Dragon.'}
            </p>
          </div>
        </div>
      </div>

      {/* Key Info Grid */}
      {pageData.items && pageData.items.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {pageData.items.map((item, index) => {
                const IconComponent = getIconComponent(item.icon);
                return (
                  <div key={index} className="text-center p-8 bg-white rounded-xl shadow-md card-hover">
                    <IconComponent className="h-12 w-12 text-blue-600 mx-auto mb-4"/>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
      
      {/* FAQ Section */}
      {pageData.faqs && pageData.faqs.length > 0 && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">Quick answers to common questions.</p>
            </div>
            <Accordion items={pageData.faqs} />
          </div>
        </section>
      )}

      {/* Packing Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BriefcaseIcon className="h-12 w-12 text-blue-600 mx-auto mb-4"/>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">What to Pack</h2>
          <p className="text-lg text-gray-700 mb-8">
            Dressing in layers is key. Bhutan&apos;s weather can change quickly. Here&apos;s a basic list:
          </p>
          <ul className="text-left list-disc list-inside bg-white p-8 rounded-xl shadow-md space-y-3 text-gray-700">
            <li>Comfortable walking shoes or hiking boots.</li>
            <li>Warm layers: fleece jacket, thermal underwear, sweaters.</li>
            <li>Waterproof and windproof jacket.</li>
            <li>Modest clothing for visiting temples (long sleeves, long pants).</li>
            <li>Sunscreen, sunglasses, and a hat.</li>
            <li>Personal medications and a basic first-aid kit.</li>
            <li>Camera and extra batteries.</li>
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Have More Questions?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our team is here to help you prepare for the trip of a lifetime. Don&apos;t hesitate to reach out with any questions.
          </p>
          <Link
            href="/contact-us"
            className="inline-block bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
