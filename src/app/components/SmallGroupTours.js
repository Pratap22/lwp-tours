"use client";
import Image from "next/image";
import Link from "next/link";
import { CheckCircleIcon, StarIcon } from "@heroicons/react/24/solid";

export default function SmallGroupTours({ content, tours = [] }) {
  // Don't render if section is disabled
  if (!content?.isActive) {
    return null;
  }

  // Icons for benefits, add more as needed
  const benefitIcons = {
    "Intimate group sizes": "👥",
    "Shared experiences": "🤝",
    "Cost-effective luxury": "💎",
    "Expert local guides": "🧭",
  };

  const getIconForBenefit = (text) => {
    const key = Object.keys(benefitIcons).find(key => text.toLowerCase().includes(key.toLowerCase()));
    return key ? benefitIcons[key] : "⭐";
  }

  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl tracking-tight mb-4">
            {content.title || "Small Group Tours"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content.subtitle || "Intimate Experiences with Like-Minded Travelers"}
          </p>
        </div>

        {/* Benefits Section */}
        {content.benefits && content.benefits.length > 0 && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {content.benefits
              .filter((benefit) => benefit.isActive)
              .sort((a, b) => a.order - b.order)
              .map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{benefit.text}</h3>
                    <p className="text-gray-600 mt-1">
                      {benefit.description || "Benefit from our curated small group experiences."}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}

        {tours.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No small group tours available at the moment. Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.slice(0, 6).map((tour) => (
              <Link href={`/tours/${tour.slug}`} key={tour._id}>
                <div className="group bg-white rounded-2xl shadow-sm overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border">
                  <div className="relative h-56">
                    <Image
                      src={tour.imageUrl}
                      alt={tour.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {tour.isHero && (
                      <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-md">
                        FEATURED
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {tour.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">{tour.duration}</p>
                    <div className="mt-auto">
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-gray-900">
                          <span className="text-sm font-normal text-gray-500">From </span>
                          ${tour.price}
                        </p>
                        <div className="flex items-center">
                          <StarIcon className="w-5 h-5 text-yellow-400" />
                          <span className="ml-1 text-sm text-gray-600">
                            {tour.rating || "4.9"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {tours.length > 0 && (
          <div className="text-center mt-16">
            <Link
              href="/tours"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Explore All Tours
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
