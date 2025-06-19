import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">LWP Travel & Tours</h3>
            <p className="text-gray-300 mb-2">Local Experts | Authentic Experiences</p>
            <p className="text-gray-400 text-sm">Bumthang, Bhutan</p>
            <p className="text-gray-400 text-sm">info@holidaykosh.com</p>
            <p className="text-gray-400 text-sm">+975 17 123 456</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:underline text-gray-300">Home</Link></li>
              <li><Link href="/about-us" className="hover:underline text-gray-300">About Us</Link></li>
              <li><Link href="/tours" className="hover:underline text-gray-300">Tours</Link></li>
              <li><Link href="/travel-info" className="hover:underline text-gray-300">Travel Info</Link></li>
              <li><Link href="/contact-us" className="hover:underline text-gray-300">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-blue-400">FB</Link>
              <Link href="#" className="hover:text-blue-400">IG</Link>
              <Link href="#" className="hover:text-blue-400">TW</Link>
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