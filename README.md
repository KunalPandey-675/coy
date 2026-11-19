# Coy Discovery Tab - Take Home Assignment

A mobile-first swipe-based discovery feature built for Coy's SDE Intern Assignment. This standalone application implements a Tinder/Bumble-style matching system with privacy-first architecture and smooth gesture-based interactions.

## Project Overview

This project consists of two parts:
- **Part A**: Two feature proposals for Coy's core product
- **Part B**: A fully functional "Discover" tab with swipe mechanics, mutual matching, and persistent storage

## Tech Stack

- **Framework**: Next.js 15 (App Router) with TypeScript
- **UI**: React 19, Tailwind CSS 3.4
- **Animations**: Framer Motion 11.18
- **Icons**: Lucide React
- **Effects**: canvas-confetti
- **Storage**: JSON file-based persistence (zero build dependencies)
- **Runtime**: Node.js 22

## Features Implemented

### Core Requirements
- **Profile Data**: 32 seeded mock profiles with realistic details, photos, bios, cities/colleges, and interests
- **Swipe Experience**: Drag-based gestures on mobile, button controls on desktop, smooth animations, and clear visual feedback
- **Matching System**: Privacy-first mutual matching - matches only reveal when both users like each other
- **Persistence**: All swipes and matches persist across page reloads
- **Backend APIs**:
  - `GET /api/feed` - Returns unswviped profiles (sanitized for privacy)
  - `POST /api/swipe` - Records likes/passes and checks for mutual matches
  - `GET /api/matches` - Returns all mutual matches
  - `POST /api/unmatch` - Handles unmatch/block/report actions

### Advanced Features
- **Filters**: Age range, gender, city, and interests filtering
- **Match Expiry**: 24-hour expiration system for matches
- **Icebreaker Prompts**: Conversation starters included with each match
- **Shared Interests**: Visual badges showing common interests between matches
- **Safety Features**: Unmatch, block, and report functionality
- **Empty States**: Clear messaging when feed is exhausted or no matches exist
- **Error Handling**: Graceful error states with retry mechanisms
- **Loading States**: Skeleton screens during data fetching
- **Settings**: User preferences and demo data reset controls

## Project Structure

```
coy_assignment/
├── app/
│   ├── app/
│   │   ├── discover/         # Swipe deck interface
│   │   ├── matches/          # Mutual matches list
│   │   └── layout.tsx        # Tab navigation
│   ├── api/
│   │   ├── feed/            # Profile feed endpoint
│   │   ├── swipe/           # Swipe action handler
│   │   ├── matches/         # Matches retrieval
│   │   ├── unmatch/         # Unmatch/block/report
│   │   └── reset/           # Demo reset utility
│   └── page.tsx             # Landing page
├── components/
│   ├── SwipeCard.tsx        # Draggable profile card
│   ├── MatchModal.tsx       # Match celebration modal
│   ├── ProfileModal.tsx     # Detailed profile view
│   ├── FiltersModal.tsx     # Filter controls
│   ├── SettingsModal.tsx    # Settings interface
│   ├── EmptyState.tsx       # Empty feed state
│   ├── ErrorState.tsx       # Error handling
│   ├── SkeletonCard.tsx     # Loading skeleton
│   └── ui/                  # Reusable UI components
├── lib/
│   ├── seed.ts              # Mock profile data
│   ├── storage.ts           # Atomic file storage
│   └── init-data.ts         # Data initialization
├── types/
│   └── index.ts             # TypeScript definitions
└── data/
    └── store.json           # Persistent data store
```

## Setup Instructions

### Prerequisites
- Node.js 22+ (verified with v22.20.0)
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd coy_assignment
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

