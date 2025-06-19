export default function ContactUs() {
  return (
    <main className="bg-white min-h-[70vh] mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-6 text-blue-900">Contact LWP Travel & Tours</h1>
      <form className="bg-white rounded-xl shadow p-6 border border-gray-100 flex flex-col gap-4">
        <input type="text" placeholder="Your Name" className="border rounded px-4 py-2" />
        <input type="email" placeholder="Your Email" className="border rounded px-4 py-2" />
        <textarea placeholder="Your Message" className="border rounded px-4 py-2" rows={4}></textarea>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors">Send Message</button>
      </form>
      <div className="mt-8 text-gray-600">
        <p>Email: info@lwpbhutan.com (placeholder)</p>
        <p>Phone: +975 17 123 456 (placeholder)</p>
      </div>
    </main>
  );
} 