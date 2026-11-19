import { initializeData } from '@/lib/init-data';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  
  await initializeData();
  
  
  redirect('/app');
}
