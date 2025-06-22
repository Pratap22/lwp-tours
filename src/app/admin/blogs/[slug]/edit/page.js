import BlogForm from '../../components/BlogForm';
import { notFound } from 'next/navigation';

async function getBlog(slug) {
  // Construct a full URL for server-side fetching
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/blogs/${slug}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data.data;
}

export default async function EditBlogPage(props) {
  const { slug } = await props.params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-white">Edit Blog Post</h1>
      <BlogForm blog={blog} isEditing={true} />
    </div>
  );
}
