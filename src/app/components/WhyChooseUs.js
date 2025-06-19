export default function WhyChooseUs() {
  const features = [
    {
      icon: "🎯",
      title: "100% Customizable",
      description: "We'll customize the tour to your preferences."
    },
    {
      icon: "👥",
      title: "Private guided tours",
      description: "Enjoy a fully private tour—just you and your local guide."
    },
    {
      icon: "🌱",
      title: "Responsible",
      description: "Our tours prioritize people, places, and the planet."
    },
    {
      icon: "🕒",
      title: "24/7 Support",
      description: "Available around the clock to assist you anytime."
    }
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Why is Bhutan Travel Center the best choice for you?
          </h2>
          <h3 className="text-2xl font-semibold text-gray-700 mb-8">
            Experience a trip uniquely curated just for you
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 text-center card-hover border border-gray-100"
            >
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Discover Authentic Bhutan Travel Experiences
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                At Bhutan Travel Center, we do more than just offer Bhutan tour packages, we craft meaningful, immersive experiences that let you truly discover Bhutan. As a trusted local Bhutan tour operator and a small family-owned company, we hold a deep love for our homeland.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We are passionate about sharing the culture, nature, and spirit that make a trip to Bhutan truly special. As a trusted Bhutan tour operator, what truly sets us apart is the genuine care we pour into your authentic Bhutan travel experience.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                <strong>Come as our guest, leave as family – and take a piece of Bhutan home with you.</strong>
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-green-100 p-8 rounded-xl">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Customize?
              </h4>
              <p className="text-gray-600 mb-6">
                Let's plan your dream trip together!
              </p>
              <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200">
                Get Started Now!
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 