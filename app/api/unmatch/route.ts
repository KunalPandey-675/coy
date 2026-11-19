import { NextRequest, NextResponse } from 'next/server';
import { updateStore } from '@/lib/storage';
import { CURRENT_USER_ID } from '@/lib/seed';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { matchId, action, reason } = body;
    
    
    if (!matchId || !action) {
      return NextResponse.json(
        { success: false, error: 'Missing matchId or action' },
        { status: 400 }
      );
    }
    
    if (!['unmatch', 'block', 'report'].includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Action must be "unmatch", "block", or "report"' },
        { status: 400 }
      );
    }

    if (action === 'report' && !reason) {
      return NextResponse.json(
        { success: false, error: 'Reason required for report' },
        { status: 400 }
      );
    }
    
    
    await updateStore((store) => {
      const match = store.matches.find(m => m.id === matchId);
      
      if (!match) {
        return store;
      }

      const timestamp = Date.now();
      
      if (action === 'unmatch') {
        
        match.unmatchedAt = timestamp;
      } else if (action === 'block') {
        
        match.blockedAt = timestamp;
        store.blocks.push({
          userId: CURRENT_USER_ID,
          blockedProfileId: match.profileId,
          blockedAt: timestamp,
          reason,
        });
      } else if (action === 'report') {
        
        match.reportedAt = timestamp;
        store.reports.push({
          userId: CURRENT_USER_ID,
          reportedProfileId: match.profileId,
          reportedAt: timestamp,
          reason,
        });
      }
      
      return store;
    });
    
    return NextResponse.json({
      success: true,
      action,
    });
  } catch (error) {
    console.error('Error processing unmatch/block/report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
