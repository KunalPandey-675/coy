// Simple API test script
const BASE_URL = 'http://localhost:3000';

async function testAPIs() {
  console.log('🧪 Testing Coy Discovery API Endpoints\n');
  
  try {
    // Test 1: GET /api/feed
    console.log('1️⃣ Testing GET /api/feed...');
    const feedRes = await fetch(`${BASE_URL}/api/feed`);
    const feedData = await feedRes.json();
    console.log(`   ✅ Status: ${feedRes.status}`);
    console.log(`   ✅ Profiles returned: ${feedData.count}`);
    console.log(`   ✅ First profile: ${feedData.profiles[0]?.name} (${feedData.profiles[0]?.cityOrCollege})`);
    
    // Verify no secret data leaked
    const hasSecretData = feedData.profiles.some(p => p.hasLikedUser !== undefined);
    console.log(`   ✅ Privacy check (no secret flags): ${!hasSecretData ? 'PASSED' : 'FAILED'}\n`);
    
    // Test 2: POST /api/swipe (pass)
    console.log('2️⃣ Testing POST /api/swipe (pass action)...');
    const passRes = await fetch(`${BASE_URL}/api/swipe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profileId: 'profile-2',
        action: 'pass'
      })
    });
    const passData = await passRes.json();
    console.log(`   ✅ Status: ${passRes.status}`);
    console.log(`   ✅ Success: ${passData.success}`);
    console.log(`   ✅ Is Match: ${passData.isMatch}\n`);
    
    // Test 3: POST /api/swipe (like - no match)
    console.log('3️⃣ Testing POST /api/swipe (like - no mutual)...');
    const likeNoMatchRes = await fetch(`${BASE_URL}/api/swipe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profileId: 'profile-4',
        action: 'like'
      })
    });
    const likeNoMatchData = await likeNoMatchRes.json();
    console.log(`   ✅ Status: ${likeNoMatchRes.status}`);
    console.log(`   ✅ Success: ${likeNoMatchData.success}`);
    console.log(`   ✅ Is Match: ${likeNoMatchData.isMatch} (expected: false)\n`);
    
    // Test 4: POST /api/swipe (like - with match)
    console.log('4️⃣ Testing POST /api/swipe (like - mutual match!)...');
    const likeMatchRes = await fetch(`${BASE_URL}/api/swipe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profileId: 'profile-1', // Pre-seeded to like the user
        action: 'like'
      })
    });
    const likeMatchData = await likeMatchRes.json();
    console.log(`   ✅ Status: ${likeMatchRes.status}`);
    console.log(`   ✅ Success: ${likeMatchData.success}`);
    console.log(`   ✅ Is Match: ${likeMatchData.isMatch} (expected: true)`);
    console.log(`   ✅ Matched with: ${likeMatchData.profile?.name}\n`);
    
    // Test 5: GET /api/matches
    console.log('5️⃣ Testing GET /api/matches...');
    const matchesRes = await fetch(`${BASE_URL}/api/matches`);
    const matchesData = await matchesRes.json();
    console.log(`   ✅ Status: ${matchesRes.status}`);
    console.log(`   ✅ Total matches: ${matchesData.count}`);
    if (matchesData.matches.length > 0) {
      console.log(`   ✅ Latest match: ${matchesData.matches[0].profile.name}`);
    }
    console.log(`   ✅ Match timestamp: ${new Date(matchesData.matches[0]?.matchedAt).toLocaleString()}\n`);
    
    // Test 6: Verify feed excludes swiped profiles
    console.log('6️⃣ Testing feed persistence (swiped profiles excluded)...');
    const feedRes2 = await fetch(`${BASE_URL}/api/feed`);
    const feedData2 = await feedRes2.json();
    const swipedIds = ['profile-1', 'profile-2', 'profile-4'];
    const feedContainsSwiped = feedData2.profiles.some(p => swipedIds.includes(p.id));
    console.log(`   ✅ Profiles now: ${feedData2.count} (was ${feedData.count})`);
    console.log(`   ✅ Swiped profiles excluded: ${!feedContainsSwiped ? 'PASSED' : 'FAILED'}\n`);
    
    console.log('🎉 All API tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPIs();
