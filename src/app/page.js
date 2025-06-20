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

// Fetch options without caching
const fetchOptions = {
  cache: 'no-store'
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

// Component mapping for dynamic rendering
const sectionComponents = {
  gallery: Gallery,
  awards: AwardsSection,
  aboutBhutan: AboutBhutanSection,
  customJourney: CustomJourneySection,
  travelThemes: TravelThemes,
  whyChooseUs: WhyChooseUs,
  testimonials: Testimonials,
  bookingProcess: BookingProcess,
  smallGroupTours: SmallGroupTours,
  navigation: null // Navigation is handled separately in Header
};

export default async function Home() {
  const { heroTours, content, tours } = await getPageData();

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading content...</p>
      </div>
    );
  }

  // Get sorted sections (excluding navigation which is handled in Header)
  const sortedSections = content.sections
    ?.filter(section => section.sectionId !== 'navigation' && section.isActive !== false)
    ?.sort((a, b) => a.order - b.order) || [];

  return (
    <main>
      {/* HeroSection is always first */}
      <HeroSection heroTours={heroTours} />
      
      {/* Render sections in order */}
      {sortedSections.map((section) => {
        const Component = sectionComponents[section.sectionId];
        if (!Component) return null;

        // Pass additional props for specific sections
        const props = {
          content: section,
          ...(section.sectionId === 'smallGroupTours' && { tours })
        };

        return <Component key={section.sectionId} {...props} />;
      })}
    </main>
  );
}
