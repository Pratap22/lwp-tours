import HeroSection from "./components/HeroSection";
import AwardsSection from "./components/AwardsSection";
import AboutBhutanSection from "./components/AboutBhutanSection";
import CustomJourneySection from "./components/CustomJourneySection";
import TravelThemes from "./components/TravelThemes";
import SmallGroupTours from "./components/SmallGroupTours";
import WhyChooseUs from "./components/WhyChooseUs";
import BookingProcess from "./components/BookingProcess";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";

// Fetch options with caching
const fetchOptions = {
  next: { 
    revalidate: 3600, // Cache for 1 hour
    tags: ['content'] // Add cache tag for manual revalidation
  }
};

async function getPageData() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    const [toursRes, contentRes] = await Promise.all([
      fetch(`${baseUrl}/api/tours`, fetchOptions),
      fetch(`${baseUrl}/api/content`, fetchOptions)
    ]);

    if (!toursRes.ok || !contentRes.ok) {
      throw new Error('Failed to fetch data');
    }

    const [toursData, contentData] = await Promise.all([
      toursRes.json(),
      contentRes.json()
    ]);

    return {
      heroTours: toursData.tours.filter(tour => tour.isHero).slice(0, 6),
      content: contentData,
      tours: toursData.tours
    };
  } catch (error) {
    console.error('Error fetching page data:', error);
    return {
      heroTours: [],
      content: null
    };
  }
}

export default async function Home() {
  const { heroTours, content, tours } = await getPageData();

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading content...</p>
      </div>
    );
  }

  return (
    <main>
      <HeroSection heroTours={heroTours} />
      {content.awards?.isActive && (
        <AwardsSection content={content.awards} />
      )}
      {content.aboutBhutan?.isActive && (
        <AboutBhutanSection content={content.aboutBhutan} />
      )}
      {content.customJourney?.isActive && (
        <CustomJourneySection content={content.customJourney} />
      )}
      {content.travelThemes?.isActive && (
        <TravelThemes content={content.travelThemes} />
      )}
      {content.smallGroupTours?.isActive && (
        <SmallGroupTours content={content.smallGroupTours} tours={tours} />
      )}
      {content.whyChooseUs?.isActive && (
        <WhyChooseUs content={content.whyChooseUs} />
      )}
      {content.bookingProcess?.isActive && (
        <BookingProcess content={content.bookingProcess} />
      )}
      {content.testimonials?.isActive && (
        <Testimonials content={content.testimonials} />
      )}
      {content.gallery?.isActive && (
        <Gallery content={content.gallery} />
      )}
    </main>
  );
}
