export default function BookingProcess() {
  const steps = [
    {
      number: "1",
      title: "Plan Your Itineraries",
      description: "Plan your preferences with us. Our itineraries offer a wide variety of activities, sights, and experiences. If you're unsure about deciding, simply share your preferred tour and duration with us, and we'll create a customized itinerary that suits you perfectly."
    },
    {
      number: "2",
      title: "Plan Dates, Flights & Hotels",
      description: "Please share with us the dates you prefer to travel, the route you'd like to take, and your accommodation preferences. We will take care of the flight bookings and logistics in advance, ensuring you have a hassle-free experience."
    },
    {
      number: "3",
      title: "Payment and Visa",
      description: "At this point, you need to make the payment; once received, we'll promptly process your visa application and send it to you. Please ensure that your passport is valid for at least 6 months. Your visa will be stamped upon arrival at your entry point."
    },
    {
      number: "4",
      title: "Depart for Bhutan",
      description: "Before departure, you'll receive your documents with essential information. Pack your clothing suitable to the climate and activities you plan to engage in, head to the airport, and embark on your journey to Bhutan."
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Practical Tips for Traveling to Bhutan
          </h2>
          <h3 className="text-2xl font-semibold text-gray-700 mb-8">
            Bhutan Tour Booking Procedure
          </h3>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Wondering how to plan an unforgettable trip to Bhutan? Here are four simple steps to ensure your Bhutan travel experience is smooth and well-organized.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 card-hover border border-gray-200"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 lg:p-12 text-white">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-6">
              Green Bliss, The Joy of a Healthy Environment
            </h3>
            <h4 className="text-xl font-semibold mb-4">
              We promote sustainable travel practices
            </h4>
            <button className="bg-white text-green-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Explore how we protect our planet
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 