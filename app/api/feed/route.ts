import { NextRequest, NextResponse } from 'next/server';
import { readStore } from '@/lib/storage';
import { CURRENT_USER_ID } from '@/lib/seed';
import { Profile } from '@/types';


const CURRENT_USER_INTERESTS = ['Coding', 'Coffee', 'Travel', 'Music', 'Food'];

export async function GET(request: NextRequest) {
  try {
    console.log('[Feed API] Starting feed request...');
    const store = await readStore();
    console.log(`[Feed API] Store loaded: ${store.profiles.length} profiles`);
    
    const { searchParams } = new URL(request.url);
    
    
    const minAge = searchParams.get('minAge') ? parseInt(searchParams.get('minAge')!) : null;
    const maxAge = searchParams.get('maxAge') ? parseInt(searchParams.get('maxAge')!) : null;
    const genders = searchParams.get('genders')?.split(',').filter(Boolean) || [];
    const cities = searchParams.get('cities')?.split(',').filter(Boolean) || [];
    const interests = searchParams.get('interests')?.split(',').filter(Boolean) || [];
    
    
    const swipedProfileIds = new Set(
      store.swipes
        .filter(swipe => swipe.userId === CURRENT_USER_ID)
        .map(swipe => swipe.targetProfileId)
    );
    
    
    const blockedProfileIds = new Set(
      (store.blocks || [])
        .filter(block => block.userId === CURRENT_USER_ID)
        .map(block => block.blockedProfileId)
    );
    
    
    let unswipedProfiles = store.profiles.filter(
      profile => !swipedProfileIds.has(profile.id) && !blockedProfileIds.has(profile.id)
    );
    
    
    if (minAge !== null) {
      unswipedProfiles = unswipedProfiles.filter(p => p.age >= minAge);
    }
    if (maxAge !== null) {
      unswipedProfiles = unswipedProfiles.filter(p => p.age <= maxAge);
    }
    
    
    if (genders.length > 0) {
      unswipedProfiles = unswipedProfiles.filter(p => genders.includes(p.gender));
    }
    
    
    if (cities.length > 0) {
      unswipedProfiles = unswipedProfiles.filter(p => 
        cities.some(city => p.cityOrCollege.toLowerCase().includes(city.toLowerCase()))
      );
    }
    
    
    if (interests.length > 0) {
      unswipedProfiles = unswipedProfiles.filter(p =>
        interests.some(interest => 
          p.interests.some(pInterest => 
            pInterest.toLowerCase().includes(interest.toLowerCase())
          )
        )
      );
    }
    
    
    
    const sanitizedProfiles: (Profile & { sharedInterests: number })[] = unswipedProfiles.map(profile => {
      
      const sharedInterestsCount = profile.interests.filter(interest =>
        CURRENT_USER_INTERESTS.some(userInt => 
          userInt.toLowerCase() === interest.toLowerCase()
        )
      ).length;
      
      return {
        id: profile.id,
        name: profile.name,
        age: profile.age,
        gender: profile.gender,
        photos: profile.photos,
        bio: profile.bio,
        cityOrCollege: profile.cityOrCollege,
        interests: profile.interests,
        occupation: profile.occupation,
        sharedInterests: sharedInterestsCount,
      };
    });
    
    return NextResponse.json({
      success: true,
      profiles: sanitizedProfiles,
      count: sanitizedProfiles.length,
    });
  } catch (error) {
    console.error('[Feed API] Error fetching feed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch feed', 
        details: errorMessage,
        stack: process.env.NODE_ENV === 'development' ? errorStack : undefined
      },
      { status: 500 }
    );
  }
}
