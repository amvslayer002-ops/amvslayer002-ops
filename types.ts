export enum TaskCategory {
  PRODUCTIVITY = 'Productivity & Study',
  CHORES = 'Chores & Responsibility',
  SELF_CARE = 'Self-Care & Beauty',
  LOVE = 'Love & Connection',
  SEXY = 'Playful & Sexy'
}

export interface Task {
  id: string;
  text: string;
  category: TaskCategory;
  completed: boolean;
  points: number;
}

export interface Challenge {
  id: string;
  text: string;
  type: 'fun' | 'romantic' | 'daring';
}

export interface JournalEntry {
  id: string;
  date: string;
  text: string;
  mood: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  url: string; // Base64 or Object URL
  date: string;
  caption: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export type ViewState = 'tasks' | 'wheel' | 'garden' | 'gallery' | 'journal' | 'chat' | 'camera';
