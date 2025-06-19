"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const heroExperiences = [
    {
      title: "True Cultural Immersion",
      subtitle: "Experience Bhutan&apos;s deeply spiritual culture and rich traditions.",
      image: "/hero-cultural.jpg",
      cta: "View Trips",
    },
    {
      title: "Bhutan's Festival Experience",
      subtitle: "Explore Bhutan&apos;s spiritual depth at its lively festivals",
      image: "/hero-festival.jpg",
      cta: "View Trips",
    },
    {
      title: "Trekking And Adventures",
      subtitle: "Explore Challenging Trails And Connect With Bhutan&apos;s Natural Beauty.",
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

  const [current, setCurrent] = useState(0);
  const length = heroExperiences.length;

  // Autoplay effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [current, length]);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % length);

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
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Travel Excellence Awards
              </h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Trustworthy Travels
              </h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Exceptional value
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* About Bhutan Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Bhutan travel, bespoke experiences
            </h2>
            <div className="max-w-4xl mx-auto text-lg text-gray-600 leading-relaxed">
              <p className="mb-6">
                Located in the Himalayas, Bhutan is a truly breathtaking
                destination that has become increasingly popular among travelers
                in recent years. Bhutan&apos;s tourism philosophy is based on &apos;High
                Value, Low Impact&apos; tourism, which aims to preserve the country&apos;s
                natural beauty and cultural heritage while providing visitors
                with a unique and authentic travel experience.
              </p>
              <p className="mb-6">
                The Bhutanese have preserved a unique mix of culture,
                environment, and hospitality for centuries. It is a destination
                worth exploring. Discover and visit ancient fortresses,
                monasteries, beautiful landscapes, and a rich cultural tradition
                unlike any other place.
              </p>
              <p>
                Visit Bhutan, where the old and current eras blend with the
                beautiful landscapes to create a unique journey. As a local
                Bhutan tour operator, we promise a variety of fulfilling
                experiences for your memorable trip to Bhutan.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/about-us"
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Meet our team
            </Link>
          </div>
        </div>
      </div>

      {/* Custom Journey Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Custom-Made Journey
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                At Bhutan Travel Center, we create more than just trips—we craft
                personalized experiences. Whether you&apos;re looking for deep
                cultural immersion, exclusive adventures or a romantic getaway,
                we design seamless journeys tailored to your needs.
              </p>
              <button className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-200">
                speak to us
              </button>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-green-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Travel Theme
              </h3>
              <p className="text-gray-600">
                Find your perfect experience with our personalized trips that
                match your interests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
