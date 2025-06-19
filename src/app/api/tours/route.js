import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/mongodb';
import Tour from '../../models/Tour';

export async function GET() {
  try {
    await dbConnect();
    const tours = await Tour.find({}).sort({ createdAt: -1 });
    return NextResponse.json(tours);
  } catch (error) {
    console.error('Error fetching tours:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Validate required fields
    const { title, slug, description, duration, price, image } = body;
    
    if (!title || !slug || !description || !duration || !price || !image) {
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
      image,
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