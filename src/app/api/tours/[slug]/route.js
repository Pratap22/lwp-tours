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
    const { title, slug: newSlug, description, duration, price, image } = body;
    
    if (!title || !newSlug || !description || !duration || !price || !image) {
      return NextResponse.json(
        { error: 'All fields are required' },
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

    // Update tour
    const updatedTour = await Tour.findOneAndUpdate(
      { slug },
      {
        title,
        slug: newSlug,
        description,
        duration,
        price: Number(price),
        image,
      },
      { new: true, runValidators: true }
    );

    if (!updatedTour) {
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