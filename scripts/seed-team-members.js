const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Define the Content schema to match the actual model
const themeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  iconBackgroundColor: { type: String, default: '#3b82f6' },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
});

const sectionSchemaDefinition = {
  sectionId: { type: String, required: true, unique: true },
  order: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  hero: {
    title: { type: String },
    subtitle: { type: String },
    image: { type: String },
  },
  title: { type: String },
  subtitle: { type: String },
  content: { type: String },
  ctaText: { type: String },
  ctaLink: { type: String },
  themeTitle: { type: String },
  themeContent: { type: String },
  images: [{
    src: { type: String, required: true },
    alt: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  }],
  items: [new mongoose.Schema({
    icon: { type: String },
    title: { type: String },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  }, { _id: false })],
  values: [new mongoose.Schema({
    icon: { type: String },
    title: { type: String },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  }, { _id: false })],
  teamMembers: [new mongoose.Schema({
    name: { type: String },
    position: { type: String },
    links: {
      type: [String],
      validate: [v => v.length <= 3, 'A team member can have a maximum of 3 links.']
    },
    image: { type: String },
    bio: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  }, { _id: false })],
  themes: [themeSchema],
  reasons: [new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    icon: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  }, { _id: false })],
  testimonials: [new mongoose.Schema({
    name: { type: String },
    location: { type: String },
    content: { type: String },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  }, { _id: false })],
  steps: [new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    icon: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  }, { _id: false })],
  benefits: [new mongoose.Schema({
    text: { type: String },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  }, { _id: false })],
  faqs: [new mongoose.Schema({
    title: { type: String },
    content: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  }, { _id: false })],
  navigationItems: [new mongoose.Schema({
    name: { type: String },
    href: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  }, { _id: false })]
};

const SectionSchema = new mongoose.Schema(sectionSchemaDefinition, { _id: false });

const ContentSchema = new mongoose.Schema({
  sections: [SectionSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Content = mongoose.models.Content || mongoose.model('Content', ContentSchema);

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

const seedTeamMembers = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  try {
    const formattedTeamMembers = team.map(member => {
      const links = [];
      if (member.email) links.push(`mailto:${member.email}`);
      if (member.github) links.push(member.github);
      
      return {
        name: member.name,
        position: member.position,
        image: member.image,
        bio: member.bio,
        links: links,
        isActive: true,
        order: 0,
      };
    });

    const contentDoc = await Content.findOne();
    if (!contentDoc) {
      console.log('No content document found. Creating a new one.');
      // Optionally create a new document if one doesn't exist
      await Content.create({
        sections: [{
          sectionId: 'about-us',
          order: 1,
          isActive: true,
          teamMembers: formattedTeamMembers,
        }]
      });
      console.log('New content document created and team members seeded.');
      return;
    }

    const aboutUsSection = contentDoc.sections.find(sec => sec.sectionId === 'about-us');

    if (aboutUsSection) {
      aboutUsSection.teamMembers = formattedTeamMembers;
    } else {
      contentDoc.sections.push({
        sectionId: 'about-us',
        order: 99, // Or determine a suitable order
        isActive: true,
        teamMembers: formattedTeamMembers,
      });
    }

    await contentDoc.save();
    console.log('Successfully seeded team members for the About Us page.');

  } catch (error) {
    console.error('Error seeding team members:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedTeamMembers().catch((err) => {
  console.error('Error seeding team members:', err);
  mongoose.disconnect();
}); 