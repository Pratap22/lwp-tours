"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ImageUpload from '../../components/ImageUpload';

export default function ContentManagement() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Error fetching content:', error);
      setMessage('Error loading content');
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async (section, data) => {
    setSaving(true);
    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...content,
          [section]: data
        }),
      });

      if (response.ok) {
        const updatedContent = await response.json();
        setContent(updatedContent);
        setMessage('Content saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        throw new Error('Failed to save content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      setMessage('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = async (section) => {
    const newData = {
      ...content[section],
      isActive: !content[section].isActive
    };
    await saveContent(section, newData);
  };

  const tabs = [
    { id: 'hero', name: 'Hero Carousel', icon: '🖼️' },
    { id: 'gallery', name: 'Gallery', icon: '📷' },
    { id: 'awards', name: 'Awards', icon: '🏆' },
    { id: 'aboutBhutan', name: 'About Bhutan', icon: '📖' },
    { id: 'customJourney', name: 'Custom Journey', icon: '🗺️' },
    { id: 'travelThemes', name: 'Travel Themes', icon: '🎯' },
    { id: 'whyChooseUs', name: 'Why Choose Us', icon: '💎' },
    { id: 'testimonials', name: 'Testimonials', icon: '💬' },
    { id: 'bookingProcess', name: 'Booking Process', icon: '📋' },
    { id: 'smallGroupTours', name: 'Small Group Tours', icon: '👥' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
              <p className="text-gray-600 mt-1">Manage your home page content and sections</p>
            </div>
            <Link
              href="/admin"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className={`p-4 rounded-lg border ${
            message.includes('Error') 
              ? 'bg-red-50 border-red-200 text-red-700' 
              : 'bg-green-50 border-green-200 text-green-700'
          }`}>
            {message}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3 sticky top-8 h-fit">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Sections</h2>
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <span className="mr-3 text-lg">{tab.icon}</span>
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-8">
                {activeTab === 'hero' && (
                  <HeroCarouselSection 
                    content={content.heroCarousel} 
                    onSave={(data) => saveContent('heroCarousel', data)}
                    saving={saving}
                  />
                )}

                {activeTab === 'gallery' && (
                  <GallerySection 
                    content={content.gallery} 
                    onSave={(data) => saveContent('gallery', data)}
                    saving={saving}
                  />
                )}

                {activeTab === 'awards' && (
                  <AwardsSection 
                    content={content.awards} 
                    onSave={(data) => saveContent('awards', data)}
                    saving={saving}
                  />
                )}

                {activeTab === 'aboutBhutan' && (
                  <AboutBhutanSection 
                    content={content.aboutBhutan} 
                    onSave={(data) => saveContent('aboutBhutan', data)}
                    saving={saving}
                  />
                )}

                {activeTab === 'customJourney' && (
                  <CustomJourneySection 
                    content={content.customJourney} 
                    onSave={(data) => saveContent('customJourney', data)}
                    saving={saving}
                  />
                )}

                {activeTab === 'travelThemes' && (
                  <TravelThemesSection 
                    content={content.travelThemes} 
                    onSave={(data) => saveContent('travelThemes', data)}
                    saving={saving}
                  />
                )}

                {activeTab === 'whyChooseUs' && (
                  <WhyChooseUsSection 
                    content={content.whyChooseUs} 
                    onSave={(data) => saveContent('whyChooseUs', data)}
                    saving={saving}
                  />
                )}

                {activeTab === 'testimonials' && (
                  <TestimonialsSection 
                    content={content.testimonials} 
                    onSave={(data) => saveContent('testimonials', data)}
                    saving={saving}
                  />
                )}

                {activeTab === 'bookingProcess' && (
                  <BookingProcessSection 
                    content={content.bookingProcess} 
                    onSave={(data) => saveContent('bookingProcess', data)}
                    saving={saving}
                  />
                )}

                {activeTab === 'smallGroupTours' && (
                  <SmallGroupToursSection 
                    content={content.smallGroupTours} 
                    onSave={(data) => saveContent('smallGroupTours', data)}
                    saving={saving}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hero Carousel Section Component
function HeroCarouselSection({ content, onSave, saving }) {
  const [slides, setSlides] = useState(content.slides || []);
  const [isActive, setIsActive] = useState(content.isActive);
  const [autoplaySpeed, setAutoplaySpeed] = useState(content.autoplaySpeed || 4000);

  const addSlide = () => {
    setSlides([...slides, {
      title: '',
      subtitle: '',
      image: '',
      cta: 'View Trips',
      isActive: true,
      order: slides.length
    }]);
  };

  const updateSlide = (index, field, value) => {
    const newSlides = [...slides];
    newSlides[index] = { ...newSlides[index], [field]: value };
    setSlides(newSlides);
  };

  const removeSlide = (index) => {
    setSlides(slides.filter((_, i) => i !== index));
  };

  const toggleSlide = (index) => {
    const newSlides = [...slides];
    newSlides[index].isActive = !newSlides[index].isActive;
    setSlides(newSlides);
  };

  const handleSave = () => {
    onSave({
      slides: slides.map((slide, index) => ({ ...slide, order: index })),
      isActive,
      autoplaySpeed
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hero Carousel</h2>
          <p className="text-gray-600 mt-1">Manage the main hero banner slides</p>
        </div>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Show Section</span>
          </label>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Carousel Settings</h3>
        <div className="max-w-xs">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Autoplay Speed (milliseconds)
          </label>
          <input
            type="number"
            value={autoplaySpeed}
            onChange={(e) => setAutoplaySpeed(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            placeholder="4000"
          />
        </div>
      </div>

      {/* Slides */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Carousel Slides</h3>
          <button
            onClick={addSlide}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            + Add Slide
          </button>
        </div>

        {slides.map((slide, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-medium text-gray-900">Slide {index + 1}</h4>
              <div className="flex items-center space-x-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={slide.isActive}
                    onChange={() => toggleSlide(index)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Active</span>
                </label>
                <button
                  onClick={() => removeSlide(index)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) => updateSlide(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="Enter slide title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={slide.subtitle}
                    onChange={(e) => updateSlide(index, 'subtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="Enter slide subtitle"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={slide.cta}
                    onChange={(e) => updateSlide(index, 'cta', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="View Trips"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Image
                </label>
                <ImageUpload
                  currentImage={slide.image}
                  onImageUpload={(imageUrl) => updateSlide(index, 'image', imageUrl)}
                  folder="hero-carousel"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Gallery Section Component
function GallerySection({ content, onSave, saving }) {
  const [images, setImages] = useState(content.images || []);
  const [isActive, setIsActive] = useState(content.isActive);
  const [title, setTitle] = useState(content.title || '');
  const [subtitle, setSubtitle] = useState(content.subtitle || '');

  const addImage = () => {
    setImages([...images, {
      src: '',
      alt: '',
      isActive: true,
      order: images.length
    }]);
  };

  const updateImage = (index, field, value) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], [field]: value };
    setImages(newImages);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const toggleImage = (index) => {
    const newImages = [...images];
    newImages[index].isActive = !newImages[index].isActive;
    setImages(newImages);
  };

  const handleSave = () => {
    onSave({
      images: images.map((image, index) => ({ ...image, order: index })),
      isActive,
      title,
      subtitle
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gallery</h2>
          <p className="text-gray-600 mt-1">Manage the photo gallery section</p>
        </div>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Show Section</span>
          </label>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Section Settings */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Section Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              placeholder="Bhutan Photo Gallery"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Subtitle
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              placeholder="Discover the Beauty of Bhutan"
            />
          </div>
        </div>
      </div>

      {/* Gallery Images */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Gallery Images</h3>
          <button
            onClick={addImage}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            + Add Image
          </button>
        </div>

        {images.map((image, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-medium text-gray-900">Image {index + 1}</h4>
              <div className="flex items-center space-x-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={image.isActive}
                    onChange={() => toggleImage(index)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Active</span>
                </label>
                <button
                  onClick={() => removeImage(index)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={image.alt}
                  onChange={(e) => updateImage(index, 'alt', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  placeholder="Describe the image for accessibility"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gallery Image
                </label>
                <ImageUpload
                  currentImage={image.src}
                  onImageUpload={(imageUrl) => updateImage(index, 'src', imageUrl)}
                  folder="gallery"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Awards Section Component
function AwardsSection({ content, onSave, saving }) {
  const [items, setItems] = useState(content.items || []);
  const [isActive, setIsActive] = useState(content.isActive);

  const addItem = () => {
    setItems([...items, {
      icon: '',
      title: '',
      isActive: true,
      order: items.length
    }]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const toggleItem = (index) => {
    const newItems = [...items];
    newItems[index].isActive = !newItems[index].isActive;
    setItems(newItems);
  };

  const handleSave = () => {
    onSave({
      items: items.map((item, index) => ({ ...item, order: index })),
      isActive
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Awards Section</h2>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Show Section</span>
          </label>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Award {index + 1}</h3>
              <div className="flex items-center space-x-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={item.isActive}
                    onChange={() => toggleItem(index)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Active</span>
                </label>
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icon (emoji)
                </label>
                <input
                  type="text"
                  value={item.icon}
                  onChange={(e) => updateItem(index, 'icon', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  placeholder="🏆"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateItem(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addItem}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        Add New Award
      </button>
    </div>
  );
}

// About Bhutan Section Component
function AboutBhutanSection({ content, onSave, saving }) {
  const [isActive, setIsActive] = useState(content.isActive);
  const [title, setTitle] = useState(content.title || '');
  const [contentText, setContentText] = useState(content.content || '');
  const [ctaText, setCtaText] = useState(content.ctaText || '');
  const [ctaLink, setCtaLink] = useState(content.ctaLink || '');

  const handleSave = () => {
    onSave({
      isActive,
      title,
      content: contentText,
      ctaText,
      ctaLink
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">About Bhutan Section</h2>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Show Section</span>
          </label>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            value={contentText}
            onChange={(e) => setContentText(e.target.value)}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            placeholder="Enter the content for the About Bhutan section..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CTA Button Text
            </label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CTA Button Link
            </label>
            <input
              type="text"
              value={ctaLink}
              onChange={(e) => setCtaLink(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom Journey Section Component
function CustomJourneySection({ content, onSave, saving }) {
  const [isActive, setIsActive] = useState(content.isActive);
  const [title, setTitle] = useState(content.title || '');
  const [contentText, setContentText] = useState(content.content || '');
  const [ctaText, setCtaText] = useState(content.ctaText || '');
  const [themeTitle, setThemeTitle] = useState(content.themeTitle || '');
  const [themeContent, setThemeContent] = useState(content.themeContent || '');

  const handleSave = () => {
    onSave({
      isActive,
      title,
      content: contentText,
      ctaText,
      themeTitle,
      themeContent
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Custom Journey Section</h2>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Show Section</span>
          </label>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Main Content
          </label>
          <textarea
            value={contentText}
            onChange={(e) => setContentText(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            placeholder="Enter the main content..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CTA Button Text
          </label>
          <input
            type="text"
            value={ctaText}
            onChange={(e) => setCtaText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Theme Box Title
          </label>
          <input
            type="text"
            value={themeTitle}
            onChange={(e) => setThemeTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Theme Box Content
          </label>
          <textarea
            value={themeContent}
            onChange={(e) => setThemeContent(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            placeholder="Enter the theme box content..."
          />
        </div>
      </div>
    </div>
  );
}

// Placeholder components for other sections
function TravelThemesSection({ content, onSave, saving }) {
  return (
    <div className="text-center py-8">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Travel Themes Section</h3>
      <p className="text-gray-600">This section will be implemented in the next iteration.</p>
    </div>
  );
}

function WhyChooseUsSection({ content, onSave, saving }) {
  return (
    <div className="text-center py-8">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Why Choose Us Section</h3>
      <p className="text-gray-600">This section will be implemented in the next iteration.</p>
    </div>
  );
}

function TestimonialsSection({ content, onSave, saving }) {
  return (
    <div className="text-center py-8">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Testimonials Section</h3>
      <p className="text-gray-600">This section will be implemented in the next iteration.</p>
    </div>
  );
}

function BookingProcessSection({ content, onSave, saving }) {
  return (
    <div className="text-center py-8">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Booking Process Section</h3>
      <p className="text-gray-600">This section will be implemented in the next iteration.</p>
    </div>
  );
}

function SmallGroupToursSection({ content, onSave, saving }) {
  return (
    <div className="text-center py-8">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Small Group Tours Section</h3>
      <p className="text-gray-600">This section will be implemented in the next iteration.</p>
    </div>
  );
} 