import { Suspense } from 'react';
import ToursPageContent from './components/ToursPageContent';
import { getTours } from '../lib/data';

function ToursLoading() {
  return (
    <div className="max-w-6xl mx-auto text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading tours...</p>
    </div>
  )
}

export default async function ToursPage() {
  const tours = await getTours();

  return (
    <main className="bg-white min-h-[70vh] mx-auto py-20 px-4">
      <Suspense fallback={<ToursLoading />}>
        <ToursPageContent tours={tours} />
      </Suspense>
    </main>
  );
} 