import Image from "next/image";
import Link from "next/link";
import Accordion from "../components/Accordion";
import { GlobeAltIcon, SunIcon, ShieldCheckIcon, CurrencyDollarIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

export default function TravelInfo() {
  const faqs = [
    {
      title: 'What is the Sustainable Development Fee (SDF)?',
      content: 'The SDF is a daily levy paid by visitors to support Bhutan\'s development. For most tourists, it is $100 USD per person per night. This fee helps fund public services like healthcare and education, maintain infrastructure, and support conservation efforts, ensuring tourism benefits the entire country sustainably.'
    },
    {
      title: 'Do I need a guide?',
      content: 'Yes, with very few exceptions, all tourists must be accompanied by a licensed Bhutanese guide. This ensures you have a safe, smooth, and enriching experience, and it is a key part of Bhutan\'s high-value, low-impact tourism policy.'
    },
    {
      title: 'Is Bhutan safe for solo female travelers?',
      content: 'Absolutely. Bhutan is one of the safest countries in the world, with a very low crime rate. Solo female travelers often report feeling incredibly safe and respected. Your guide will also ensure your safety and comfort throughout your journey.'
    },
    {
        title: 'What is the food like?',
        content: 'Bhutanese cuisine is unique and delicious, known for its spiciness—especially the use of chilies. The national dish is "Ema Datshi" (chilies and cheese). However, tourist hotels and restaurants offer a wide range of continental, Indian, and Chinese dishes to suit all palates. Vegetarian and vegan options are widely available.'
    },
    {
        title: 'What is the internet and mobile connectivity like?',
        content: 'Mobile connectivity is widespread in most of Bhutan, with 4G available in major towns. You can buy a local SIM card upon arrival. Wi-Fi is available in most tourist-standard hotels, though it may be slower than what you\'re used to. It\'s perfect for staying in touch, but not always for heavy data usage.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-96">
        <Image
          src="/hero-trekking.jpg"
          alt="Travel Info Hero"
          layout="fill"
          objectFit="cover"
          className="opacity-80"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-5xl font-extrabold mb-4 text-shadow">Essential Travel Info</h1>
            <p className="text-xl max-w-3xl text-shadow">
              Everything you need to know to prepare for your unforgettable journey to Bhutan.
            </p>
          </div>
        </div>
      </div>

      {/* Key Info Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {/* Visa & Permits */}
                <div className="text-center p-8 bg-white rounded-xl shadow-md card-hover">
                    <GlobeAltIcon className="h-12 w-12 text-blue-600 mx-auto mb-4"/>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Visa & Permits</h3>
                    <p className="text-gray-600">All international tourists (except from India) require a visa, which must be pre-arranged through a licensed Bhutanese tour operator like us. We handle the entire process for you. Your visa clearance letter is required for boarding your flight to Bhutan.</p>
                </div>
                {/* Best Time to Visit */}
                <div className="text-center p-8 bg-white rounded-xl shadow-md card-hover">
                    <SunIcon className="h-12 w-12 text-blue-600 mx-auto mb-4"/>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Best Time to Visit</h3>
                    <p className="text-gray-600">The best seasons are Spring (March-May) and Autumn (September-November), offering pleasant weather and clear skies. These times are ideal for trekking and festivals. Winter is cold but clear, while Summer brings monsoons.</p>
                </div>
                {/* Currency & Payments */}
                <div className="text-center p-8 bg-white rounded-xl shadow-md card-hover">
                    <CurrencyDollarIcon className="h-12 w-12 text-blue-600 mx-auto mb-4"/>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Money & Currency</h3>
                    <p className="text-gray-600">Bhutan&apos;s currency is the Ngultrum (Nu.), pegged to the Indian Rupee. USD is widely accepted in tourist areas. ATMs are available in major towns but can be unreliable; we recommend bringing sufficient cash. Credit cards are accepted in high-end hotels and some shops.</p>
                </div>
            </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <p className="text-lg text-gray-600">Quick answers to common questions.</p>
            </div>
            <Accordion items={faqs} />
        </div>
      </section>

      {/* Packing Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <BriefcaseIcon className="h-12 w-12 text-blue-600 mx-auto mb-4"/>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What to Pack</h2>
            <p className="text-lg text-gray-700 mb-8">
                Dressing in layers is key. Bhutan&apos;s weather can change quickly. Here&apos;s a basic list:
            </p>
            <ul className="text-left list-disc list-inside bg-white p-8 rounded-xl shadow-md space-y-3 text-gray-700">
                <li>Comfortable walking shoes or hiking boots.</li>
                <li>Warm layers: fleece jacket, thermal underwear, sweaters.</li>
                <li>Waterproof and windproof jacket.</li>
                <li>Modest clothing for visiting temples (long sleeves, long pants).</li>
                <li>Sunscreen, sunglasses, and a hat.</li>
                <li>Personal medications and a basic first-aid kit.</li>
                <li>Camera and extra batteries.</li>
            </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Have More Questions?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our team is here to help you prepare for the trip of a lifetime. Don&apos;t hesitate to reach out with any questions.
          </p>
          <Link
            href="/contact-us"
            className="inline-block bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
