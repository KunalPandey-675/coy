import { NextResponse } from 'next/server';
import { generateSeedData } from '@/lib/seed';
import { writeStore } from '@/lib/storage';

export async function POST() {
  try {
    const seedData = generateSeedData();
    await writeStore(seedData);
    return NextResponse.json({
      success: true,
      message: 'Demo data reset successfully',
      count: seedData.profiles.length,
    });
  } catch (error) {
    console.error('Error resetting store:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reset store' },
      { status: 500 }
    );
  }
}
