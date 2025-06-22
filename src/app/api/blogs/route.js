import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/mongodb';
import Blog from '@/app/models/Blog';
import { verifyAdmin } from '@/app/lib/auth';

export async function POST(request) {
  const auth = await verifyAdmin(request);
  if (!auth.success) {
    return NextResponse.json(auth.data, { status: auth.status });
  }

  try {
    await dbConnect();
    const body = await request.json();
    
    // Auto-generate slug from title if not provided
    let slug = body.slug;
    if (!slug && body.title) {
        slug = body.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .slice(0, 90);
    }

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return NextResponse.json({ success: false, message: 'A blog with this slug already exists.' }, { status: 409 });
    }

    // Set publishedAt if status is 'published' and it's not already set
    if (body.status === 'published' && !body.publishedAt) {
      body.publishedAt = new Date();
    }
    
    const blog = await Blog.create({ ...body, slug });

    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error) {
    console.error('API_BLOGS_POST_ERROR', error);
    let errorMessage = 'An unexpected error occurred.';
    let errors;

    if (error.name === 'ValidationError') {
      errorMessage = 'Validation failed.';
      errors = Object.keys(error.errors).reduce((acc, key) => {
        acc[key] = error.errors[key].message;
        return acc;
      }, {});
      return NextResponse.json({ success: false, message: errorMessage, errors }, { status: 400 });
    }
    
    return NextResponse.json({ success: false, message: errorMessage, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error('API_BLOGS_GET_ERROR', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch blogs.' }, { status: 500 });
  }
} 