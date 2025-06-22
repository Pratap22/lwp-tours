import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/mongodb';
import Content from '../../models/Content';

const defaultSections = [
  {
    sectionId: 'gallery',
    order: 1,
    isActive: true,
    title: "Bhutan Photo Gallery",
    subtitle: "Discover the Beauty of Bhutan",
    images: [
      { src: "/gallery-1.jpg", alt: "Tiger's Nest Monastery", isActive: true, order: 0 },
      { src: "/gallery-2.jpg", alt: "Bhutanese Festival", isActive: true, order: 1 },
      { src: "/gallery-3.jpg", alt: "Mountain Landscape", isActive: true, order: 2 },
      { src: "/gallery-4.jpg", alt: "Traditional Dance", isActive: true, order: 3 },
      { src: "/gallery-5.jpg", alt: "Prayer Flags", isActive: true, order: 4 },
      { src: "/gallery-6.jpg", alt: "Punakha Dzong", isActive: true, order: 5 }
    ]
  },
  {
    sectionId: 'awards',
    order: 2,
    isActive: true,
    items: [
      { icon: "🏆", title: "Travel Excellence Awards", isActive: true, order: 0 },
      { icon: "🤝", title: "Trustworthy Travels", isActive: true, order: 1 },
      { icon: "💰", title: "Exceptional value", isActive: true, order: 2 }
    ]
  },
  {
    sectionId: 'aboutBhutan',
    order: 3,
    isActive: true,
    title: "Bhutan travel, bespoke experiences",
    content: "Located in the Himalayas, Bhutan is a truly breathtaking destination that has become increasingly popular among travelers in recent years. Bhutan's tourism philosophy is based on 'High Value, Low Impact' tourism, which aims to preserve the country's natural beauty and cultural heritage while providing visitors with a unique and authentic travel experience.\n\nThe Bhutanese have preserved a unique mix of culture, environment, and hospitality for centuries. It is a destination worth exploring. Discover and visit ancient fortresses, monasteries, beautiful landscapes, and a rich cultural tradition unlike any other place.\n\nVisit Bhutan, where the old and current eras blend with the beautiful landscapes to create a unique journey. As a local Bhutan tour operator, we promise a variety of fulfilling experiences for your memorable trip to Bhutan.",
    ctaText: "Meet our team",
    ctaLink: "/about-us"
  },
  {
    sectionId: 'customJourney',
    order: 4,
    isActive: true,
    title: "Custom-Made Journey",
    content: "At Bhutan Travel Center, we create more than just trips—we craft personalized experiences. Whether you're looking for deep cultural immersion, exclusive adventures or a romantic getaway, we design seamless journeys tailored to your needs.",
    ctaText: "speak to us",
    themeTitle: "Travel Theme",
    themeContent: "Find your perfect experience with our personalized trips that match your interests."
  },
  {
    sectionId: 'travelThemes',
    order: 5,
    isActive: true,
    title: "Travel Themes",
    subtitle: "Choose Your Adventure",
    themes: [
      {
        title: "Cultural Immersion",
        description: "Experience authentic Bhutanese culture and traditions",
        icon: "🏛️",
        iconBackgroundColor: '#3b82f6',
        isActive: true,
        order: 0
      },
      {
        title: "Adventure Trekking",
        description: "Explore challenging trails and connect with nature",
        icon: "🏔️",
        iconBackgroundColor: '#ef4444',
        isActive: true,
        order: 1
      },
      {
        title: "Luxury Travel",
        description: "Experience Bhutan in ultimate comfort and style",
        icon: "✨",
        iconBackgroundColor: '#22c55e',
        isActive: true,
        order: 2
      }
    ]
  },
  {
    sectionId: 'whyChooseUs',
    order: 6,
    isActive: true,
    title: "Why Choose Us",
    subtitle: "Your Trusted Travel Partner",
    reasons: [
      {
        title: "Local Expertise",
        description: "Deep knowledge of Bhutan's culture and destinations",
        icon: "🎯",
        isActive: true,
        order: 0
      },
      {
        title: "Personalized Service",
        description: "Tailored experiences designed just for you",
        icon: "💎",
        isActive: true,
        order: 1
      },
      {
        title: "Sustainable Tourism",
        description: "Supporting local communities and preserving culture",
        icon: "🌱",
        isActive: true,
        order: 2
      }
    ]
  },
  {
    sectionId: 'testimonials',
    order: 7,
    isActive: true,
    title: "What Our Travelers Say",
    subtitle: "Real Stories from Real Travelers",
    testimonials: [
      {
        name: "Sarah Johnson",
        location: "New York, USA",
        content: "An absolutely incredible experience! The cultural immersion was beyond my expectations.",
        rating: 5,
        isActive: true,
        order: 0
      },
      {
        name: "Michael Chen",
        location: "Toronto, Canada",
        content: "The trekking adventure was challenging but rewarding. The guides were excellent.",
        rating: 5,
        isActive: true,
        order: 1
      },
      {
        name: "Emma Davis",
        location: "London, UK",
        content: "Luxury travel at its finest. Every detail was perfectly arranged.",
        rating: 5,
        isActive: true,
        order: 2
      }
    ]
  },
  {
    sectionId: 'bookingProcess',
    order: 8,
    isActive: true,
    title: "How to Book Your Trip",
    subtitle: "Simple Steps to Your Dream Vacation",
    steps: [
      {
        title: "Contact Us",
        description: "Reach out to discuss your travel preferences and requirements",
        icon: "📞",
        isActive: true,
        order: 0
      },
      {
        title: "Plan Together",
        description: "We'll create a customized itinerary based on your interests",
        icon: "🗓️",
        isActive: true,
        order: 1
      },
      {
        title: "Book & Confirm",
        description: "Secure your spot and get ready for an amazing journey",
        icon: "✅",
        isActive: true,
        order: 2
      }
    ]
  },
  {
    sectionId: 'smallGroupTours',
    order: 9,
    isActive: true,
    title: "Small Group Tours",
    subtitle: "Intimate Experiences with Like-Minded Travelers",
    description: "Join our small group tours for an intimate and personalized experience. Travel with like-minded adventurers while enjoying the benefits of group travel and individual attention.",
    benefits: [
      {
        text: "Intimate group sizes (max 8 travelers)",
        description: "Travel with a small group to ensure a personalized and immersive experience.",
        isActive: true,
        order: 0
      },
      {
        text: "Shared experiences and new friendships",
        description: "Connect with like-minded travelers and create lasting memories together.",
        isActive: true,
        order: 1
      },
      {
        text: "Cost-effective luxury travel",
        description: "Enjoy premium experiences and accommodations at an affordable price point.",
        isActive: true,
        order: 2
      },
      {
        text: "Expert local guides and support",
        description: "Benefit from the knowledge and assistance of our experienced local guides.",
        isActive: true,
        order: 3
      }
    ]
  },
  {
    sectionId: 'navigation',
    order: 10,
    isActive: true,
    navigationItems: [
      { name: "About Us", href: "/about-us", isActive: true, order: 0 },
      { name: "Tours", href: "/tours", isActive: true, order: 1 },
      { name: "Travel Info", href: "/travel-info", isActive: true, order: 2 },
      { name: "Awards", href: "/awards", isActive: true, order: 3 },
      { name: "Why Us", href: "/why-us", isActive: true, order: 4 },
      { name: "Contact Us", href: "/contact-us", isActive: true, order: 5 }
    ]
  }
];

