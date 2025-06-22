"use client";
import Link from "next/link";

export default function AboutBhutanSection({ content }) {
  const fallbackContent = {
    title: 'Bhutan travel, bespoke experiences',
    content:
      "Located in the Himalayas, Bhutan is a truly breathtaking destination that has become increasingly popular among travelers in recent years. Bhutan's tourism philosophy is based on 'High Value, Low Impact' tourism, which aims to preserve the country's natural beauty and cultural heritage while providing visitors with a unique and authentic travel experience.\\n\\nThe Bhutanese have preserved a unique mix of culture, environment, and hospitality for centuries. It is a destination worth exploring. Discover and visit ancient fortresses, monasteries, beautiful landscapes, and a rich cultural tradition unlike any other place.\\n\\nVisit Bhutan, where the old and current eras blend with the beautiful landscapes to create a unique journey. As a local Bhutan tour operator, we promise a variety of fulfilling experiences for your memorable trip to Bhutan.",
    ctaText: 'Meet our team',
    ctaLink: '/about-us',
  };

  const a_content = content || fallbackContent;

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {a_content.title}
          </h2>
          <div className="max-w-4xl mx-auto text-lg text-gray-600 leading-relaxed">
            {a_content.content.split('\\n\\n').map((paragraph, index) => (
              <p key={index} className="mb-6">
                {paragraph}
              </p>
            ))}
          </div>
          <Link
            href={a_content.ctaLink}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            {a_content.ctaText}
          </Link>
        </div>
      </div>
    </div>
  );
} 