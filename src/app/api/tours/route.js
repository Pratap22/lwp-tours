import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/mongodb';
import Tour from '@/app/models/Tour';

export async function GET() {
  try {
    const db = await dbConnect();

    const tours = await Tour.find({}).lean();

    return NextResponse.json({ tours });
  } catch (error) {
    console.error('Error fetching tours:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Validate required fields
    const { title, slug, description, duration, price, imageUrl, groupSize, difficulty, bestTime, included, excluded, travelTheme, itinerary, gallery, isHero, featured } = body;
    
    const requiredFields = {
      title,
      slug,
      description,
      duration,
      price,
      imageUrl,
      groupSize,
      difficulty,
      bestTime
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: 'Required fields are missing',
          missingFields: missingFields,
          message: `Please provide the following required fields: ${missingFields.join(', ')}`
        },
        { status: 400 }
      );
    }

    // Check if tour with same slug already exists
    const existingTour = await Tour.findOne({ slug });
    if (existingTour) {
      return NextResponse.json(
        { error: 'A tour with this slug already exists' },
        { status: 400 }
      );
    }

    // Create new tour
    const tour = new Tour({
      title,
      slug,
      description,
      duration,
      price: Number(price),
      imageUrl,
      groupSize,
      difficulty,
      bestTime,
      included: included || [],
      excluded: excluded || [],
      travelTheme: travelTheme || '',
      itinerary: itinerary || [],
      gallery: gallery || [],
      isHero: isHero || false,
      featured: featured || false,
    });

    await tour.save();
    
    return NextResponse.json(tour, { status: 201 });
  } catch (error) {
    console.error('Error creating tour:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
} 