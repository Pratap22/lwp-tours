import Image from 'next/image';
import Link from 'next/link';
import { headers } from 'next/headers';
import DownloadButton from '../components/DownloadButton';

async function getTour(slug) {
  const headersList = await headers();
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const host = headersList.get('host');
  
  try {
    const res = await fetch(`${protocol}://${host}/api/tours/${slug}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) throw new Error('Failed to fetch tour');
    return res.json();
  } catch (error) {
    console.error('Error fetching tour:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tour = await getTour(slug);
  return {
    title: tour ? `${tour.title} - LWP Travel & Tours` : 'Tour Not Found',
    description: tour?.description || 'Tour details not available',
  };
}

export default async function TourDetail({ params, searchParams }) {
  const { slug } = await params;
  const tour = await getTour(slug);

  if (!tour) {
    return (
      <main className="bg-white min-h-[70vh] mx-auto py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-900">Tour Not Found</h1>
          <p className="text-gray-600 mb-8">The tour you&apos;re looking for doesn&apos;t exist.</p>
          <Link 
            href="/tours" 
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Tours
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-[70vh] mx-auto py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href="/tours" className="text-blue-600 hover:text-blue-800">Tours</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900">{tour.title}</span>
        </nav>

        {/* Hero Section */}
        <div id="tour-hero" className="relative h-96 rounded-2xl overflow-hidden mb-12">
          <Image
            src={tour.image || '/hero-cultural.jpg'}
            alt={tour.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <h1 className="text-4xl font-bold mb-2">{tour.title}</h1>
            <p className="text-xl">{tour.duration}</p>
          </div>
        </div>

        <div id="content-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div id="tour-main-content" className="lg:col-span-2">
            <div id="tour-overview" className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tour Overview</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">{tour.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Duration</h3>
                  <p className="text-blue-700">{tour.duration}</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Group Size</h3>
                  <p className="text-green-700">{tour.groupSize || 'Small groups (max 12 people)'}</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Difficulty</h3>
                  <p className="text-purple-700">{tour.difficulty || 'Moderate'}</p>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-orange-900 mb-2">Best Time</h3>
                  <p className="text-orange-700">{tour.bestTime || 'March - May, September - November'}</p>
                </div>
              </div>
            </div>

            {/* Itinerary Section */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <div id="tour-itinerary" className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Tour Itinerary</h2>
                <div className="space-y-6">
                  {tour.itinerary.map((day, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-6">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3">
                          {index + 1}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Day {index + 1}</h3>
                      </div>
                      <div className="ml-11">
                        <p className="text-gray-700 font-medium mb-2">{day.short}</p>
                        <p className="text-gray-600 leading-relaxed">{day.long}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's Included Section */}
            <div id="tour-included" className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What&apos;s Included</h3>
              <ul className="space-y-3 mb-8">
                {tour.included && tour.included.length > 0 ? (
                  tour.included.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">All accommodation in comfortable hotels</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">All meals (breakfast, lunch, dinner)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Professional English-speaking guide</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">All transportation and transfers</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Bhutan visa and permits</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">All entrance fees and activities</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* What's Not Included Section */}
            {tour.excluded && tour.excluded.length > 0 && (
              <div id="tour-excluded" className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What&apos;s Not Included</h3>
                <ul className="space-y-3">
                  {tour.excluded.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div id="tour-sidebar" className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-green-600 mb-2">${tour.price}</div>
                <div className="text-gray-600">per person</div>
              </div>
              
              <Link 
                href={`/contact-us?tour=${encodeURIComponent(tour.title)}`}
                className="w-full block text-center bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4"
              >
                Book This Tour
              </Link>
              
              {tour.itinerary && tour.itinerary.length > 0 && (
                <DownloadButton tourSlug={tour.slug} tour={tour} />
              )}

              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Need Help?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Have questions about this tour? Our travel experts are here to help!
                </p>
                <Link 
                  href="/contact-us" 
                  className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                >
                  Contact Us →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 