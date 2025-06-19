import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/mongodb';
import Tour from '../../../models/Tour';

export async function GET(request, { params }) {
  const { slug } = params;
  console.log('Requested slug:', slug); // Debug log

  try {
    await dbConnect();
    
    const tour = await Tour.findOne({ slug });
    console.log('Found tour:', tour ? 'yes' : 'no'); // Debug log
    
    if (!tour) {
      console.log('Tour not found for slug:', slug); // Debug log
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