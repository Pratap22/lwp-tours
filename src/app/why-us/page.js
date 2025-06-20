import Image from "next/image";
import Link from "next/link";
import { UsersIcon, MapPinIcon, HeartIcon, PhoneIcon, CheckBadgeIcon, StarIcon } from '@heroicons/react/24/outline';

export default function WhyUs() {
  const differentiators = [
    {
      icon: UsersIcon,
      title: 'Local Experts, Global Standards',
      description: 'Our team is 100% local, born and raised in Bhutan. We combine our deep, personal knowledge with international standards of service to give you an unparalleled, authentic experience.'
    },
    {
      icon: MapPinIcon,
      title: 'Truly Tailor-Made Journeys',
      description: 'Your adventure is yours alone. We don\'t do cookie-cutter tours. We listen to your interests and craft a personalized itinerary that matches your dream trip perfectly.'
    },
    {
      icon: HeartIcon,
      title: 'Sustainable & Responsible',
      description: 'We are committed to preserving our culture and environment. We practice low-impact tourism, support local communities, and ensure your visit benefits Bhutan for generations to come.'
    },
    {
      icon: PhoneIcon,
      title: '24/7 On-the-Ground Support',
      description: 'From the moment you arrive until you depart, we are here for you. Our team is always available to ensure your journey is seamless, safe, and stress-free.'
    },
    {
        icon: CheckBadgeIcon,
        title: 'Uncompromising Quality',
        description: 'We meticulously select our partner hotels, restaurants, and transport to ensure they meet our high standards of quality, comfort, and safety.'
    },
    {
        icon: StarIcon,
        title: 'Authentic Cultural Immersion',
        description: 'Go beyond the tourist spots. We connect you with local families, artisans, and monks for genuine interactions that create lasting memories.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-800 h-96">
        <Image
          src="/gallery-1.jpg"
          alt="Why Us Background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-5xl font-extrabold mb-4 text-shadow">Why Travel with Us?</h1>
            <p className="text-xl max-w-3xl text-shadow">
              Experience Bhutan differently. Discover the genuine connection, expertise, and passion that set us apart.
            </p>
          </div>
        </div>
      </div>

      {/* Differentiators Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">The LWP Travel & Tours Difference</h2>
                <p className="text-lg text-gray-600">What makes our journeys unforgettable.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {differentiators.map((item, index) => (
                    <div key={index} className="text-center p-8 bg-white rounded-xl shadow-md card-hover">
                        <item.icon className="h-12 w-12 text-blue-600 mx-auto mb-6"/>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
      
      {/* Testimonial Spotlight */}
      <section className="py-24 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="w-8 h-8 text-yellow-400" />
            ))}
          </div>
          <blockquote className="text-2xl font-light italic mb-6">
            &ldquo;The entire trip was perfectly arranged. The guides were not just knowledgeable but truly passionate about their country. It felt less like a tour and more like visiting with good friends.&rdquo;
          </blockquote>
          <cite className="text-lg font-semibold not-italic">- Achim Schulz, Germany</cite>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">Our Promise to You</h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
                <div className="text-center">
                    <div className="bg-blue-100 text-blue-600 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Personalized Planning</h3>
                </div>
                <div className="text-gray-300 text-2xl hidden md:block">&rarr;</div>
                <div className="text-center">
                    <div className="bg-blue-100 text-blue-600 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Seamless Experience</h3>
                </div>
                <div className="text-gray-300 text-2xl hidden md:block">&rarr;</div>
                <div className="text-center">
                    <div className="bg-blue-100 text-blue-600 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Lasting Memories</h3>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Begin Your Unforgettable Journey</h2>
          <p className="text-lg opacity-90 mb-8">
            You are not just a tourist to us; you are our guest. Let us show you the heart and soul of our beautiful kingdom.
          </p>
          <Link
            href="/contact-us"
            className="inline-block bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-blue-500 transition-all duration-300 shadow-lg"
          >
            Start Planning Today
          </Link>
        </div>
      </section>
    </div>
  );
} 