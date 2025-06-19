"use client";
import Link from "next/link";

export default function CustomJourneySection({ content }) {
  // Don't render if section is disabled
  if (!content?.isActive) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {content.title || "Custom-Made Journey"}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {content.content || "At Bhutan Travel Center, we create more than just trips—we craft personalized experiences. Whether you're looking for deep cultural immersion, exclusive adventures or a romantic getaway, we design seamless journeys tailored to your needs."}
            </p>
            <Link
              href="/contact-us"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              {content.ctaText || "speak to us"}
            </Link>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {content.themeTitle || "Travel Theme"}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {content.themeContent || "Find your perfect experience with our personalized trips that match your interests."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 