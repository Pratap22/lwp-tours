import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center py-6 px-4 sm:px-6 lg:px-8 border-b">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">Manage your Bhutan travel website</p>
            </div>
            <Link
              href="/admin/change-password"
              className="text-gray-500 hover:text-gray-700 text-sm font-medium flex items-center gap-2"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 0v2m0 4h.01M17 16v-1a5 5 0 00-10 0v1a2 2 0 002 2h6a2 2 0 002-2z" />
              </svg>
              Change Password
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-50">
                <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Tours</p>
                <p className="text-2xl font-semibold text-gray-900">6</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-50">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Tours</p>
                <p className="text-2xl font-semibold text-gray-900">6</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-50">
                <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg. Price</p>
                <p className="text-2xl font-semibold text-gray-900">$2,433</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Actions */}
        <div className="space-y-8">
          {/* Tour Management */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Tour Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/admin/tours/create" className="group">
                <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-blue-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-200">
                      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">Create New Tour</h3>
                      <p className="text-sm text-gray-500">Add a new tour to your collection</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/admin/tours" className="group">
                <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-green-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-50 group-hover:bg-green-100 transition-colors duration-200">
                      <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-green-600">Manage Tours</h3>
                      <p className="text-sm text-gray-500">View, edit, and delete existing tours</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Website Management */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Website Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/admin/content" className="group">
                <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-purple-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-50 group-hover:bg-purple-100 transition-colors duration-200">
                      <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-purple-600">Homepage Content</h3>
                      <p className="text-sm text-gray-500">Manage home page sections</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/admin/pages" className="group">
                <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-teal-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-teal-50 group-hover:bg-teal-100 transition-colors duration-200">
                      <svg className="h-6 w-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-teal-600">Static Pages</h3>
                      <p className="text-sm text-gray-500">Manage About Us, Why Us, etc.</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* System Management */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">System Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-indigo-50">
                    <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Analytics</h3>
                    <p className="text-sm text-gray-500">View tour performance and statistics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 