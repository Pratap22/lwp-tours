"use client";
import { useState, useEffect } from "react";

export default function AwardsSection({ content }) {
  // Don't render if section is disabled
  if (!content?.isActive) {
    return null;
  }

  const awards = content?.items?.filter(item => item.isActive) || [
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