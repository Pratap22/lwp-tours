import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/mongodb';
import Tour from '../../../models/Tour';

export async function GET(request, { params }) {
  const { slug } = await params;

  try {
    await dbConnect();
    
    const tour = await Tour.findOne({ slug });
    
    if (!tour) {
      return NextResponse.json(
        { error: 'Tour not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(tour);
  } catch (error) {
    console.error('Error fetching tour:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { slug } = await params;

  try {
    await dbConnect();
    const body = await request.json();
    
    // Validate required fields
    const { title, slug: newSlug, description, duration, price, imageUrl, groupSize, difficulty, bestTime, travelTheme, itinerary, excluded, gallery } = body;
    
    const requiredFields = {
      title,
      slug: newSlug,
      description,
      duration,
      price,
      imageUrl,
      groupSize,
      difficulty,
      bestTime,
      travelTheme,
      itinerary
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key === 'slug' ? 'newSlug' : key);

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

    // Check if new slug already exists (excluding current tour)
    if (newSlug !== slug) {
      const existingTour = await Tour.findOne({ slug: newSlug });
      if (existingTour) {
        return NextResponse.json(
          { error: 'A tour with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // First, find the current tour
    const currentTour = await Tour.findOne({ slug });

    // Update tour with all fields
    const updateData = {
      $set: {
        title,
        slug: newSlug,
        description,
        duration,
        price: Number(price),
        imageUrl,
        groupSize,
        difficulty,
        bestTime,
        isHero: Boolean(body.isHero),
        featured: Boolean(body.featured),
        included: body.included || currentTour?.included || [],
        travelTheme: travelTheme || '',
        itinerary: itinerary || currentTour?.itinerary || [],
        excluded: body.excluded || currentTour?.excluded || [],
        gallery: gallery || currentTour?.gallery || [],
      }
    };

    const updatedTour = await Tour.findOneAndUpdate(
      { slug },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTour) {
      console.log('Tour not found for slug:', slug);
      return NextResponse.json(
        { error: 'Tour not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedTour);
  } catch (error) {
    console.error('Error updating tour:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { slug } = await params;

  try {
    await dbConnect();
    
    const tour = await Tour.findOneAndDelete({ slug });
    
    if (!tour) {
      return NextResponse.json(
        { error: 'Tour not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Tour deleted successfully' });
  } catch (error) {
    console.error('Error deleting tour:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
} 