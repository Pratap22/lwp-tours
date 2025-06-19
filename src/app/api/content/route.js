import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/mongodb';
import Content from '../../models/Content';

export async function GET() {
  try {
    await dbConnect();
    
    // Get the first (and only) content document
    let content = await Content.findOne();
    
    // If no content exists, create default content
    if (!content) {
      content = await Content.create({
        heroCarousel: {
          slides: [
            {
              title: "True Cultural Immersion",
              subtitle: "Experience Bhutan's deeply spiritual culture and rich traditions.",
              image: "/hero-cultural.jpg",
              cta: "View Trips",
              isActive: true,
              order: 0
            },
            {
              title: "Bhutan's Festival Experience",
              subtitle: "Explore Bhutan's spiritual depth at its lively festivals",
              image: "/hero-festival.jpg",
              cta: "View Trips",
              isActive: true,
              order: 1
            },
            {
              title: "Trekking And Adventures",
              subtitle: "Explore Challenging Trails And Connect With Bhutan's Natural Beauty.",
              image: "/hero-trekking.jpg",
              cta: "View Trips",
              isActive: true,
              order: 2
            },
            {
              title: "Bhutan in Luxury",
              subtitle: "Experience Bhutan in ultimate luxury and comfort",
              image: "/hero-luxury.jpg",
              cta: "View Trips",
              isActive: true,
              order: 3
            }
          ],
          isActive: true,
          autoplaySpeed: 4000
        },
        gallery: {
          images: [
            { src: "/gallery-1.jpg", alt: "Tiger's Nest Monastery", isActive: true, order: 0 },
            { src: "/gallery-2.jpg", alt: "Bhutanese Festival", isActive: true, order: 1 },
            { src: "/gallery-3.jpg", alt: "Mountain Landscape", isActive: true, order: 2 },
            { src: "/gallery-4.jpg", alt: "Traditional Dance", isActive: true, order: 3 },
            { src: "/gallery-5.jpg", alt: "Prayer Flags", isActive: true, order: 4 },
            { src: "/gallery-6.jpg", alt: "Punakha Dzong", isActive: true, order: 5 }
          ],
          isActive: true,
          title: "Bhutan Photo Gallery",
          subtitle: "Discover the Beauty of Bhutan"
        },
        awards: {
          isActive: true,
          items: [
            { icon: "🏆", title: "Travel Excellence Awards", isActive: true, order: 0 },
            { icon: "🤝", title: "Trustworthy Travels", isActive: true, order: 1 },
            { icon: "💰", title: "Exceptional value", isActive: true, order: 2 }
          ]
        },
        aboutBhutan: {
          isActive: true,
          title: "Bhutan travel, bespoke experiences",
          content: "Located in the Himalayas, Bhutan is a truly breathtaking destination that has become increasingly popular among travelers in recent years. Bhutan's tourism philosophy is based on 'High Value, Low Impact' tourism, which aims to preserve the country's natural beauty and cultural heritage while providing visitors with a unique and authentic travel experience.\n\nThe Bhutanese have preserved a unique mix of culture, environment, and hospitality for centuries. It is a destination worth exploring. Discover and visit ancient fortresses, monasteries, beautiful landscapes, and a rich cultural tradition unlike any other place.\n\nVisit Bhutan, where the old and current eras blend with the beautiful landscapes to create a unique journey. As a local Bhutan tour operator, we promise a variety of fulfilling experiences for your memorable trip to Bhutan.",
          ctaText: "Meet our team",
          ctaLink: "/about-us"
        },
        customJourney: {
          isActive: true,
          title: "Custom-Made Journey",
          content: "At Bhutan Travel Center, we create more than just trips—we craft personalized experiences. Whether you're looking for deep cultural immersion, exclusive adventures or a romantic getaway, we design seamless journeys tailored to your needs.",
          ctaText: "speak to us",
          themeTitle: "Travel Theme",
          themeContent: "Find your perfect experience with our personalized trips that match your interests."
        },
        travelThemes: {
          isActive: true,
          title: "Travel Themes",
          subtitle: "Choose Your Adventure",
          themes: [
            {
              title: "Cultural Immersion",
              description: "Experience authentic Bhutanese culture and traditions",
              icon: "🏛️",
              isActive: true,
              order: 0
            },
            {
              title: "Adventure Trekking",
              description: "Explore challenging trails and connect with nature",
              icon: "🏔️",
              isActive: true,
              order: 1
            },
            {
              title: "Luxury Travel",
              description: "Experience Bhutan in ultimate comfort and style",
              icon: "✨",
              isActive: true,
              order: 2
            }
          ]
        },
        whyChooseUs: {
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
        testimonials: {
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
        bookingProcess: {
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
        smallGroupTours: {
          isActive: true,
          title: "Small Group Tours",
          subtitle: "Intimate Experiences with Like-Minded Travelers",
          description: "Join our small group tours for an intimate and personalized experience. Travel with like-minded adventurers while enjoying the benefits of group travel and individual attention.",
          benefits: [
            {
              text: "Intimate group sizes (max 8 travelers)",
              isActive: true,
              order: 0
            },
            {
              text: "Shared experiences and new friendships",
              isActive: true,
              order: 1
            },
            {
              text: "Cost-effective luxury travel",
              isActive: true,
              order: 2
            },
            {
              text: "Expert local guides and support",
              isActive: true,
              order: 3
            }
          ]
        }
      });
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
    
    // Update or create content
    const content = await Content.findOneAndUpdate(
      {}, // Find any document
      { 
        ...body,
        updatedAt: new Date()
      },
      { 
        new: true, 
        upsert: true, // Create if doesn't exist
        runValidators: true 
      }
    );
    
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
} 