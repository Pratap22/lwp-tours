"use client";
import Link from "next/link";

export default function AboutBhutanSection({ content }) {
  // Don't render if section is disabled
  if (!content?.isActive) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {content.title || "Bhutan travel, bespoke experiences"}
          </h2>
          <div className="text-lg text-gray-700 leading-relaxed mb-8 whitespace-pre-line">
            {content.content || `Located in the Himalayas, Bhutan is a truly breathtaking destination that has become increasingly popular among travelers in recent years. Bhutan's tourism philosophy is based on 'High Value, Low Impact' tourism, which aims to preserve the country's natural beauty and cultural heritage while providing visitors with a unique and authentic travel experience.

The Bhutanese have preserved a unique mix of culture, environment, and hospitality for centuries. It is a destination worth exploring. Discover and visit ancient fortresses, monasteries, beautiful landscapes, and a rich cultural tradition unlike any other place.

Visit Bhutan, where the old and current eras blend with the beautiful landscapes to create a unique journey. As a local Bhutan tour operator, we promise a variety of fulfilling experiences for your memorable trip to Bhutan.`}
          </div>
          <Link
            href={content.ctaLink || "/about-us"}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            {content.ctaText || "Meet our team"}
          </Link>
        </div>
      </div>
    </section>
  );
} 