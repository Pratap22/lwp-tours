import Link from 'next/link';
import { generateSlug } from '../lib/utils';

export default function TravelThemes({ content }) {
  // Don't render if section is disabled or no items exist
  if (!content?.isActive || !content?.themes?.length) {
    return null;
  }

  const title = content.title || "Find Your Perfect Experience";
  const subtitle = content.subtitle || "Whatever your travel style, we have a journey that's right for you. Explore our curated themes and find the adventure that awaits.";
  const buttonText = content.buttonText || "Explore our Tours";

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.themes.map((theme, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-8 text-center transform hover:-translate-y-2 transition-transform duration-300 ease-in-out"
            >
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto"
                style={{ backgroundColor: theme.iconBackgroundColor || '#3b82f6' }}
              >
                <span className="text-4xl">{theme.icon}</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {theme.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {theme.description}
              </p>
              <Link href={`/tours?theme=${generateSlug(theme.title)}`} className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 text-lg">
                Learn More →
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/tours" className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-transform duration-300 ease-in-out inline-block transform hover:scale-105">
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
} 