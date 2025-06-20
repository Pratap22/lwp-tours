"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

// Import all section components
import GallerySection from './components/GallerySection';
import AwardsSection from './components/AwardsSection';
import AboutBhutanSection from './components/AboutBhutanSection';
import CustomJourneySection from './components/CustomJourneySection';
import TravelThemesSection from './components/TravelThemesSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import TestimonialsSection from './components/TestimonialsSection';
import BookingProcessSection from './components/BookingProcessSection';
import SmallGroupToursSection from './components/SmallGroupToursSection';
import NavigationSection from './components/NavigationSection';

export default function ContentManagement() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('gallery');
  const [message, setMessage] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      setActiveTab(section);
    }
    fetchContent();
  }, [searchParams]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    router.push(`/admin/content?section=${tabId}`, { scroll: false });
  };

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

  const saveContent = async (sectionId, data) => {
    setSaving(true);
    try {
      // Find the section in the array and update it
      const updatedSections = content.sections.map(section => 
        section.sectionId === sectionId ? { ...section, ...data } : section
      );

      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...content,
          sections: updatedSections
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

  const moveSection = (fromIndex, toIndex) => {
    if (!content || !content.sections) return;
    
    const sections = [...content.sections];
    const [movedSection] = sections.splice(fromIndex, 1);
    sections.splice(toIndex, 0, movedSection);
    
    // Update order numbers
    const updatedSections = sections.map((section, index) => ({
      ...section,
      order: index + 1
    }));
    
    // Update local state immediately for UI responsiveness
    setContent({
      ...content,
      sections: updatedSections
    });
    
    // Save the new order to database
    saveContentOrder(updatedSections);
  };

  const saveContentOrder = async (updatedSections) => {
    setSaving(true);
    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...content,
          sections: updatedSections
        }),
      });

      if (response.ok) {
        const updatedContent = await response.json();
        setContent(updatedContent);
        setMessage('Sections reordered successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        throw new Error('Failed to reorder sections');
      }
    } catch (error) {
      console.error('Error reordering sections:', error);
      setMessage('Error reordering sections');
    } finally {
      setSaving(false);
    }
  };

  const getSectionById = (sectionId) => {
    if (!content || !content.sections) return null;
    return content.sections.find(section => section.sectionId === sectionId);
  };

  const getSortedSections = () => {
    if (!content || !content.sections) return [];
    return [...content.sections].sort((a, b) => a.order - b.order);
  };

  const tabs = [
    { id: 'gallery', name: 'Gallery', icon: '📷' },
    { id: 'awards', name: 'Awards', icon: '🏆' },
    { id: 'aboutBhutan', name: 'About Bhutan', icon: '📖' },
    { id: 'customJourney', name: 'Custom Journey', icon: '🗺️' },
    { id: 'travelThemes', name: 'Travel Themes', icon: '🎯' },
    { id: 'whyChooseUs', name: 'Why Choose Us', icon: '💎' },
    { id: 'testimonials', name: 'Testimonials', icon: '💬' },
    { id: 'bookingProcess', name: 'Booking Process', icon: '📋' },
    { id: 'smallGroupTours', name: 'Small Group Tours', icon: '👥' },
    { id: 'navigation', name: 'Navigation', icon: '🧭' }
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

  const sortedSections = getSortedSections();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center py-6 px-4 sm:px-6 lg:px-8 border-b">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Content Management</h1>
              <p className="mt-1 text-sm text-gray-500">Manage your website content and sections</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className={`p-4 rounded-lg ${
            message.includes('Error') 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'bg-green-50 text-green-700 border border-green-200'
          } flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              {message.includes('Error') ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {message}
            </div>
            <button 
              onClick={() => setMessage('')}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
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
                <p className="text-sm text-gray-600 mb-4">Drag to reorder • Click to edit</p>
                
                {/* Unified Section List */}
                <div className="space-y-2">
                  {sortedSections.map((section, index) => {
                    const tab = tabs.find(t => t.id === section.sectionId);
                    const isActive = activeTab === section.sectionId;
                    const isSectionActive = section?.isActive !== false;
                    
                    return (
                      <div
                        key={section.sectionId}
                        className={`group relative flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                          isActive 
                            ? 'bg-blue-50 border-blue-200 shadow-sm' 
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                        } ${!isSectionActive ? 'opacity-60' : ''}`}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', index.toString());
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                          moveSection(fromIndex, index);
                        }}
                        onClick={() => handleTabClick(section.sectionId)}
                      >
                        {/* Order Number */}
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full text-xs font-medium flex items-center justify-center ${
                          isActive ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                        }`}>
                          {section.order}
                        </div>
                        
                        {/* Icon */}
                        <span className="text-lg flex-shrink-0">{tab?.icon}</span>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-medium truncate ${
                              isActive ? 'text-blue-900' : 'text-gray-700'
                            }`}>
                              {tab?.name}
                            </span>
                            {!isSectionActive && (
                              <span className="text-xs text-gray-400 ml-2">Hidden</span>
                            )}
                          </div>
                        </div>
                        
                        {/* Drag Handle */}
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M7 2a2 2 0 011 1.732v7.569l3-2.25V3.732A2 2 0 0112 1h4a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2h1z" />
                          </svg>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-8">
                {activeTab === 'gallery' && (
                  <GallerySection 
                    content={getSectionById('gallery')} 
                    onSave={(data) => saveContent('gallery', data)}
                    saving={saving}
                  />
                )}

                {activeTab === 'awards' && (
                  <AwardsSection 
                    content={getSectionById('awards')} 
                    onSave={(data) => saveContent('awards', data)}
                    saving={saving}
                  />
                )}

                {activeTab === 'aboutBhutan' && (
                  <AboutBhutanSection 
                    content={getSectionById('aboutBhutan')} 
                    onSave={(data) => saveContent('aboutBhutan', data)}
                    saving={saving}
                  />
                )}

                {activeTab === 'customJourney' && (
                  <CustomJourneySection 
                    content={getSectionById('customJourney')} 
                    onSave={(data) => saveContent('customJourney', data)}
                    saving={saving}
                  />
                )}

                {activeTab === 'travelThemes' && (
                  <TravelThemesSection 
                    content={getSectionById('travelThemes')} 
                    onSave={(data) => saveContent('travelThemes', data)}
                    saving={saving}
                  />
                )}

                {activeTab === 'whyChooseUs' && (
                  <WhyChooseUsSection 
                    content={getSectionById('whyChooseUs')} 
                    onSave={(data) => saveContent('whyChooseUs', data)}
                    saving={saving}
                  />
                )}

                {activeTab === 'testimonials' && (
                  <TestimonialsSection 
                    content={getSectionById('testimonials')} 
                    onSave={(data) => saveContent('testimonials', data)}
                    saving={saving}
                  />
                )}

                {activeTab === 'bookingProcess' && (
                  <BookingProcessSection 
                    content={getSectionById('bookingProcess')} 
                    onSave={(data) => saveContent('bookingProcess', data)}
                    saving={saving}
                  />
                )}

                {activeTab === 'smallGroupTours' && (
                  <SmallGroupToursSection 
                    content={getSectionById('smallGroupTours')} 
                    onSave={(data) => saveContent('smallGroupTours', data)}
                    saving={saving}
                  />
                )}

                {activeTab === 'navigation' && (
                  <NavigationSection 
                    content={getSectionById('navigation')} 
                    onSave={(data) => saveContent('navigation', data)}
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