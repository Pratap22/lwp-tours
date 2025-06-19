import Link from "next/link";

export default function AboutUs() {
  const team = [
    {
      name: "Pratap Sharma",
      position: "CEO & Founder",
      email: "",
      github: "https://github.com/pratap22",
      image: "https://avatars.githubusercontent.com/u/19977758",
      bio: "Pratap leads LWP Travel & Tours with a vision for authentic, meaningful travel in Bhutan. With years of experience, he ensures every journey is exceptional."
    },
    {
      name: "Dawa Yoezer Dorji",
      position: "Head, Operation",
      email: "dawayoezer22@gamil.com",
      github: "https://github.com/yoez2",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Dawa oversees all operations, ensuring seamless travel experiences for every guest. Her attention to detail and dedication are unmatched."
    },
    {
      name: "Chimi Yuden",
      position: "Team Member",
      email: "chimiyuden19@gmail.com",
      github: "https://github.com/cyuelha",
      image: "https://avatars.githubusercontent.com/u/206062715",
      bio: "Chimi is passionate about sharing Bhutan's culture and beauty with travelers from around the world."
    },
    {
      name: "Sonam Lhendup",
      position: "Team Member",
      email: "sonamlhendupjr@gmail.com",
      github: "https://github.com/slhendup",
      image: "https://avatars.githubusercontent.com/u/206080444",
      bio: "Sonam ensures every guest feels welcome and cared for throughout their journey."
    },
    {
      name: "Kuenzang Dorji",
      position: "Team Member",
      email: "dorjikuenzang13@gmail.com",
      github: "https://github.com/kkzangg",
      image: "https://avatars.githubusercontent.com/u/206067885",
      bio: "Kuenzang brings energy and enthusiasm to every tour, making each experience memorable."
    },
    {
      name: "Pema Wangchuk",
      position: "Team Member",
      email: "pewangk703@gmail.com",
      github: "https://github.com/Pelmaa",
      image: "https://avatars.githubusercontent.com/u/205863820",
      bio: "Pema is dedicated to providing insightful and enjoyable travel experiences."
    },
    {
      name: "Jigme Wangdi",
      position: "Team Member",
      email: "jimmyongdue@gmail.com",
      github: "https://github.com/jigme-wangdi123",
      image: "https://avatars.githubusercontent.com/u/205863656",
      bio: "Jigme's knowledge of Bhutan's history and culture enriches every tour."
    },
    {
      name: "Peyma Choden",
      position: "Team Member",
      email: "pema.21032004@gmail.com",
      github: "https://github.com/P-2476",
      image: "https://avatars.githubusercontent.com/u/206161634",
      bio: "Pema is committed to making every guest's journey smooth and enjoyable."
    },
    {
      name: "Karma Deki Lhazin",
      position: "Team Member",
      email: "tomiedelrey762@gmail.com",
      github: "https://github.com/K-2716",
      image: "https://randomuser.me/api/portraits/women/39.jpg",
      bio: "Karma's friendly nature and professionalism make her a favorite among travelers."
    },
    {
      name: "Norbu Lhanden",
      position: "Team Member",
      email: "norbul096@gmail.com",
      github: "https://github.com/Lhaden123",
      image: "https://avatars.githubusercontent.com/u/206064055",
      bio: "Norbu is always ready to help guests discover the best of Bhutan."
    },
    {
      name: "Jamyang Dolma",
      position: "Team Member",
      email: "jamyangdolma30@gmail.com",
      github: "https://github.com/jjdolma",
      image: "https://avatars.githubusercontent.com/u/206066764",
      bio: "Jamyang is passionate about sharing Bhutan's unique traditions and stories."
    },
    {
      name: "Tashi Yuden",
      position: "Team Member",
      email: "tashiyuden07@gmail.com",
      github: "https://github.com/ttyuedenn",
      image: "https://avatars.githubusercontent.com/u/206065469",
      bio: "Tashi ensures every detail of your trip is perfectly arranged."
    },
    {
      name: "Phuntsho Galey Namgay",
      position: "Team Member",
      email: "phuntshonamgay00@gmail.com",
      github: "https://github.com/Galey100",
      image: "https://avatars.githubusercontent.com/u/206063415",
      bio: "Phuntsho is dedicated to making every journey special for our guests."
    },
    {
      name: "Tek Nath Dahal",
      position: "Team Member",
      email: "tek25046@gmail.com",
      github: "https://github.com/TekNath123",
      image: "https://avatars.githubusercontent.com/u/206063750",
      bio: "Tek Nath brings a wealth of experience and a warm smile to every tour."
    },
    {
      name: "Tshering Phuntsho",
      position: "Team Member",
      email: "tshering1200@gmail.com",
      github: "https://github.com/Tshering123-max",
      image: "https://avatars.githubusercontent.com/u/208429662",
      bio: "Tshering is always eager to help guests explore Bhutan's hidden gems."
    },
    {
      name: "Sangay Wangmo",
      position: "Team Member",
      email: "wangmo30sangay@gmail.com",
      github: "https://github.com/sangay-wangmo",
      image: "https://avatars.githubusercontent.com/u/138448628",
      bio: "Sangay's enthusiasm and knowledge make every trip unforgettable."
    },
    {
      name: "Yeshi Choden",
      position: "Team Member",
      email: "yeshi1104@gmail.com",
      github: "https://github.com/yeshi7",
      image: "https://randomuser.me/api/portraits/women/47.jpg",
      bio: "Yeshi is dedicated to providing the best possible experience for every traveler."
    },
    {
      name: "Phurba sherpa Wangmo",
      position: "Team Member",
      email: "phurbasekai134@gmail.com",
      github: "https://github.com/phurba24",
      image: "https://avatars.githubusercontent.com/u/206063762",
      bio: "Phurba's attention to detail ensures every journey is smooth and enjoyable."
    },
    {
      name: "Susma Gurung",
      position: "Team Member",
      email: "gurungsusma497@gmail.com",
      github: "https://github.com/susma888",
      image: "https://avatars.githubusercontent.com/u/206171620",
      bio: "Susma is passionate about making every guest feel at home in Bhutan."
    },
    {
      name: "Uygen Choden",
      position: "Team Member",
      email: "uchoden757@gmail.com",
      github: "https://github.com/U-55",
      image: "https://randomuser.me/api/portraits/women/50.jpg",
      bio: "Uygen's friendly approach and local knowledge delight all our guests."
    },
    {
      name: "Tenzin Choden",
      position: "Team Member",
      email: "tendenzinchogmail.com",
      github: "https://github.com/Tenzey001",
      image: "https://avatars.githubusercontent.com/u/206064245",
      bio: "Tenzin is always ready to go the extra mile to make your trip special."
    }
  ];

  return (
    <main className="bg-white min-h-[70vh] mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-6 text-blue-900">About LWP Travel & Tours</h1>
      <p className="text-lg text-gray-700 mb-4">
        Welcome to LWP Travel & Tours! We are passionate about sharing the beauty, culture, and adventure of Bhutan with travelers from around the world. Our team of local experts is dedicated to crafting authentic, memorable journeys tailored to your interests.
      </p>
      <p className="text-gray-600 mb-4">
        With years of experience and a deep love for our homeland, we offer a wide range of tours, from cultural immersions and festival experiences to trekking, luxury escapes, and more. Our mission is to provide you with a seamless, enriching, and sustainable travel experience in Bhutan.
      </p>
      <p className="text-gray-600 mb-12">
        Thank you for considering LWP Travel & Tours for your Bhutan adventure. We look forward to welcoming you as our guest—and sending you home as family!
      </p>

      <section>
        <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 gap-10 px-20">
          {team.map((member, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={idx}
                className={`bg-gray-50 rounded-xl shadow p-6 flex flex-col md:flex-row items-center border border-gray-100 h-full max-w-3xl ${isEven ? 'md:flex-row-reverse md:ml-auto' : 'md:mr-auto'} md:px-10`}
                style={{ width: '100%' }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover mb-4 md:mb-0 md:mx-8 border-4 border-white shadow flex-shrink-0"
                />
                <div className="flex-1 text-center md:text-left flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-700 text-base mb-2 font-semibold">{member.position}</p>
                  <p className="text-gray-600 mb-2 text-sm">{member.bio}</p>
                  {member.email && <p className="text-gray-500 text-xs mb-1 break-all">{member.email}</p>}
                  <Link
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-600 text-xs underline"
                  >
                    GitHub
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
} 