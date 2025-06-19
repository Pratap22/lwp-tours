export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">LWP Travel & Tours</h3>
            <p className="text-gray-300 mb-2">Local Experts | Authentic Experiences</p>
            <p className="text-gray-400 text-sm">Thimphu, Bhutan</p>
            <p className="text-gray-400 text-sm">info@lwpbhutan.com</p>
            <p className="text-gray-400 text-sm">+975 17 123 456</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:underline text-gray-300">Home</a></li>
              <li><a href="/about-us" className="hover:underline text-gray-300">About Us</a></li>
              <li><a href="/tours" className="hover:underline text-gray-300">Tours</a></li>
              <li><a href="/travel-info" className="hover:underline text-gray-300">Travel Info</a></li>
              <li><a href="/contact-us" className="hover:underline text-gray-300">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">FB</a>
              <a href="#" className="hover:text-blue-400">IG</a>
              <a href="#" className="hover:text-blue-400">TW</a>
            </div>
            <div className="mt-6">
              <span className="text-gray-400 text-xs">© {new Date().getFullYear()} LWP Travel & Tours. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 