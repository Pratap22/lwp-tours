export default function Testimonials() {
  const testimonials = [
    {
      name: "Achim Schulz",
      country: "Germany",
      rating: 5,
      text: "We had booked a 12 day trip. First and foremost, I would like to thank the Bhutan Travel center for arranging amazing trip and our two excellent guides and the absolutely careful driver. A visit to Bhutan is definitely worth it because of the absolutely impressive nature. If we ever have the opportunity to travel to Bhutan again, we will definitely book with Bhutan Travel Center again because of their very good experiences."
    },
    {
      name: "Pedro Swobodat",
      country: "USA",
      rating: 5,
      text: "Recently, we travelled to Bhutan with the help local tour operator Bhutan Travel Center. Everything was planned so well that we made wonderful memories. our entire trip to Bhutan was amazing, we would love to recommend our host agent Bhutan Travel Center to everyone who plans to visit Bhutan",
    },
    {
      name: "Shaoqiong Wu",
      country: "UK",
      rating: 5,
      text: "Thank you Bhutan Travel Center give me a wonderful trip and meaningful soul exploration, I will come back. This is not only a travel agent but a trusted friend in Bhutan.",
    },
    {
      name: "Joanna Rose Lydia",
      country: "Australia",
      rating: 5,
      text: "Recently we embarked our trip to Bhutan which was organized by Bhutan Travel Center. We were welcomed warmly by the team of Bhutan Travel Center. From the day one, we were in loved with Bhutan, it was amazing to witness breathtaking views of snowcapped mountains and lush valleys.",
    },
    {
      name: "Christopher Niclos",
      country: "USA",
      rating: 5,
      text: "We planned for the Bhutan trip for the march 2024 through Bhutan Travel Center. They provided us the best most memorable experiences. from the initial inquiry to the end of our trip team BTC was incredibly helpful and professional.",
    },
    {
      name: "Daniel kozlow",
      country: "USA",
      rating: 5,
      text: "I happened to discover while in India that I could travel solo on a custom-tailored trip planned by this amazing agency. They took care of my visa tickets itinerary and every possible detail. The two individuals assisting me a guide and a driver both were exceptional and kind and very informative.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Testimonials
          </h2>
          <h3 className="text-2xl font-semibold text-gray-700 mb-8">
            Our Guests are Our Best Ambassadors—Hear Their Stories.
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            They Loved Their Trip, and You Will Too!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 card-hover border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.country}</p>
                </div>
              </div>
              
              <div className="flex text-yellow-400 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-600 leading-relaxed text-sm">
                &quot;{testimonial.text}&quot;
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-8 bg-white rounded-full px-8 py-4 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">199</div>
              <div className="text-sm text-gray-600">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">851</div>
              <div className="text-sm text-gray-600">Happy Travelers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
