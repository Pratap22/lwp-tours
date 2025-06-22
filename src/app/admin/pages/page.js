"use client";
import { useState, useEffect, useMemo, memo } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import PageEditor from '../content/components/PageEditor';

const ManagementHeader = memo(() => (
  <div className="bg-white shadow">
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center py-6 px-4 sm:px-6 lg:px-8 border-b">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Static Page Management</h1>
          <p className="mt-1 text-sm text-gray-500">Manage the content for your static pages</p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
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
));
ManagementHeader.displayName = 'ManagementHeader';

const Sidebar = memo(({ tabs, activeTab, onTabClick }) => (
  <div className="lg:col-span-3 sticky top-8 h-fit">
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Static Pages</h2>
        <div className="space-y-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => onTabClick(tab.id)}
                className={`group flex items-center justify-between p-3 rounded-md cursor-pointer transition-all duration-200 ${isActive ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-100'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{tab?.icon || '📄'}</span>
                  <span className={`font-medium ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>
                    {tab?.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
));
Sidebar.displayName = 'Sidebar';

export default function PagesManagement() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('about-us');

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const page = searchParams.get('page');
    if (page && page !== activeTab) {
      setActiveTab(page);
    }
  }, [searchParams, activeTab]);

  useEffect(() => {
    fetchContent();
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    router.push(`/admin/pages?page=${tabId}`, { scroll: false });
  };

  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('Error loading content');
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async (sectionId, data) => {
    setSaving(true);
    try {
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
        toast.success('Content saved successfully!');
      } else {
        throw new Error('Failed to save content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const getSectionById = (sectionId) => {
    if (!content || !content.sections) return null;
    return content.sections.find(section => section.sectionId === sectionId);
  };

  const tabs = useMemo(() => [
    { id: 'about-us', name: 'About Us Page', icon: '📄' },
    { id: 'why-us', name: 'Why Us Page', icon: '📄' },
    { id: 'travel-info', name: 'Travel Info Page', icon: '📄' },
  ], []);

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

  const pageData = getSectionById(activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      <ManagementHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <Sidebar tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
          
          <div className="lg:col-span-9 mt-6 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-8">
                {saving && <div className="absolute inset-0 bg-white/50 z-10"></div>}
                <PageEditor 
                  key={activeTab}
                  pageData={pageData} 
                  onSave={(data) => saveContent(activeTab, data)}
                  onCancel={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
