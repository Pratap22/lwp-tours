import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/mongodb';
import Blog from '@/app/models/Blog';
import { verifyAdmin } from '@/app/lib/auth';

// GET a single blog post
export async function GET(request, context) {
  try {
    const { slug } = await context.params;
    await dbConnect();
    const blog = await Blog.findOne({ slug });
    
    if (!blog) {
      return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error('API_BLOG_SLUG_GET_ERROR', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch blog.' }, { status: 500 });
  }
}

// UPDATE a blog post
export async function PUT(request, context) {
  const auth = await verifyAdmin(request);
  if (!auth.success) {
    return NextResponse.json(auth.data, { status: auth.status });
  }

  try {
    const { slug } = await context.params;
    await dbConnect();
    const body = await request.json();
    
    // If status is being changed to 'published' and publishedAt is not set
    if (body.status === 'published') {
        const existingPost = await Blog.findOne({ slug });
        if (existingPost && !existingPost.publishedAt) {
            body.publishedAt = new Date();
        }
    }

    const blog = await Blog.findOneAndUpdate({ slug }, body, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error('API_BLOG_SLUG_PUT_ERROR', error);
    if (error.name === 'ValidationError') {
      const errors = Object.keys(error.errors).reduce((acc, key) => {
        acc[key] = error.errors[key].message;
        return acc;
      }, {});
      return NextResponse.json({ success: false, message: 'Validation failed.', errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Failed to update blog.' }, { status: 500 });
  }
}

// DELETE a blog post
export async function DELETE(request, context) {
  const auth = await verifyAdmin(request);
  if (!auth.success) {
    return NextResponse.json(auth.data, { status: auth.status });
  }

  try {
    const { slug } = await context.params;
    await dbConnect();
    const deletedBlog = await Blog.findOneAndDelete({ slug });

    if (!deletedBlog) {
      return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Blog deleted successfully.' });
  } catch (error) {
    console.error('API_BLOG_SLUG_DELETE_ERROR', error);
    return NextResponse.json({ success: false, message: 'Failed to delete blog.' }, { status: 500 });
  }
} 