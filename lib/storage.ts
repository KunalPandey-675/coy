import fs from 'fs/promises';
import path from 'path';
import { DataStore } from '@/types';

const DATA_FILE = path.join(process.cwd(), 'data', 'store.json');


async function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}


export async function readStore(): Promise<DataStore> {
  await ensureDataDir();
  
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    
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
