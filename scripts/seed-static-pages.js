const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Define the Content schema locally (similar to the model)
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
    email: { type: String },
    github: { type: String },
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

// Static page data
const staticPagesData = [
  {
    sectionId: 'about-us',
    order: 1,
    isActive: true,
    hero: {
      title: 'About LWP Travel & Tours',
      subtitle: 'Your trusted local experts for unforgettable journeys in the Land of the Thunder Dragon.',
      image: '/hero-cultural.jpg'
    },
    title: 'Welcome to Your Bhutan Adventure',
    content: 'At LWP Travel & Tours, we don\'t just sell tours; we craft lifelong memories. As a premier, locally-owned tour operator based in the heart of Bhutan, we are passionate about sharing the magic of our kingdom with you.\n\nOur team of dedicated local experts leverages deep-rooted knowledge and a love for our heritage to design authentic, immersive, and personalized journeys. Whether you seek cultural discovery, spiritual enrichment, or thrilling adventure, we are your trusted guides to the wonders of Bhutan.',
    values: [
      {
        icon: 'CheckCircleIcon',
        title: 'Authenticity',
        description: 'We craft real, immersive experiences that connect you with the heart of Bhutan.',
        isActive: true,
        order: 1
      },
      {
        icon: 'StarIcon',
        title: 'Excellence',
        description: 'From planning to execution, we deliver exceptional service and quality.',
        isActive: true,
        order: 2
      },
      {
        icon: 'HeartIcon',
        title: 'Passion',
        description: 'Our deep love for Bhutan drives us to share its magic with the world.',
        isActive: true,
        order: 3
      }
    ],
    teamMembers: [
      {
        name: 'Pratap Sharma',
        position: 'CEO & Founder',
        email: '',
        github: 'https://github.com/pratap22',
        image: 'https://avatars.githubusercontent.com/u/19977758',
        bio: 'Pratap leads LWP Travel & Tours with a vision for authentic, meaningful travel in Bhutan. With years of experience, he ensures every journey is exceptional.',
        isActive: true,
        order: 1
      },
      {
        name: 'Dawa Yoezer Dorji',
        position: 'Head, Operation',
        email: 'dawayoezer22@gamil.com',
        github: 'https://github.com/yoez2',
        image: 'https://avatars.githubusercontent.com/u/147582853',
        bio: 'Dawa oversees all operations, ensuring seamless travel experiences for every guest. Her attention to detail and dedication are unmatched.',
        isActive: true,
        order: 2
      }
    ]
  },
  {
    sectionId: 'why-us',
    order: 2,
    isActive: true,
    hero: {
      title: 'Why Travel with Us?',
      subtitle: 'Experience Bhutan differently. Discover the genuine connection, expertise, and passion that set us apart.',
      image: '/gallery-1.jpg'
    },
    title: 'The LWP Travel & Tours Difference',
    subtitle: 'What makes our journeys unforgettable.',
    reasons: [
      {
        icon: 'UsersIcon',
        title: 'Local Experts, Global Standards',
        description: 'Our team is 100% local, born and raised in Bhutan. We combine our deep, personal knowledge with international standards of service to give you an unparalleled, authentic experience.',
        isActive: true,
        order: 1
      },
      {
        icon: 'MapPinIcon',
        title: 'Truly Tailor-Made Journeys',
        description: 'Your adventure is yours alone. We don\'t do cookie-cutter tours. We listen to your interests and craft a personalized itinerary that matches your dream trip perfectly.',
        isActive: true,
        order: 2
      },
      {
        icon: 'PhoneIcon',
        title: '24/7 On-Trip Support',
        description: 'Travel with peace of mind knowing our team is available around the clock to assist you with any needs during your trip.'
      }
    ],
    steps: [
      { icon: '1', title: 'Personalized Planning' },
      { icon: '2', title: 'Seamless Execution' },
      { icon: '3', title: 'Lasting Memories' }
    ]
  },
  {
    sectionId: 'travel-info',
    order: 3,
    isActive: true,
    hero: {
      title: 'Essential Travel Info',
      subtitle: 'Everything you need to know to prepare for your unforgettable journey to Bhutan.',
      image: '/hero-trekking.jpg'
    },
    items: [
      {
        icon: 'GlobeAltIcon',
        title: 'Visa & Permits',
        description: 'All international tourists (except from India) require a visa, which must be pre-arranged through a licensed Bhutanese tour operator like us. We handle the entire process for you. Your visa clearance letter is required for boarding your flight to Bhutan.',
      },
      {
        icon: 'SunIcon',
        title: 'Best Time to Visit',
        description: 'The best seasons are Spring (March-May) and Autumn (September-November), offering pleasant weather and clear skies. These times are ideal for trekking and festivals. Winter is cold but clear, while Summer brings monsoons.',
      },
      {
        icon: 'CurrencyDollarIcon',
        title: 'Money & Currency',
        description: 'Bhutan\'s currency is the Ngultrum (Nu.), pegged to the Indian Rupee. USD is widely accepted in tourist areas. ATMs are available in major towns but can be unreliable; we recommend bringing sufficient cash. Credit cards are accepted in high-end hotels and some shops.',
      },
    ],
    faqs: [
      {
        title: 'Do I need a guide in Bhutan?',
        content: 'Yes, it is a government regulation that all tourists must be accompanied by a licensed Bhutanese guide throughout their stay. This ensures you have a safe, insightful, and well-managed experience.'
      },
      {
        title: 'What is the daily tourist fee?',
        content: 'The Sustainable Development Fee (SDF) is a daily levy paid by tourists. This fee supports Bhutan\'s development, such as free healthcare and education for its citizens, and helps preserve its pristine environment and culture.'
      },
      {
        title: 'Is Bhutan safe for solo travelers?',
        content: 'Absolutely. Bhutan is one of the safest countries in the world, with a very low crime rate. Your guide will be with you throughout your journey, ensuring your safety and providing companionship.'
      }
    ]
  }
];

async function seedStaticPages() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Get existing content or create new
    let content = await Content.findOne();
    if (!content) {
      content = new Content({ sections: [] });
    }

    // Update or add static page sections
    for (const pageData of staticPagesData) {
      const existingIndex = content.sections.findIndex(section => section.sectionId === pageData.sectionId);
      
      if (existingIndex >= 0) {
        // Update existing section
        content.sections[existingIndex] = { ...content.sections[existingIndex], ...pageData };
        console.log(`Updated section: ${pageData.sectionId}`);
      } else {
        // Add new section
        content.sections.push(pageData);
        console.log(`Added new section: ${pageData.sectionId}`);
      }
    }

    // Save the content
    await content.save();
    console.log('Static pages seeded successfully!');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding static pages:', error);
    await mongoose.disconnect();
  }
}

seedStaticPages();
