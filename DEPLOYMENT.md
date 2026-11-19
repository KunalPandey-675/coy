# Deployment Checklist

## Pre-Deployment

1. **Ensure store.json is excluded**
   ```bash
   git status
   ```
   Verify `data/store.json` is NOT listed (should be in .gitignore)

2. **Test locally with fresh data**
   ```bash
   # Delete existing data
   rm data/store.json
   
   # Build and verify
   npm run build
   npm start
   ```
   Visit http://localhost:3000 and verify:
   - Matches tab shows "No matches yet"
   - Discover tab shows 32 profiles
   - Swipe right on a few profiles to trigger matches

3. **Verify build success**
   ```bash
   npm run build
   ```
   Should complete without errors

## Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   Follow the prompts:
   - Link to existing project or create new
   - Select default settings
   - Wait for deployment

3. **Verify deployment**
   - Open the provided URL
   - Check Matches tab is empty
   - Test swipe functionality
   - Trigger a match by swiping right

## Deploy to Other Platforms

### Netlify
1. Push to GitHub
2. Connect repository in Netlify dashboard
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Deploy

### Railway
1. Push to GitHub
2. Create new project in Railway
3. Connect repository
4. Railway auto-detects Next.js
5. Deploy

## Post-Deployment Verification

- [ ] App loads without errors
- [ ] Matches tab shows "No matches yet"
- [ ] All 32 profiles appear in Discover tab
- [ ] Swipe gestures work smoothly
- [ ] Filters work correctly
- [ ] Match modal appears after mutual like
- [ ] Matched profiles appear in Matches tab
- [ ] Settings modal opens correctly
- [ ] Reset demo data button works

## Troubleshooting

**Issue**: Matches appear on first load
**Solution**: Ensure `data/store.json` is in .gitignore and not committed

**Issue**: Build fails on deployment
**Solution**: Check Node.js version is 18+ in platform settings

**Issue**: Data doesn't persist
**Solution**: Ensure `data/` directory exists and has write permissions
