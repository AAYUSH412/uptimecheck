import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function Websites() {
  
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Monitored Websites</h1>
      {/* Website management UI goes here */}
    </div>
  );
}