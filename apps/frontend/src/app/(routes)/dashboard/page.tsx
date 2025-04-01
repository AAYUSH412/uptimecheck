import { auth } from '@clerk/nextjs';
import DashboardPage from '@/components/Dashboard/dash';
import { redirect } from 'next/navigation';

export default function Dashboard() {
  
  
  return <DashboardPage />;
}