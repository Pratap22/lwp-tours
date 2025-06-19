export default function Tours() {
  return (
    <main className="bg-white min-h-[70vh] max-w-5xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-900">Our Tours</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1,2,3].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-2xl font-semibold mb-2 text-blue-700">Sample Tour {i}</h2>
            <p className="text-gray-600 mb-2">Duration: 7 Days / 6 Nights</p>
            <p className="text-gray-700 mb-4">Explore the wonders of Bhutan with LWP Travel & Tours. This is a sample tour description for placeholder purposes.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors">View Details</button>
          </div>
        ))}
      </div>
    </main>
  );
} 