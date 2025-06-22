import Link from 'next/link';
import Image from 'next/image';

async function getBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch blogs');
  }
  const data = await res.json();
  // Filter for published blogs only
  return data.data.filter(blog => blog.status === 'published');
}

export const metadata = {
  title: 'Blog | LWP Travel & Tours',
  description: 'Read the latest articles, stories, and travel tips from the experts at LWP Travel & Tours.',
};

export default async function BlogIndexPage() {
  const blogs = await getBlogs();

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From Our Blog</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Discover stories, tips, and insights about traveling in Bhutan.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {blogs.map((post) => (
            <article key={post._id} className="flex flex-col items-start justify-between">
              <div className="relative w-full">
                <Image
                  src={post.featuredImage || '/placeholder-image.jpg'}
                  alt={post.title}
                  width={800}
                  height={600}
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={post.publishedAt} className="text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                  {post.tags?.[0] && (
                    <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                      {post.tags[0]}
                    </span>
                  )}
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.metaDescription}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  {/* Author logic can be expanded here */}
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      {post.author.name}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
} 