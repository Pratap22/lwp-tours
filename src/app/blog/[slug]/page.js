import Image from 'next/image';
import TiptapRenderer from '@/app/components/TiptapRenderer';

async function getBlog(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${slug}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch blog post');
  }
  return res.json();
}

export async function generateMetadata({ params }) {
  const { data: post } = await getBlog(params.slug);
  
  if (!post) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    }
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || 'Read this blog post from LWP Travel & Tours.',
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription,
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  }
}

export default async function BlogPostPage({ params }) {
  const { data: post } = await getBlog(params.slug);

  if (!post) {
    // In a real app, you'd render a 404 page here
    return <div>Post not found</div>;
  }

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{post.title}</h1>
          <div className="flex items-center gap-x-4 text-sm">
            <time dateTime={post.publishedAt} className="text-gray-500">
              Published on {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <span className="text-gray-500">by {post.author.name}</span>
          </div>
        </div>

        {post.featuredImage && (
          <div className="mt-10 relative">
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={1200}
              height={630}
              className="w-full rounded-2xl bg-gray-100 object-cover"
              priority
            />
          </div>
        )}

        <div className="mt-10">
          <TiptapRenderer content={post.content} />
        </div>
      </div>
    </div>
  );
} 