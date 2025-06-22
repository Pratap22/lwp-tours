'use client';
import Image from "next/image";
import { UsersIcon, MapPinIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import Link from "next/link";

const AboutUs = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch('/api/content');
        const data = await response.json();
        const aboutUsSection = data.sections?.find(section => section.sectionId === 'about-us');
        setPageData(aboutUsSection);
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
    };
    return iconMap[iconName] || UsersIcon;
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-800 h-96">
        <Image
          src={pageData.hero?.image || "/gallery-2.jpg"}
          alt={pageData.hero?.alt || "Mountain landscape"}
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-5xl font-extrabold mb-4 text-shadow">{pageData.hero?.title || 'About LWP Travel & Tours'}</h1>
            <p className="text-xl max-w-3xl text-shadow">
              {pageData.hero?.subtitle || 'Crafting authentic, memorable, and personalized journeys through the heart of Bhutan.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">{pageData.title || 'Welcome to Your Bhutan Adventure'}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {pageData.subtitle || 'At LWP Travel & Tours, we don’t just sell tours; we craft lifelong memories. As a premier, locally-owned tour operator based in the heart of Bhutan, we are passionate about sharing the magic of our kingdom with you. Our team of dedicated local experts leverages deep-rooted knowledge and a love for our heritage to design unique, immersive experiences that go beyond the typical tourist trails.'}
          </p>
        </div>
      </section>

      {/* Our Values */}
      {pageData.values && pageData.values.length > 0 && (
        <section className="bg-gray-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {pageData.values.map((value, index) => {
                const IconComponent = getIconComponent(value.icon);
                return (
                  <div key={index}>
                    <IconComponent className="h-12 w-12 text-blue-600 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {pageData.teamMembers && pageData.teamMembers.length > 0 && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {pageData.teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                  <Image src={member.image || 'https://via.placeholder.com/400'} alt={member.name} width={400} height={400} objectFit="cover" />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mb-3">{member.position}</p>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    {member.links && member.links.length > 0 && (
                      <div className="flex justify-center space-x-4">
                        {member.links.map((link, linkIndex) => (
                          <a key={linkIndex} href={link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z"/></svg>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AboutUs;