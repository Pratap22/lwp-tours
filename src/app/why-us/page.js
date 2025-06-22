'use client';

import Image from "next/image";
import Link from "next/link";
import { UsersIcon, MapPinIcon, HeartIcon, PhoneIcon, CheckBadgeIcon, StarIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export default function WhyUs() {
  const [pageData, setPageData] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch('/api/content');
        const data = await response.json();
        const whyUsSection = data.sections?.find(section => section.sectionId === 'why-us');
        const testimonialsSection = data.sections?.find(section => section.sectionId === 'testimonials');
        
        setPageData(whyUsSection);
        if (testimonialsSection?.testimonials) {
          setTestimonials(testimonialsSection.testimonials.filter(t => t.isActive));
        }

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
      'UsersIcon': UsersIcon,
      'MapPinIcon': MapPinIcon,
      'HeartIcon': HeartIcon,
      'PhoneIcon': PhoneIcon,
      'CheckBadgeIcon': CheckBadgeIcon,
      'StarIcon': StarIcon,
    };
    return iconMap[iconName] || UsersIcon;
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-800 h-96">
        <Image
          src={pageData.hero?.image || "/gallery-1.jpg"}
          alt="Why Us Background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-5xl font-extrabold mb-4 text-shadow">{pageData.hero?.title || 'Why Travel with Us?'}</h1>
            <p className="text-xl max-w-3xl text-shadow">
              {pageData.hero?.subtitle || 'Experience Bhutan differently. Discover the genuine connection, expertise, and passion that set us apart.'}
            </p>
          </div>
        </div>
      </div>

      {/* Differentiators Grid */}
      {pageData.reasons && pageData.reasons.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{pageData.title || 'The LWP Travel & Tours Difference'}</h2>
              <p className="text-lg text-gray-600">{pageData.subtitle || 'What makes our journeys unforgettable.'}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {pageData.reasons.map((item, index) => {
                const IconComponent = getIconComponent(item.icon);
                return (
                  <div key={index} className="text-center p-8 bg-white rounded-xl shadow-md card-hover">
                    <IconComponent className="h-12 w-12 text-blue-600 mx-auto mb-6"/>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
      
      {/* Testimonial Spotlight */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-20 bg-blue-600 overflow-hidden">
          <div className="relative group">
            <div className="flex animate-scroll-full group-hover:animate-paused">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-[95%] md:w-1/2">
                  <div className="p-4 h-full">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white h-full flex flex-col justify-between">
                      <div>
                        <div className="flex text-yellow-300 mb-4">
                          {[...Array(testimonial.rating || 5)].map((_, i) => (
                            <StarIcon key={i} className="w-5 h-5" />
                          ))}
                        </div>
                        <p className="text-lg leading-relaxed italic">&quot;{testimonial.content}&quot;</p>
                      </div>
                      <cite className="mt-6 text-md font-semibold not-italic self-end">- {testimonial.name}, {testimonial.location}</cite>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Promise Section */}
      {pageData.steps && pageData.steps.length > 0 && (
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">Our Promise to You</h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
              {pageData.steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 text-blue-600 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl font-bold">{step.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Begin Your Unforgettable Journey</h2>
          <p className="text-lg opacity-90 mb-8">
            You are not just a tourist to us; you are our guest. Let us show you the heart and soul of our beautiful kingdom.
          </p>
          <Link
            href="/contact-us"
            className="inline-block bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-blue-500 transition-all duration-300 shadow-lg"
          >
            Start Planning Today
          </Link>
        </div>
      </section>
    </div>
  );
} 