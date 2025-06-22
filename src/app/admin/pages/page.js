"use client";
import { useState, useEffect, useMemo, memo } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import StickyFooter from '../components/StickyFooter';

import PageEditor from '../content/components/PageEditor';

const ManagementHeader = memo(() => (
  <div className="bg-white shadow-sm border-b border-gray-200">
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center py-6 px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Static Page Management</h1>
          <p className="mt-1 text-sm text-gray-500">Manage the content for your static pages</p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
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

export default function PagesAdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Pages</h1>
      <p className="mt-4">This section is under construction. You will be able to manage static pages from here.</p>
    </div>
  );
}
