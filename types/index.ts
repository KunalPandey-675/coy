export interface Profile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  photos: string[];
  bio: string;
  cityOrCollege: string;
  interests: string[];
  occupation?: string;
}

export interface Swipe {
  userId: string;
  targetProfileId: string;
  action: 'like' | 'pass';
  timestamp: number;
}

export interface Match {
  id: string;
  userId: string;
  profileId: string;
  matchedAt: number;
  expiresAt: number;
  unmatchedAt?: number;
  blockedAt?: number;
  reportedAt?: number;
}

export interface DataStore {
  profiles: Profile[];
  swipes: Swipe[];
  matches: Match[];
  preExistingLikes: Array<{
    profileId: string;
    likesUserId: string;
  }>;
  blocks: Array<{
    userId: string;
    blockedProfileId: string;
    blockedAt: number;
    reason?: string;
  }>;
  reports: Array<{
    userId: string;
    reportedProfileId: string;
    reportedAt: number;
    reason: string;
  }>;
}

export interface Filters {
  ageRange?: [number, number];
  cities?: string[];
  interests?: string[];
}