**Note**: On first run, the app automatically seeds 32 profiles with 10 hidden "pre-existing likes". These are profiles that have already liked you (but you don't know it). When you swipe right on any of these 10 profiles, a match will be triggered instantly to demonstrate the mutual matching system.

### Build for Production

```bash
npm run build
npm start
```

### Reset Demo Data

If you want to reset all swipes and matches back to the initial state:
1. Navigate to Settings (gear icon in top navigation)
2. Click "Reset Demo Data" button
3. Confirm the reset

Alternatively, delete `data/store.json` and restart the app.

## Usage Guide

### Discover Tab
- **Swipe Right** or click the heart button to like a profile
- **Swipe Left** or click the X button to pass
- **Tap the card** or info button to view full profile details
- **Use filters** to narrow down by age, gender, city, or interests
- When you match with someone who already liked you, a celebration modal appears

### Matches Tab
- View all mutual matches with timestamps
- Click on a match to see their full profile
- Use the three-dot menu to unmatch, block, or report
- Matches expire after 24 hours if no interaction occurs
- See shared interests and icebreaker conversation starters

### Keyboard Shortcuts (Desktop)
- `Arrow Left` - Pass
- `Arrow Right` - Like
- `Space` - View profile details

## Privacy Architecture

The matching system follows Coy's core privacy principle:

- **Zero data leakage**: The client never receives information about who has liked the user
- **Server-side matching**: Mutual match checks happen exclusively in the backend
- **Sanitized feeds**: API responses strip all internal like markers before sending to client
- **Mutual-only reveals**: A match is only revealed when both users like each other

## Data Model

### Profile
```typescript
{
  id: string
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
  photos: string[]
  bio: string
  cityOrCollege: string
  interests: string[]
  occupation: string
}
```

### Swipe
```typescript
{
  userId: string
  targetProfileId: string
  action: 'like' | 'pass'
  timestamp: number
}
```

### Match
```typescript
{
  id: string
  userId: string
  profileId: string
  matchedAt: number
  expiresAt: number
  icebreakers: string[]
}
```

## Testing

### Manual Testing Checklist

1. **Swipe Mechanics**
   - Verify drag gestures work smoothly on mobile
   - Test button controls on desktop
   - Confirm keyboard shortcuts function correctly

2. **Matching**
   - Swipe right on pre-seeded profiles to trigger matches
   - Verify match modal appears with confetti effect
   - Check that matches persist after page reload

3. **Filters**
   - Apply age range filter and verify feed updates
   - Select specific genders and confirm filtering
   - Test city and interests filters

4. **Persistence**
   - Make several swipes, refresh the page
   - Confirm swiped profiles don't reappear
   - Verify match history is maintained

5. **Safety Features**
   - Test unmatch functionality removes match from list
   - Verify block prevents profile from appearing
   - Confirm report action completes successfully

## Part A: Feature Proposals

### Feature 1: Icebreaker Questions
**Why**: Reduces the anxiety of starting a conversation after matching. Provides context-rich prompts based on shared interests, making first messages more engaging and less generic.

### Feature 2: Time-Limited Matches with Daily Quotas
**Why**: Creates urgency and meaningful engagement rather than infinite swiping. Limits daily matches to encourage quality interactions and reduce swipe fatigue, while 24-hour expiry ensures timely responses.

## Acknowledgments

Built as part of Coy's SDE Intern Assignment. The project demonstrates mobile-first development, gesture-based interactions, privacy-conscious backend design, and production-ready code quality.

## Important Notes

- **Fresh State on Deploy**: The `data/store.json` file is excluded from git (see `.gitignore`), so each deployment starts with a clean slate - zero matches, zero swipes, and 32 fresh profiles.
- **Pre-seeded Likes**: 10 profiles are secretly configured to have already liked you. When you swipe right on any of these, a match will trigger instantly to demonstrate the mutual matching system.
- **Demo Mode**: The Settings modal includes a "Reset Demo Data" button to restore the initial state for testing purposes.

---

**Note**: This is a standalone demo application. The "Home" tab is a placeholder as specified in the assignment requirements.
