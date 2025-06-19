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
    const { title, slug, description, duration, price, imageUrl, groupSize, difficulty, bestTime, included } = body;
    
    if (!title || !slug || !description || !duration || !price || !imageUrl || !groupSize || !difficulty || !bestTime) {
      return NextResponse.json(
        { error: 'All fields are required' },
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