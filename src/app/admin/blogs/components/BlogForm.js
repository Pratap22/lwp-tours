'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TiptapEditor from './TiptapEditor';
import ImageUploader from '@/app/components/ImageUploader';
import toast from 'react-hot-toast';

function Card({ children, title, description, footer, padding = 'p-6' }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-sm">
      {(title || description) && (
        <div className="p-4 border-b border-gray-700">
          {title && <h3 className="text-lg font-semibold text-gray-200">{title}</h3>}
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
      )}
      <div className={padding}>
        {children}
      </div>
      {footer && (
        <div className="p-4 bg-gray-800 border-t border-gray-700 rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  );
}

export default function BlogForm({ blog: initialBlog, isEditing = false }) {
  const [blog, setBlog] = useState({
    title: '',
    slug: '',
    content: {},
    featuredImage: '',
    tags: '',
    metaTitle: '',
    metaDescription: '',
    status: 'draft',
    ...initialBlog,
    tags: initialBlog?.tags?.join(', ') || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const generateSlug = useCallback((title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // remove non-word chars
      .replace(/[\s_-]+/g, '-') // collapse whitespace and replace by -
      .replace(/^-+|-+$/g, ''); // remove leading/trailing dashes
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      const newSlug = generateSlug(value);
      setBlog(prev => ({ ...prev, title: value, slug: newSlug }));
    } else {
      setBlog(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleContentChange = (newContent) => {
    setBlog(prev => ({ ...prev, content: newContent }));
  };

  const handleImageUpload = (url) => {
    setBlog(prev => ({ ...prev, featuredImage: url }));
  };

  const handleSubmit = async (e, newStatus) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const status = newStatus || blog.status;
    const payload = {
      ...blog,
      tags: blog.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      status,
    };

    try {
      const url = isEditing ? `/api/blogs/${initialBlog.slug}` : '/api/blogs';
      const method = isEditing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (res.ok) {
        toast.success(`Blog post ${isEditing ? 'updated' : 'created'} successfully!`);
        router.push('/admin/blogs');
        router.refresh();
      } else {
        throw new Error(result.message || 'An error occurred.');
      }
    } catch (error) {
      console.error('Failed to submit blog post:', error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formStyles = {
    input: "bg-gray-900 border-gray-700 text-gray-300 px-3 py-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 block w-full",
    textarea: "bg-gray-900 border-gray-700 text-gray-300 px-3 py-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 block w-full",
    label: "block text-sm font-medium text-gray-400 mb-1",
    description: "mt-2 text-sm text-gray-500",
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, 'published')}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-8">
        {/* Main content area */}
        <div className="lg:col-span-2 space-y-6">
          <Card padding="p-4">
            <input
              type="text"
              name="title"
              id="title"
              value={blog.title}
              onChange={handleChange}
              placeholder="Blog Post Title"
              className="text-2xl font-bold w-full bg-transparent border-none focus:ring-0 text-gray-200 placeholder-gray-500"
              required
            />
          </Card>
          <TiptapEditor
            content={blog.content}
            onChange={handleContentChange}
          />
        </div>

        {/* Sidebar for settings */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
          <Card title="Post Settings">
            <div className="space-y-4">
               <div>
                <label htmlFor="featuredImage" className={formStyles.label}>Featured Image</label>
                <div className="mt-1">
                  <ImageUploader
                    onUpload={handleImageUpload}
                    initialUrls={blog.featuredImage ? [blog.featuredImage] : []}
                    multiple={false}
                    label=""
                  />
                </div>
              </div>
               <div>
                <label htmlFor="tags" className={formStyles.label}>Tags</label>
                <input type="text" name="tags" id="tags" value={blog.tags} onChange={handleChange} placeholder="e.g., travel, bhutan" className={formStyles.input} />
                <p className={formStyles.description}>Separate tags with commas.</p>
              </div>
            </div>
          </Card>
          <Card title="SEO & URL" description="Customize how your post appears in search results.">
            <div className="space-y-4">
              <div>
                <label htmlFor="slug" className={formStyles.label}>Slug</label>
                <input type="text" name="slug" id="slug" value={blog.slug} onChange={handleChange} className={formStyles.input} />
                <p className={formStyles.description}>The URL-friendly version of the title.</p>
              </div>
              <div>
                <label htmlFor="metaTitle" className={formStyles.label}>Meta Title</label>
                <input type="text" name="metaTitle" id="metaTitle" value={blog.metaTitle} onChange={handleChange} className={formStyles.input} />
              </div>
              <div>
                <label htmlFor="metaDescription" className={formStyles.label}>Meta Description</label>
                <textarea name="metaDescription" id="metaDescription" value={blog.metaDescription} onChange={handleChange} rows="3" className={formStyles.textarea}></textarea>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-end gap-4 bg-gray-800/80 backdrop-blur-lg p-4 rounded-lg shadow-md sticky bottom-4 border border-gray-700">
        <button type="button" onClick={() => router.push('/admin/blogs')} className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 border border-gray-600">
          Cancel
        </button>
        <button type="button" onClick={(e) => handleSubmit(e, 'draft')} disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-500 disabled:opacity-50">
          {isSubmitting ? 'Saving...' : 'Save as Draft'}
        </button>
        <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50">
          {isSubmitting ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </form>
  );
}