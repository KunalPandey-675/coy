import { NextRequest, NextResponse } from 'next/server';
import { updateStore } from '@/lib/storage';
import { CURRENT_USER_ID } from '@/lib/seed';
import { Swipe, Match, Profile } from '@/types';


function generateIcebreakers(profile: Profile | undefined): string[] {
  if (!profile) return [];
  
  const prompts: string[] = [];
  const interests = profile.interests || [];
  
  
  if (interests.includes('Coffee') || interests.includes('Chai')) {
    prompts.push(`What's your go-to coffee/chai order?`);
  }
  if (interests.includes('Travel')) {
    prompts.push(`Best trip you've taken this year?`);
  }
  if (interests.includes('Music') || interests.includes('EDM')) {
    prompts.push(`What song have you had on repeat lately?`);
  }
  if (interests.includes('Food')) {
    prompts.push(`What's your comfort food?`);
  }
  if (interests.includes('Movies') || interests.includes('Bollywood')) {
    prompts.push(`Movie that made you cry?`);
  }
  
  
  const generic = [
    `What's something you're passionate about?`,
    `Best weekend plan: adventure or chill?`,
    `What's a skill you'd love to learn?`,
  ];
  
  
  while (prompts.length < 3 && generic.length > 0) {
    const index = Math.floor(Math.random() * generic.length);
    prompts.push(generic.splice(index, 1)[0]);
  }
  
  return prompts.slice(0, 3);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { profileId, action } = body;
    
    
    if (!profileId || !action) {
      return NextResponse.json(
        { success: false, error: 'Missing profileId or action' },
        { status: 400 }
      );
    }
    
    if (action !== 'like' && action !== 'pass') {
      return NextResponse.json(
        { success: false, error: 'Action must be "like" or "pass"' },
        { status: 400 }
      );
    }
    
    
    const result = await updateStore((store) => {
      const timestamp = Date.now();
      
      
      const newSwipe: Swipe = {
        userId: CURRENT_USER_ID,
        targetProfileId: profileId,
        action,
        timestamp,
      };
      
      
      const alreadySwiped = store.swipes.some(
        swipe => 
          swipe.userId === CURRENT_USER_ID && 
          swipe.targetProfileId === profileId
      );
      
      if (alreadySwiped) {
        return store; 
      }
      
      
      store.swipes.push(newSwipe);
      
      
      if (action === 'like') {
        
        const mutualLike = store.preExistingLikes.some(
          like => 
            like.profileId === profileId && 
            like.likesUserId === CURRENT_USER_ID
        );
        
        if (mutualLike) {
          
          const matchId = `match-${CURRENT_USER_ID}-${profileId}-${timestamp}`;
          const expiresAt = timestamp + (24 * 60 * 60 * 1000); 
          const newMatch: Match = {
            id: matchId,
            userId: CURRENT_USER_ID,
            profileId: profileId,
            matchedAt: timestamp,
            expiresAt,
          };
          
          store.matches.push(newMatch);
        }
      }
      
      return store;
    });
    
    
    const matchCreated = result.matches.some(
      match => match.profileId === profileId && match.userId === CURRENT_USER_ID
    );
    
    if (matchCreated && action === 'like') {
      
      const matchedProfile = result.profiles.find(p => p.id === profileId);
      
      
      const icebreakers = generateIcebreakers(matchedProfile);
      
      return NextResponse.json({
        success: true,
        isMatch: true,
        profile: matchedProfile,
        icebreakers,
      });
    }
    
    return NextResponse.json({
      success: true,
      isMatch: false,
    });
  } catch (error) {
    console.error('Error recording swipe:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record swipe' },
      { status: 500 }
    );
  }
}
