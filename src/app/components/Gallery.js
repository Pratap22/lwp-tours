import Image from 'next/image';

export default function Gallery() {
  const images = [
    { src: "/gallery-1.jpg", alt: "Tiger's Nest Monastery" },
    { src: "/gallery-2.jpg", alt: "Bhutanese Festival" },
    { src: "/gallery-3.jpg", alt: "Mountain Landscape" },
    { src: "/gallery-4.jpg", alt: "Traditional Dance" },
    { src: "/gallery-5.jpg", alt: "Prayer Flags" },
    { src: "/gallery-6.jpg", alt: "Punakha Dzong" }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Bhutan Photo Gallery
          </h2>
          <h3 className="text-2xl font-semibold text-gray-700 mb-8">
            Discover the Beauty of Bhutan
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div key={idx} className="overflow-hidden rounded-xl shadow-lg card-hover">
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={300}
                className="object-cover w-full h-60 hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 