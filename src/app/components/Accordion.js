'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {items.map((item, index) => (
        <div key={index} className="border-b border-gray-200 py-4">
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 focus:outline-none"
          >
            <span>{item.title}</span>
            <ChevronDownIcon
              className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              openIndex === index ? 'max-h-screen mt-4' : 'max-h-0'
            }`}
          >
            <div className="text-gray-600 leading-relaxed">
                {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 