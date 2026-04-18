import fs from 'fs';
import path from 'path';

export interface WeddingData {
  bride: string;
  groom: string;
  date: string;
  heroImage: string;
  landingPageImage: string;
  musicUrl: string;
  heroMessage: string;
  events: {
    title: string;
    date: string;
    time: string;
    venue: string;
    mapLink: string;
  }[];
  gallery: string[];
  rsvp: {
    phone: string;
    message: string;
  };
}

export async function getWeddingData(): Promise<WeddingData | null> {
  try {
    const dataPath = path.join(process.cwd(), 'data', `wedding.json`);
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(fileContents) as WeddingData;
  } catch {
    return null;
  }
}

