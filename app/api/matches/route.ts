import { NextResponse } from 'next/server';
import { readStore } from '@/lib/storage';
import { CURRENT_USER_ID } from '@/lib/seed';

export async function GET() {
  try {
    const store = await readStore();
    const now = Date.now();
    
    
    const userMatches = store.matches.filter(
      match => 
        match.userId === CURRENT_USER_ID &&
        !match.unmatchedAt && 
        !match.blockedAt &&   
        (match.expiresAt ? match.expiresAt > now : true) 
    );
    
    
    const enrichedMatches = userMatches.map(match => {
      const profile = store.profiles.find(p => p.id === match.profileId);
      const timeLeft = match.expiresAt ? match.expiresAt - now : Infinity;
      const hoursLeft = match.expiresAt ? Math.floor(timeLeft / (1000 * 60 * 60)) : 999;
      
      return {
        id: match.id,
        matchedAt: match.matchedAt,
        expiresAt: match.expiresAt || null,
        hoursLeft,
        isExpiringSoon: match.expiresAt ? hoursLeft < 6 : false,
        profile: profile || null,
      };
    }).filter(match => match.profile !== null); 
    
    
    enrichedMatches.sort((a, b) => b.matchedAt - a.matchedAt);
    
    return NextResponse.json({
      success: true,
      matches: enrichedMatches,
      count: enrichedMatches.length,
    });
  } catch (error) {
    console.error('Error fetching matches:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch matches' },
      { status: 500 }
    );
  }
}
