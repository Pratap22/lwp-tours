import Image from "next/image";
import Link from "next/link";
import { SparklesIcon, TrophyIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';

export default function Awards() {
    const awards = [
        {
          icon: TrophyIcon,
          title: 'Bhutan Tourism Excellence Award',
          year: '2023',
          issuer: 'Tourism Council of Bhutan',
          description: 'Recognized for outstanding service and creating authentic travel experiences that showcase the best of Bhutanese culture and hospitality.'
        },
        {
          icon: SparklesIcon,
          title: 'Certificate of Excellence',
          year: '2022',
          issuer: 'Traveler Choice Awards',
          description: 'Awarded based on consistently positive traveler reviews, highlighting our commitment to customer satisfaction and memorable journeys.'
        },
        {
          icon: ShieldCheckIcon,
          title: 'Sustainable Tour Operator of the Year',
          year: '2021',
          issuer: 'Eco-Travel Association',
          description: 'Honored for our dedication to responsible tourism, community engagement, and preserving Bhutan&apos;s pristine natural environment.'
        },
        {
            icon: TrophyIcon,
            title: 'Best Adventure Travel Company',
            year: '2020',
            issuer: 'Himalayan Travel Mart',
            description: 'Awarded for our expertly crafted trekking and adventure itineraries that offer unique challenges and breathtaking experiences.'
        }
      ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-800 h-80">
        <Image
          src="/gallery-4.jpg" 
          alt="Awards Background"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-5xl font-extrabold mb-4 text-shadow">Our Commitment to Excellence</h1>
            <p className="text-xl max-w-3xl text-shadow">
              We are honored to be recognized for our dedication to providing world-class travel experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Awards Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
                <p className="text-lg text-gray-600">A testament to our passion and hard work.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {awards.map((award, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg p-8 flex items-start card-hover border border-gray-100">
                        <award.icon className="h-16 w-16 text-yellow-500 flex-shrink-0 mr-6 mt-1" />
                        <div>
                            <p className="text-sm font-semibold text-blue-600 mb-1">{award.year} - {award.issuer}</p>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{award.title}</h3>
                            <p className="text-gray-600">{award.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
      
      {/* Commitment Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">More Than Just Awards</h2>
            <p className="text-lg text-gray-700 mb-4">
                For us, these awards are milestones, not destinations. They represent the trust our guests place in us and motivate our team to continually innovate and enhance every aspect of your journey.
            </p>
            <p className="text-lg text-gray-600">
                Our real measure of success is your smile at the end of an unforgettable adventure. We are committed to upholding the highest standards of service and creating authentic connections between you and the incredible kingdom of Bhutan.
            </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Travel with an Award-Winning Team</h2>
          <p className="text-lg opacity-90 mb-8">
            Experience the difference that passion and dedication make. Let us craft your perfect Bhutanese adventure.
          </p>
          <Link
            href="/tours"
            className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-md"
          >
            Explore Our Tours
          </Link>
        </div>
      </section>
    </div>
  );
} 