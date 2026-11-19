# Fix "Failed to fetch feed" Error

## Problem
You're seeing: `{success: false, error: "Failed to fetch feed"}`

## Root Cause
The dev server is likely:
1. Using cached data from before store.json was regenerated
2. Not recognizing the new data file
3. Still running with old code

## Solution: Restart Dev Server

### Step 1: Stop Current Server
Press **Ctrl + C** in the terminal where `npm run dev` is running

### Step 2: Clear Next.js Cache
```bash
# Windows PowerShell
Remove-Item -Recurse -Force .next
```

### Step 3: Restart Dev Server
```bash
npm run dev
```

### Step 4: Verify
1. Open http://localhost:3000
2. Go to Discover tab
3. You should see 32 profile cards
4. Swipe right to test matching

## If Still Not Working

### Option A: Delete and Regenerate Data
```bash
# Stop server
# Delete data file
Remove-Item data\store.json

# Build (regenerates data)
npm run build

# Start dev server
npm run dev
```

### Option B: Check Terminal Output
Look for these messages:
- ✓ "Seed data initialized successfully!" (good)
- ✗ Error messages about file access (bad - check permissions)

### Option C: Test API Directly
Open in browser: http://localhost:3000/api/feed

Should see:
```json
{
  "success": true,
  "profiles": [...],
  "count": 32
}
```

## Prevention
Always restart dev server after:
- Deleting/modifying data files
- Changing seed data
- Git operations that affect data
