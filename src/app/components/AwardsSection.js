"use client";
import React from 'react';

export default function AwardsSection({ content }) {
  if (!content || !content.isActive || !content.items || content.items.length === 0) {
    return null;
  }

  const activeItems = content.items.filter(item => item.isActive);

  if (activeItems.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Awards & Recognition
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are proud to have received numerous awards and recognition for our exceptional service and commitment to sustainable tourism in Bhutan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 