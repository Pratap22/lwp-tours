const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const tours = [
  {
    title: 'Cultural Immersion Tour',
    slug: 'cultural-immersion-tour',
    description: 'Experience authentic Bhutanese culture and traditions with local experts. Visit monasteries, fortresses, and rural villages.',
    duration: '7 Days / 6 Nights',
    price: 1899,
    imageUrl: '/tour-cultural.jpg',
    groupSize: 'Small groups (max 12 people)',
    difficulty: 'Easy',
    bestTime: 'March - May, September - November',
    included: [
      'All accommodation in comfortable hotels',
      'All meals (breakfast, lunch, dinner)',
      'Professional English-speaking guide',
      'All transportation and transfers',
      'Bhutan visa and permits',
      'All entrance fees and activities'
    ],
    isHero: true
  },
  {
    title: 'Bhutan Festival Adventure',
    slug: 'bhutan-festival-adventure',
    description: 'Witness vibrant festivals and celebrations in Bhutan. Enjoy mask dances, music, and local cuisine.',
    duration: '10 Days / 9 Nights',
    price: 2499,
    imageUrl: '/tour-festival.jpg',
    groupSize: 'Small groups (max 15 people)',
    difficulty: 'Easy',
    bestTime: 'Festival dates vary by season',
    included: [
      'All accommodation in comfortable hotels',
      'All meals (breakfast, lunch, dinner)',
      'Professional English-speaking guide',
      'All transportation and transfers',
      'Bhutan visa and permits',
      'All entrance fees and activities',
      'Festival tickets and arrangements'
    ],
    isHero: true
  },
  {
    title: 'Druk Path Trek',
    slug: 'druk-path-trek',
    description: 'Trek the famous Druk Path, connecting Paro and Thimphu through stunning mountain scenery and pristine lakes.',
    duration: '6 Days / 5 Nights',
    price: 2099,
    imageUrl: '/tour-trek.jpg',
    groupSize: 'Small groups (max 8 people)',
    difficulty: 'Moderate',
    bestTime: 'March - May, September - November',
    included: [
      'All camping equipment and arrangements',
      'All meals (breakfast, lunch, dinner)',
      'Professional trekking guide',
      'Porter services',
      'Bhutan visa and permits',
      'All transportation and transfers'
    ],
    isHero: true
  },
  {
    title: 'Luxury Bhutan Escape',
    slug: 'luxury-bhutan-escape',
    description: 'Enjoy Bhutan in luxury with premium hotels, private guides, and exclusive experiences.',
    duration: '5 Days / 4 Nights',
    price: 3999,
    imageUrl: '/tour-luxury.jpg',
    groupSize: 'Private tours',
    difficulty: 'Easy',
    bestTime: 'Year-round',
    included: [
      'Luxury hotel accommodation',
      'All gourmet meals',
      'Private guide and driver',
      'Premium transportation',
      'Bhutan visa and permits',
      'Exclusive cultural experiences'
    ],
    isHero: true
  },
  {
    title: 'Rural Bhutan Exploration',
    slug: 'rural-bhutan-exploration',
    description: 'Discover authentic village life, stay with local families, and experience Bhutanese hospitality.',
    duration: '8 Days / 7 Nights',
    price: 1799,
    imageUrl: '/tour-rural.jpg',
    groupSize: 'Small groups (max 10 people)',
    difficulty: 'Moderate',
    bestTime: 'March - May, September - November',
    included: [
      'Mix of homestays and hotels',
      'All meals (breakfast, lunch, dinner)',
      'Professional English-speaking guide',
      'All transportation and transfers',
      'Bhutan visa and permits',
      'Local community activities'
    ],
    isHero: false
  },
  {
    title: 'Bird Watching Tour',
    slug: 'bird-watching-tour',
    description: 'Explore Bhutan\'s rich biodiversity and spot rare Himalayan birds with expert guides.',
    duration: '9 Days / 8 Nights',
    price: 2299,
    imageUrl: '/tour-bird.jpg',
    groupSize: 'Small groups (max 8 people)',
    difficulty: 'Easy to Moderate',
    bestTime: 'November - March',
    included: [
      'All accommodation in comfortable hotels',
      'All meals (breakfast, lunch, dinner)',
      'Professional bird watching guide',
      'All transportation and transfers',
      'Bhutan visa and permits',
      'Bird watching equipment'
    ],
    isHero: false
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  
  // Define the Tour schema inline since we can't import the model directly
  const TourSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    groupSize: { type: String, required: true },
    difficulty: { type: String, required: true },
    bestTime: { type: String, required: true },
    included: [{ type: String }],
    isHero: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  });
  
  const Tour = mongoose.models.Tour || mongoose.model('Tour', TourSchema);
  
  await Tour.deleteMany({});
  await Tour.insertMany(tours);
  console.log('Seeded tours successfully!');
  await mongoose.disconnect();
}

seed().catch(console.error); 