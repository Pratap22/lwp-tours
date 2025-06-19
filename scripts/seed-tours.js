const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const tours = [
  {
    title: 'Cultural Immersion Tour',
    slug: 'cultural-immersion-tour',
    description: 'Experience authentic Bhutanese culture and traditions with local experts. Visit monasteries, fortresses, and rural villages.',
    duration: '7 Days / 6 Nights',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  },
  {
    title: 'Bhutan Festival Adventure',
    slug: 'bhutan-festival-adventure',
    description: 'Witness vibrant festivals and celebrations in Bhutan. Enjoy mask dances, music, and local cuisine.',
    duration: '10 Days / 9 Nights',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b',
  },
  {
    title: 'Druk Path Trek',
    slug: 'druk-path-trek',
    description: 'Trek the famous Druk Path, connecting Paro and Thimphu through stunning mountain scenery and pristine lakes.',
    duration: '6 Days / 5 Nights',
    price: 2099,
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
  },
  {
    title: 'Luxury Bhutan Escape',
    slug: 'luxury-bhutan-escape',
    description: 'Enjoy Bhutan in luxury with premium hotels, private guides, and exclusive experiences.',
    duration: '5 Days / 4 Nights',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
  },
  {
    title: 'Rural Bhutan Exploration',
    slug: 'rural-bhutan-exploration',
    description: 'Discover authentic village life, stay with local families, and experience Bhutanese hospitality.',
    duration: '8 Days / 7 Nights',
    price: 1799,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
  },
  {
    title: 'Bird Watching Tour',
    slug: 'bird-watching-tour',
    description: 'Explore Bhutan\'s rich biodiversity and spot rare Himalayan birds with expert guides.',
    duration: '9 Days / 8 Nights',
    price: 2299,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
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
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  const Tour = mongoose.models.Tour || mongoose.model('Tour', TourSchema);
  
  await Tour.deleteMany({});
  await Tour.insertMany(tours);
  console.log('Seeded tours successfully!');
  await mongoose.disconnect();
}

seed().catch(console.error); 