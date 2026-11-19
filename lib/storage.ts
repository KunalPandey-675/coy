import fs from 'fs/promises';
import path from 'path';
import { DataStore } from '@/types';

const DATA_FILE = path.join(process.cwd(), 'data', 'store.json');

let initPromise: Promise<void> | null = null;

async function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function initializeIfNeeded(): Promise<void> {
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      await fs.access(DATA_FILE);
    } catch {
      // File doesn't exist, initialize it
      const { generateSeedData } = await import('./seed');
      const seedData = generateSeedData();
      await writeStore(seedData);
      console.log('Seed data initialized successfully!');
    }
  })();

  return initPromise;
}

export async function readStore(): Promise<DataStore> {
  await ensureDataDir();
  await initializeIfNeeded();
  
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Fallback to empty store
    return {
      profiles: [],
      swipes: [],
      matches: [],
      preExistingLikes: [],
      blocks: [],
      reports: [],
    };
  }
}


export async function writeStore(store: DataStore): Promise<void> {
  await ensureDataDir();
  
  const tempFile = `${DATA_FILE}.tmp`;
  const data = JSON.stringify(store, null, 2);
  
  await fs.writeFile(tempFile, data, 'utf-8');
  await fs.rename(tempFile, DATA_FILE);
}


export async function updateStore(
  updater: (store: DataStore) => DataStore
): Promise<DataStore> {
  const store = await readStore();
  const updated = updater(store);
  await writeStore(updated);
  return updated;
}
