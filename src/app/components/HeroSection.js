"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

async function getHeroTours() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tours`, {
      cache: 'no-store'
    });
    const data = await res.json();
    return data.tours.filter(tour => tour.isHero);
  } catch (error) {
    console.error('Error fetching hero tours:', error);
    return [];
  }
}

export default function HeroSection({ heroTours = [] }) {
  console.log(heroTours)
  const [current, setCurrent] = useState(0);
  const length = heroTours.length;

  useEffect(() => {
    if (!length) return;
    
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearTimeout(timer);
  }, [current, length]);

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent((current + 1) % length);
  };

  if (!heroTours.length) {
    return null;
  }

  return (
    <section className="relative h-[600px] md:h-[500px]">
      {/* Main Carousel */}
      <div className="relative h-full overflow-hidden">
        {heroTours.map((tour, index) => (
          <div
            key={tour._id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="relative w-full h-full">
              <Image 
                src={tour.imageUrl}
                alt={tour.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 max-w-3xl">
                  {tour.title}
                </h2>
                <p className="text-lg md:text-xl mb-8 max-w-2xl">
                  {tour.description}
                </p>
                <Link
                  href={`/tours/${tour.slug}`}
                  className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  View Tour
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors duration-200"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {heroTours.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === current ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// Awards Section Component
function AwardsSection() {
  const [awardsContent, setAwardsContent] = useState(null);

  useEffect(() => {
    fetchAwardsContent();
  }, []);

  const fetchAwardsContent = async () => {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      setAwardsContent(data.awards);
    } catch (error) {
      console.error('Error fetching awards content:', error);
    }
  };

  // Don't render if section is disabled
  if (!awardsContent?.isActive) {
    return null;
  }

  const awards = awardsContent?.items?.filter(item => item.isActive) || [
    { icon: "🏆", title: "Travel Excellence Awards" },
    { icon: "🤝", title: "Trustworthy Travels" },
    { icon: "💰", title: "Exceptional value" }
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{award.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {award.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// About Bhutan Section Component
function AboutBhutanSection() {
  const [aboutContent, setAboutContent] = useState(null);

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      setAboutContent(data.aboutBhutan);
    } catch (error) {
      console.error('Error fetching about content:', error);
    }
  };

  // Don't render if section is disabled
  if (!aboutContent?.isActive) {
    return null;
  }

  const fallbackContent = {
    title: "Bhutan travel, bespoke experiences",
    content: "Located in the Himalayas, Bhutan is a truly breathtaking destination that has become increasingly popular among travelers in recent years. Bhutan's tourism philosophy is based on 'High Value, Low Impact' tourism, which aims to preserve the country's natural beauty and cultural heritage while providing visitors with a unique and authentic travel experience.\n\nThe Bhutanese have preserved a unique mix of culture, environment, and hospitality for centuries. It is a destination worth exploring. Discover and visit ancient fortresses, monasteries, beautiful landscapes, and a rich cultural tradition unlike any other place.\n\nVisit Bhutan, where the old and current eras blend with the beautiful landscapes to create a unique journey. As a local Bhutan tour operator, we promise a variety of fulfilling experiences for your memorable trip to Bhutan.",
    ctaText: "Meet our team",
    ctaLink: "/about-us"
  };

  const content = aboutContent || fallbackContent;

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {content.title}
          </h2>
          <div className="max-w-4xl mx-auto text-lg text-gray-600 leading-relaxed">
            {content.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link
            href={content.ctaLink}
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            {content.ctaText}
          </Link>
        </div>
      </div>
    </div>
  );
}

// Custom Journey Section Component
function CustomJourneySection() {
  const [journeyContent, setJourneyContent] = useState(null);

  useEffect(() => {
    fetchJourneyContent();
  }, []);

  const fetchJourneyContent = async () => {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      setJourneyContent(data.customJourney);
    } catch (error) {
      console.error('Error fetching journey content:', error);
    }
  };

  // Don't render if section is disabled
  if (!journeyContent?.isActive) {
    return null;
  }

  const fallbackContent = {
    title: "Custom-Made Journey",
    content: "At Bhutan Travel Center, we create more than just trips—we craft personalized experiences. Whether you're looking for deep cultural immersion, exclusive adventures or a romantic getaway, we design seamless journeys tailored to your needs.",
    ctaText: "speak to us",
    themeTitle: "Travel Theme",
    themeContent: "Find your perfect experience with our personalized trips that match your interests."
  };

  const content = journeyContent || fallbackContent;

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {content.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {content.content}
            </p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-200">
              {content.ctaText}
            </button>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-green-100 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {content.themeTitle}
            </h3>
            <p className="text-gray-600">
              {content.themeContent}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
