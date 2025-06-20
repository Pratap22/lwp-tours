'use client';

import Image from "next/image";
import Link from "next/link";
import { CheckCircleIcon, StarIcon, HeartIcon } from '@heroicons/react/24/solid';

export default function AboutUs() {
  const team = [
    {
      name: "Pratap Sharma",
      position: "CEO & Founder",
      email: "",
      github: "https://github.com/pratap22",
      image: "https://avatars.githubusercontent.com/u/19977758",
      bio: "Pratap leads LWP Travel & Tours with a vision for authentic, meaningful travel in Bhutan. With years of experience, he ensures every journey is exceptional.",
    },
    {
      name: "Dawa Yoezer Dorji",
      position: "Head, Operation",
      email: "dawayoezer22@gamil.com",
      github: "https://github.com/yoez2",
      image: "https://avatars.githubusercontent.com/u/147582853",
      bio: "Dawa oversees all operations, ensuring seamless travel experiences for every guest. Her attention to detail and dedication are unmatched.",
    },
    {
      name: "Chimi Yuden",
      position: "Team Member",
      email: "chimiyuden19@gmail.com",
      github: "https://github.com/cyuelha",
      image: "https://avatars.githubusercontent.com/u/206062715",
      bio: "Chimi is passionate about sharing Bhutan's culture and beauty with travelers from around the world.",
    },
    {
      name: "Sonam Lhendup",
      position: "Team Member",
      email: "sonamlhendupjr@gmail.com",
      github: "https://github.com/slhendup",
      image: "https://avatars.githubusercontent.com/u/206080444",
      bio: "Sonam ensures every guest feels welcome and cared for throughout their journey.",
    },
    {
      name: "Kuenzang Dorji",
      position: "Team Member",
      email: "dorjikuenzang13@gmail.com",
      github: "https://github.com/kkzangg",
      image: "https://avatars.githubusercontent.com/u/206067885",
      bio: "Kuenzang brings energy and enthusiasm to every tour, making each experience memorable.",
    },
    {
      name: "Pema Wangchuk",
      position: "Team Member",
      email: "pewangk703@gmail.com",
      github: "https://github.com/Pelmaa",
      image: "https://avatars.githubusercontent.com/u/205863820",
      bio: "Pema is dedicated to providing insightful and enjoyable travel experiences.",
    },
    {
      name: "Jigme Wangdi",
      position: "Team Member",
      email: "jimmyongdue@gmail.com",
      github: "https://github.com/jigme-wangdi123",
      image: "https://avatars.githubusercontent.com/u/205863656",
      bio: "Jigme's knowledge of Bhutan's history and culture enriches every tour.",
    },
    {
      name: "Peyma Choden",
      position: "Team Member",
      email: "pema.21032004@gmail.com",
      github: "https://github.com/P-2476",
      image: "https://avatars.githubusercontent.com/u/206161634",
      bio: "Pema is committed to making every guest's journey smooth and enjoyable.",
    },
    {
      name: "Karma Deki Lhazin",
      position: "Team Member",
      email: "tomiedelrey762@gmail.com",
      github: "https://github.com/K-2716",
      image: "https://avatars.githubusercontent.com/u/206063615",
      bio: "Karma's friendly nature and professionalism make her a favorite among travelers.",
    },
    {
      name: "Norbu Lhanden",
      position: "Team Member",
      email: "norbul096@gmail.com",
      github: "https://github.com/Lhaden123",
      image: "https://avatars.githubusercontent.com/u/206064055",
      bio: "Norbu is always ready to help guests discover the best of Bhutan.",
    },
    {
      name: "Jamyang Dolma",
      position: "Team Member",
      email: "jamyangdolma30@gmail.com",
      github: "https://github.com/jjdolma",
      image: "https://avatars.githubusercontent.com/u/206066764",
      bio: "Jamyang is passionate about sharing Bhutan's unique traditions and stories.",
    },
    {
      name: "Tashi Yuden",
      position: "Team Member",
      email: "tashiyuden07@gmail.com",
      github: "https://github.com/ttyuedenn",
      image: "https://avatars.githubusercontent.com/u/206065469",
      bio: "Tashi ensures every detail of your trip is perfectly arranged.",
    },
    {
      name: "Phuntsho Galey Namgay",
      position: "Team Member",
      email: "phuntshonamgay00@gmail.com",
      github: "https://github.com/Galey100",
      image: "https://avatars.githubusercontent.com/u/206063415",
      bio: "Phuntsho is dedicated to making every journey special for our guests.",
    },
    {
      name: "Tek Nath Dahal",
      position: "Team Member",
      email: "tek25046@gmail.com",
      github: "https://github.com/TekNath123",
      image: "https://avatars.githubusercontent.com/u/206063750",
      bio: "Tek Nath brings a wealth of experience and a warm smile to every tour.",
    },
    {
      name: "Tshering Phuntsho",
      position: "Team Member",
      email: "tshering1200@gmail.com",
      github: "https://github.com/Tshering123-max",
      image: "https://avatars.githubusercontent.com/u/208429662",
      bio: "Tshering is always eager to help guests explore Bhutan's hidden gems.",
    },
    {
      name: "Sangay Wangmo",
      position: "Team Member",
      email: "wangmo30sangay@gmail.com",
      github: "https://github.com/sangay-wangmo",
      image: "https://avatars.githubusercontent.com/u/138448628",
      bio: "Sangay's enthusiasm and knowledge make every trip unforgettable.",
    },
    {
      name: "Yeshi Choden",
      position: "Team Member",
      email: "yeshi1104@gmail.com",
      github: "https://github.com/yeshi7",
      image: "https://avatars.githubusercontent.com/u/205859634",
      bio: "Yeshi is dedicated to providing the best possible experience for every traveler.",
    },
    {
      name: "Phurba sherpa Wangmo",
      position: "Team Member",
      email: "phurbasekai134@gmail.com",
      github: "https://github.com/phurba24",
      image: "https://avatars.githubusercontent.com/u/206063762",
      bio: "Phurba's attention to detail ensures every journey is smooth and enjoyable.",
    },
    {
      name: "Susma Gurung",
      position: "Team Member",
      email: "gurungsusma497@gmail.com",
      github: "https://github.com/susma888",
      image: "https://avatars.githubusercontent.com/u/206171620",
      bio: "Susma is passionate about making every guest feel at home in Bhutan.",
    },
    {
      name: "Uygen Choden",
      position: "Team Member",
      email: "uchoden757@gmail.com",
      github: "https://github.com/U-55",
      image: "https://avatars.githubusercontent.com/u/205810978",
      bio: "Uygen's friendly approach and local knowledge delight all our guests.",
    },
    {
      name: "Tenzin Choden",
      position: "Team Member",
      email: "tendenzinchogmail.com",
      github: "https://github.com/Tenzey001",
      image: "https://avatars.githubusercontent.com/u/206064245",
      bio: "Tenzin is always ready to go the extra mile to make your trip special.",
    },
  ];

  const values = [
    {
      icon: CheckCircleIcon,
      title: 'Authenticity',
      description: 'We craft real, immersive experiences that connect you with the heart of Bhutan.',
    },
    {
      icon: StarIcon,
      title: 'Excellence',
      description: 'From planning to execution, we deliver exceptional service and quality.',
    },
    {
      icon: HeartIcon,
      title: 'Passion',
      description: 'Our deep love for Bhutan drives us to share its magic with the world.',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-96">
        <Image
          src="/hero-cultural.jpg"
          alt="About Us Hero"
          layout="fill"
          objectFit="cover"
          className="opacity-80"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-5xl font-extrabold mb-4 text-shadow">About LWP Travel & Tours</h1>
            <p className="text-xl max-w-2xl text-shadow">
              Your trusted local experts for unforgettable journeys in the Land of the Thunder Dragon.
            </p>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Welcome to Your Bhutan Adventure</h2>
          <p className="text-lg text-gray-700 mb-4">
            At LWP Travel & Tours, we don&apos;t just sell tours; we craft lifelong memories. As a premier, locally-owned tour operator based in the heart of Bhutan, we are passionate about sharing the magic of our kingdom with you.
          </p>
          <p className="text-lg text-gray-600">
            Our team of dedicated local experts leverages deep-rooted knowledge and a love for our heritage to design authentic, immersive, and personalized journeys. Whether you seek cultural discovery, spiritual enrichment, or thrilling adventure, we are your trusted guides to the wonders of Bhutan.
          </p>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600">The principles that guide every journey we create.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {values.map((value) => (
              <div key={value.title} className="flex flex-col items-center">
                <value.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Passionate Team</h2>
            <p className="text-lg text-gray-600">The local experts dedicated to making your journey perfect.</p>
          </div>
          <div className="grid grid-cols-12 gap-6">
            {team.map((member, idx) => {
              const layouts = [
                'col-span-12 sm:col-span-6 md:col-span-4 row-span-2 min-h-[32rem]', // Tall
                'col-span-12 sm:col-span-6 md:col-span-4 min-h-[24rem]',       // Standard
                'col-span-12 sm:col-span-6 md:col-span-4 min-h-[24rem]',       // Standard
                'col-span-12 sm:col-span-6 md:col-span-8 min-h-[24rem]',       // Wide
                'col-span-12 sm:col-span-6 md:col-span-4 min-h-[24rem]',       // Standard
                'col-span-12 sm:col-span-6 md:col-span-6 min-h-[24rem]',       // Medium
                'col-span-12 sm:col-span-6 md:col-span-6 min-h-[24rem]',       // Medium
              ];
              const layoutClass = layouts[idx % layouts.length];

              return (
                <div key={member.name} className={`group relative rounded-xl overflow-hidden shadow-lg ${layoutClass}`}>
                  {/* Background Image (Always visible) */}
                  <Image
                    src={member.image}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay and Content (Appear on hover) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                      <p className="text-blue-300 font-semibold mb-2">{member.position}</p>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 pt-2">
                          <p className="text-sm text-gray-200 mb-4">{member.bio}</p>
                          <div className="flex justify-start space-x-4">
                          {member.email && <a href={`mailto:${member.email}`} className="text-blue-300 hover:text-white">Email</a>}
                          {member.github && <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white">GitHub</a>}
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Explore Bhutan?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Let&apos;s plan your dream journey to the last Himalayan kingdom. Our experts are here to help you every step of the way.
          </p>
          <Link
            href="/tours"
            className="inline-block bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Discover Our Tours
          </Link>
        </div>
      </section>
    </div>
  );
}
