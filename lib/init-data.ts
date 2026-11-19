import { writeStore, readStore } from './storage';
import { generateSeedData } from './seed';

export async function initializeData() {
  try {
    
    const existingStore = await readStore();
    
    
    if (existingStore.profiles.length > 0) {
      console.log('Data already exists, skipping seed.');
      return existingStore;
    }

    
    const seedData = generateSeedData();
    await writeStore(seedData);
    console.log('Seed data initialized successfully!');
    return seedData;
  } catch (error) {
    console.error('Error initializing data:', error);
    throw error;
  }
}
