"use client"

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import { DashboardSkeleton } from '@/components/Dashboard/DashboardSkeleton';

// Dynamic import for better code splitting and performance
const DashboardPage = dynamic(() => import('@/components/Dashboard/dash'), {
  loading: () => <DashboardSkeleton />,
  ssr: false // Disable SSR for dashboard to avoid hydration issues with auth
});

// This would be used if this was a page component with generateMetadata
// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: 'Dashboard',
//     description: 'Monitor your websites uptime and performance metrics',
//   }
// }

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardPage />
      </Suspense>
    </div>
  );
}