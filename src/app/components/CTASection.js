"use client";
import Link from 'next/link';

export default function CTASection({ content }) {
  if (!content) {
    return null;
  }

  return (
    <section className="bg-gray-800 text-white">
      <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold sm:text-4xl">
          {content.title || "Begin Your Unforgettable Journey"}
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          {content.content || "You are not just a tourist to us; you are our guest. Let us show you the heart and soul of our beautiful kingdom."}
        </p>
        <div className="mt-8">
          <Link
            href={content.ctaLink || '/contact-us'}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            {content.ctaText || "Start Planning Today"}
          </Link>
        </div>
      </div>
    </section>
  );
} 