import { readStore } from './lib/storage.js';

async function testFeed() {
  try {
    console.log('Testing feed API logic...\n');
    
    const store = await readStore();
    console.log('✓ Store loaded successfully');
    console.log(`  - Profiles: ${store.profiles.length}`);
    console.log(`  - Swipes: ${store.swipes.length}`);
    console.log(`  - Matches: ${store.matches.length}`);
    console.log(`  - PreExistingLikes: ${store.preExistingLikes.length}`);
    
    if (store.profiles.length === 0) {
      console.log('\n❌ No profiles found! Run: npm run build');
      return;
    }
    
    console.log('\n✓ Feed API should work correctly!');
    console.log('\nIf you\'re still seeing errors:');
    console.log('1. Stop the dev server (Ctrl+C)');
    console.log('2. Delete .next folder');
    console.log('3. Run: npm run dev');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testFeed();