export async function GET() {
  try {
    await dbConnect();
    
    // Get the first (and only) content document
    let content = await Content.findOne();
    
    // If no content exists, create default content
    if (!content) {
      content = await Content.create({
        sections: defaultSections,
        siteName: 'Bhutan Travel',
        siteLogo: '/logo.svg',
      });
    } else {
      // Check for missing sections and add them
      let missingSections = false;
      defaultSections.forEach(defaultSection => {
        if (!content.sections.some(s => s.sectionId === defaultSection.sectionId)) {
          content.sections.push(defaultSection);
          missingSections = true;
        }
      });

      // If we added missing sections, save the document
      if (missingSections) {
        await content.save();
      }
    }
    
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Get the existing content document
    let content = await Content.findOne();
    
    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    // Update site-wide settings if provided
    if (body.siteName) {
      content.siteName = body.siteName;
    }
    if (body.siteLogo !== undefined) {
      content.siteLogo = body.siteLogo;
    }
    if (body.footer) {
      content.footer = body.footer;
    }

    // Update sections
    if (body.sections && Array.isArray(body.sections)) {
      body.sections.forEach(updatedSection => {
        const sectionIndex = content.sections.findIndex(
          s => s.sectionId === updatedSection.sectionId
        );

        if (sectionIndex > -1) {
          // Update existing section
          content.sections[sectionIndex] = { 
            ...content.sections[sectionIndex],
            ...updatedSection 
          };
        } else {
          // Add new section if it doesn't exist
          content.sections.push(updatedSection);
        }
      });
    }

    content.updatedAt = new Date();
    await content.save();

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
} 