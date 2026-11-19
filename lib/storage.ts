import fs from 'fs/promises';
import path from 'path';
import { DataStore } from '@/types';

const DATA_FILE = path.join(process.cwd(), 'data', 'store.json');

let initPromise: Promise<void> | null = null;
let memoryStore: DataStore | null = null;

async function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  try {
    await fs.access(dir);
  } catch {
    try {
      await fs.mkdir(dir, { recursive: true });
    } catch {
      // Directory creation failed - likely read-only filesystem (serverless)
      console.warn('Cannot create data directory - using in-memory storage');
    }
  }
}

async function canWriteToFilesystem(): Promise<boolean> {
  try {
    const testFile = path.join(process.cwd(), '.write-test');
    await fs.writeFile(testFile, 'test');
    await fs.unlink(testFile);
    return true;
  } catch {
    return false;
  }
}

async function initializeIfNeeded(): Promise<void> {
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    const canWrite = await canWriteToFilesystem();
    
    if (!canWrite) {
      console.log('Read-only filesystem detected - using in-memory storage');
      const { generateSeedData } = await import('./seed');
      memoryStore = generateSeedData();
      console.log('Seed data initialized in memory!');
      return;
    }

    try {
      await fs.access(DATA_FILE);
    } catch {
      // File doesn't exist, initialize it
      const { generateSeedData } = await import('./seed');
      const seedData = generateSeedData();
      await writeStoreInternal(seedData);
      console.log('Seed data initialized successfully!');
    }
  })();

  return initPromise;
}

async function writeStoreInternal(store: DataStore): Promise<void> {
  await ensureDataDir();
  
  try {
    const tempFile = `${DATA_FILE}.tmp`;
    const data = JSON.stringify(store, null, 2);
    
    await fs.writeFile(tempFile, data, 'utf-8');
    await fs.rename(tempFile, DATA_FILE);
  } catch (error) {
    // Filesystem write failed - use memory storage
    console.warn('Cannot write to filesystem - storing in memory');
    memoryStore = store;
  }
}

export async function readStore(): Promise<DataStore> {
  await ensureDataDir();
  await initializeIfNeeded();
  
  // If using memory storage, return it
  if (memoryStore) {
    return memoryStore;
  }
  
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File read failed - initialize in memory
    const { generateSeedData } = await import('./seed');
    memoryStore = generateSeedData();
    console.log('Initialized seed data in memory (file read failed)');
    return memoryStore;
  }
}


export async function writeStore(store: DataStore): Promise<void> {
  // Always update memory store
  memoryStore = store;
  
  // Try to persist to file if possible
  await writeStoreInternal(store);
}


export async function updateStore(
  updater: (store: DataStore) => DataStore
): Promise<DataStore> {
  const store = await readStore();
  const updated = updater(store);
  await writeStore(updated);
  return updated;
}
