export default function TravelThemes({ content }) {
  // Don't render if section is disabled
  if (!content?.isActive) {
    return null;
  }

  const travelThemes = content?.themes?.filter(theme => theme.isActive) || [
    {
      title: "Cultural Immersion Tour",
      description: "Experience authentic Bhutanese culture and traditions",
      icon: "🏛️",
      color: "bg-blue-500"
    },
    {
      title: "Bhutan Festival Tours",
      description: "Witness vibrant festivals and celebrations",
      icon: "🎭",
      color: "bg-red-500"
    },
    {
      title: "Trekking in Bhutan",
      description: "Explore challenging trails and natural beauty",
      icon: "🏔️",
      color: "bg-green-500"
    },
    {
      title: "Adventure & Nature Tour",
      description: "Thrilling outdoor activities and wildlife",
      icon: "🌿",
      color: "bg-yellow-500"
    },
    {
      title: "Camping Tours",
      description: "Sleep under the stars in pristine nature",
      icon: "⛺",
      color: "bg-purple-500"
    },
    {
      title: "Hiking & Walking Tours",
      description: "Guided walks through scenic landscapes",
      icon: "🥾",
      color: "bg-indigo-500"
    },
    {
      title: "Bhutan Luxury Tours",
      description: "Premium experiences with top-tier accommodations",
      icon: "💎",
      color: "bg-pink-500"
    },
    {
      title: "Rural Bhutan Tour",
      description: "Authentic village life and local experiences",
      icon: "🏘️",
      color: "bg-orange-500"
    },
    {
      title: "Bhutan Homestay Tour",
      description: "Stay with local families for authentic experience",
      icon: "🏠",
      color: "bg-teal-500"
    }
  ];

  // Add colors to themes from database
  const colors = ["bg-blue-500", "bg-red-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-indigo-500", "bg-pink-500", "bg-orange-500", "bg-teal-500"];
  const themesWithColors = travelThemes.map((theme, index) => ({
    ...theme,
    color: colors[index % colors.length]
  }));

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {content.title || "Find your perfect experience"}
          </h2>
          <h3 className="text-2xl font-semibold text-gray-700 mb-8">
            {content.subtitle || "Personalized trips to match your interests"}
          </h3>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Bhutan offers a wealth of experiences for all travelers. Immerse yourself in culture, join lively festivals, embark on wildlife safaris, relax in retreats or cozy homestays and hotels, or plan an unforgettable occasion. We customize itineraries that perfectly match your interests and travel style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themesWithColors.map((theme, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 card-hover border border-gray-100"
            >
              <div className={`w-16 h-16 ${theme.color} rounded-full flex items-center justify-center mb-4`}>
                <span className="text-2xl">{theme.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {theme.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {theme.description}
              </p>
              <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
                Learn More →
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
            Explore our trips
          </button>
        </div>
      </div>
    </section>
  );
} 