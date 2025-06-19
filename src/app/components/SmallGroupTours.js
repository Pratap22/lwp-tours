export default function SmallGroupTours() {
  const tours = [
    {
      title: "Historic Bhutan Tour",
      duration: "10 Nights / 11 Days",
      reviews: 43,
      image: "/tour-historic.jpg",
      price: "$2,499",
      featured: true
    },
    {
      title: "Thimphu Festival",
      duration: "6 Nights / 7 Days",
      reviews: 49,
      image: "/tour-festival.jpg",
      price: "$1,899"
    },
    {
      title: "Druk Path Trek",
      duration: "8 Nights / 9 Days",
      reviews: 26,
      image: "/tour-trek.jpg",
      price: "$2,199"
    },
    {
      title: "Rural Bhutan Exploration",
      duration: "6 Nights / 7 Days",
      reviews: 32,
      image: "/tour-rural.jpg",
      price: "$1,699"
    },
    {
      title: "Luxury Bhutan Tour",
      duration: "4 Nights / 5 Days",
      reviews: 43,
      image: "/tour-luxury.jpg",
      price: "$3,299"
    },
    {
      title: "Bird Watching Tour",
      duration: "13 Nights / 14 Days",
      reviews: 29,
      image: "/tour-bird.jpg",
      price: "$2,899"
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Small Group Tour
          </h2>
          <h3 className="text-2xl font-semibold text-gray-700 mb-8">
            Explore Bhutan with passionate travelers
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience Bhutan with our small group tours that blend comfort and adventure. Explore stunning landscapes, connect with local culture, and travel with like-minded travelers. Create lasting memories and make new friends on your Bhutan adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg overflow-hidden card-hover border border-gray-100 ${
                tour.featured ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="relative h-48 bg-gradient-to-br from-blue-400 to-green-400">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                  {tour.price}
                </div>
                {tour.featured && (
                  <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {tour.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {tour.duration}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {tour.reviews} Reviews
                    </span>
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-200">
            View All Tours
          </button>
        </div>
      </div>
    </section>
  );
} 