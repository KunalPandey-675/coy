#!/usr/bin/env node

/**
 * Setup verification script for Coy Discovery Tab
 * Checks that all required files and data are in place
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verifying Coy Discovery Tab Setup...\n');

let allChecks = true;

// Check required files
const requiredFiles = [
  'package.json',
  'tsconfig.json',
  'next.config.ts',
  'tailwind.config.ts',
  'app/layout.tsx',
  'app/page.tsx',
  'app/app/layout.tsx',
  'app/app/discover/page.tsx',
  'app/app/matches/page.tsx',
  'app/api/feed/route.ts',
  'app/api/swipe/route.ts',
  'app/api/matches/route.ts',
  'components/SwipeCard.tsx',
  'components/ProfileModal.tsx',
  'components/EmptyState.tsx',
  'lib/storage.ts',
  'lib/seed.ts',
  'types/index.ts',
];

console.log('📁 Checking required files...');
for (const file of requiredFiles) {
  const filePath = path.join(__dirname, file);
  const exists = fs.existsSync(filePath);
  const status = exists ? '✅' : '❌';
  console.log(`   ${status} ${file}`);
  if (!exists) allChecks = false;
}

// Check data directory
console.log('\n💾 Checking data directory...');
const dataDir = path.join(__dirname, 'data');
if (fs.existsSync(dataDir)) {
  console.log('   ✅ data/ directory exists');
  
  const storeFile = path.join(dataDir, 'store.json');
  if (fs.existsSync(storeFile)) {
    console.log('   ✅ data/store.json exists');
    
    try {
      const data = JSON.parse(fs.readFileSync(storeFile, 'utf-8'));
      console.log(`   ✅ Profiles: ${data.profiles?.length || 0}`);
      console.log(`   ✅ Pre-existing likes: ${data.preExistingLikes?.length || 0}`);
      console.log(`   ✅ Swipes: ${data.swipes?.length || 0}`);
      console.log(`   ✅ Matches: ${data.matches?.length || 0}`);
    } catch (error) {
      console.log('   ⚠️  store.json exists but could not be parsed');
    }
  } else {
    console.log('   ⚠️  data/store.json not found (will be created on first run)');
  }
} else {
  console.log('   ⚠️  data/ directory not found (will be created on first run)');
}

// Check node_modules
console.log('\n📦 Checking dependencies...');
const nodeModules = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModules)) {
  console.log('   ✅ node_modules/ exists');
  
  const requiredPackages = ['next', 'react', 'framer-motion', 'tailwindcss'];
  for (const pkg of requiredPackages) {
    const pkgPath = path.join(nodeModules, pkg);
    const exists = fs.existsSync(pkgPath);
    const status = exists ? '✅' : '❌';
    console.log(`   ${status} ${pkg}`);
    if (!exists) allChecks = false;
  }
} else {
  console.log('   ❌ node_modules/ not found - run `npm install`');
  allChecks = false;
}

// Summary
console.log('\n' + '='.repeat(50));
if (allChecks) {
  console.log('✅ All checks passed! Ready to run:');
  console.log('   npm run dev');
  console.log('   Open http://localhost:3000');
} else {
  console.log('❌ Some checks failed. Please:');
  console.log('   1. Run `npm install`');
  console.log('   2. Run this script again');
}
console.log('='.repeat(50) + '\n');

process.exit(allChecks ? 0 : 1);
