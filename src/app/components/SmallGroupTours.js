import Image from 'next/image';
import Link from 'next/link';

async function getTours() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/tours`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch tours');
    return res.json();
  } catch (error) {
    console.error('Error fetching tours:', error);
    return [];
  }
}

export default async function SmallGroupTours() {
  const tours = await getTours();

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

        {tours.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tours available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.slice(0, 6).map((tour, index) => (
              <div
                key={tour._id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden card-hover border border-gray-100 ${
                  index === 0 ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="relative h-48">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black opacity-20"></div>
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                    ${tour.price}
                  </div>
                  {index === 0 && (
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
                        {Math.floor(Math.random() * 50) + 20} Reviews
                      </span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/tours/${tour.slug}`}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 inline-block text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <a 
            href="/tours" 
            className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-200 inline-block"
          >
            View All Tours
          </a>
        </div>
      </div>
    </section>
  );
} 