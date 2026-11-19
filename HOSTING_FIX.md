# Hosting Fix - Auto-Initialize Data on First Request

## Problem Solved
The hosted app was showing `"Failed to fetch feed"` because `store.json` wasn't being created on deployment.

## Solution Applied

### Auto-Initialization in Storage Layer
Modified `lib/storage.ts` to automatically generate seed data when `store.json` doesn't exist:

```typescript
async function initializeIfNeeded(): Promise<void> {
  try {
    await fs.access(DATA_FILE);
  } catch {
    // File doesn't exist, initialize it
    const { generateSeedData } = await import('./seed');
    const seedData = generateSeedData();
    await writeStore(seedData);
    console.log('Seed data initialized successfully!');
  }
}
```

### How It Works

1. **First API Request** arrives (e.g., GET /api/feed)
2. **Storage layer** checks if `store.json` exists
3. **If missing**, automatically generates 32 profiles with seed data
4. **Writes file** to data directory
5. **Returns data** to the requesting API
6. **Subsequent requests** use the existing file

### Benefits

✅ **Works on serverless platforms** (Vercel, Netlify, Railway)  
✅ **No manual initialization needed**  
✅ **Ephemeral filesystem compatible**  
✅ **Fresh data on each deployment**  
✅ **Zero configuration required**

### Deployment Behavior

**When you deploy:**
- `store.json` is NOT in your git repository (excluded by .gitignore)
- App starts without any data file
- First user visits the site
- First API call (feed/swipe/matches) triggers auto-initialization
- Fresh 32 profiles created with 0 matches, 0 swipes
- User sees clean initial state

**On subsequent requests:**
- Existing `store.json` is used
- Matches and swipes persist within that deployment
- Data resets only when redeployed

### Testing

**Local Test:**
```bash
# Delete data
Remove-Item data\store.json

# Build
npm run build
# Should see: "Seed data initialized successfully!"

# Verify
npm start
# Visit http://localhost:3000 - should work without errors
```

**Production Verification:**
1. Deploy to your hosting platform
2. Open deployed URL
3. Navigate to Discover tab
4. Profiles should load automatically
5. Check browser console - no errors
6. Matches tab shows "No matches yet"

### Files Modified
- `lib/storage.ts` - Added auto-initialization logic
- `app/api/feed/route.ts` - Removed manual initialization (now handled by storage)
- `README.md` - Updated deployment notes

### Commit Message
```
Fix: Auto-initialize data on first API request for serverless hosting

- Added auto-initialization in storage layer
- Generates seed data automatically when store.json missing
- Works on ephemeral filesystems (Vercel, Netlify)
- Ensures fresh state on each deployment
```
