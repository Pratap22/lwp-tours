"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const [heroContent, setHeroContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const fetchHeroContent = async () => {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      setHeroContent(data.heroCarousel);
    } catch (error) {
      console.error('Error fetching hero content:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fallback content if API fails or content is not available
  const fallbackHeroExperiences = [
    {
      title: "True Cultural Immersion",
      subtitle: "Experience Bhutan's deeply spiritual culture and rich traditions.",
      image: "/hero-cultural.jpg",
      cta: "View Trips",
    },
    {
      title: "Bhutan's Festival Experience",
      subtitle: "Explore Bhutan's spiritual depth at its lively festivals",
      image: "/hero-festival.jpg",
      cta: "View Trips",
    },
    {
      title: "Trekking And Adventures",
      subtitle: "Explore Challenging Trails And Connect With Bhutan's Natural Beauty.",
      image: "/hero-trekking.jpg",
      cta: "View Trips",
    },
    {
      title: "Bhutan in Luxury",
      subtitle: "Experience Bhutan in ultimate luxury and comfort",
      image: "/hero-luxury.jpg",
      cta: "View Trips",
    },
  ];

  // Use database content if available, otherwise use fallback
  const heroExperiences = heroContent?.slides?.filter(slide => slide.isActive) || fallbackHeroExperiences;
  const autoplaySpeed = heroContent?.autoplaySpeed || 4000;

  const [current, setCurrent] = useState(0);
  const length = heroExperiences.length;

  // Autoplay effect
  useEffect(() => {
    if (!heroContent?.isActive) return;
    
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, autoplaySpeed);
    return () => clearTimeout(timer);
  }, [current, length, autoplaySpeed, heroContent?.isActive]);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % length);

  // Don't render if section is disabled
  if (!heroContent?.isActive && !loading) {
    return null;
  }

  if (loading) {
    return (
      <div className="relative h-[80vh] md:h-[90vh] w-full bg-gray-200 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <section className="relative">
      {/* Hero Experiences Carousel as Main Hero Banner */}
      <div className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={heroExperiences[current].image}
              alt={heroExperiences[current].title}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>
        {/* Overlayed Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            {heroExperiences[current].title}
          </h1>
          <p className="text-lg md:text-2xl text-white mb-8 font-medium drop-shadow-lg">
            {heroExperiences[current].subtitle}
          </p>
          <button className="bg-white/80 text-blue-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-white transition-colors duration-200 shadow">
            {heroExperiences[current].cta}
          </button>
        </div>
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-3 z-20 text-2xl"
          aria-label="Previous"
        >
          &#8592;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-3 z-20 text-2xl"
          aria-label="Next"
        >
          &#8594;
        </button>
        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroExperiences.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full border-2 border-white ${
                idx === current ? "bg-white" : "bg-transparent"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Awards Section */}
      <AwardsSection />

      {/* About Bhutan Section */}
      <AboutBhutanSection />

      {/* Custom Journey Section */}
      <CustomJourneySection />
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
