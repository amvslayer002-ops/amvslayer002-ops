import { TaskCategory, Challenge } from './types';
import { Heart, Sparkles, BookOpen, Coffee, Flame } from 'lucide-react';

export const TASK_POOL = [
  // Productivity
  { text: "Study for 1 hour without distraction", category: TaskCategory.PRODUCTIVITY, points: 10 },
  { text: "Review notes or read a book chapter", category: TaskCategory.PRODUCTIVITY, points: 10 },
  { text: "Plan tomorrow’s priorities", category: TaskCategory.PRODUCTIVITY, points: 5 },
  { text: "Write a short reflection on what you learned", category: TaskCategory.PRODUCTIVITY, points: 10 },

  // Chores
  { text: "Tidy up your room for 15 mins", category: TaskCategory.CHORES, points: 5 },
  { text: "Water the plants or organize desk", category: TaskCategory.CHORES, points: 5 },
  { text: "Make your bed perfectly", category: TaskCategory.CHORES, points: 5 },
  { text: "Do the dishes immediately after eating", category: TaskCategory.CHORES, points: 10 },

  // Self Care
  { text: "Do a full skincare routine", category: TaskCategory.SELF_CARE, points: 15 },
  { text: "Drink 8 glasses of water today", category: TaskCategory.SELF_CARE, points: 10 },
  { text: "Stretch for 15 minutes", category: TaskCategory.SELF_CARE, points: 10 },
  { text: "Journal your feelings for 10 mins", category: TaskCategory.SELF_CARE, points: 10 },

  // Love
  { text: "Send a sweet voice note to Amine", category: TaskCategory.LOVE, points: 15 },
  { text: "Write a small 'love memo' for today", category: TaskCategory.LOVE, points: 10 },
  { text: "Listen to 'our' song", category: TaskCategory.LOVE, points: 5 },
  { text: "Send a selfie smiling", category: TaskCategory.LOVE, points: 10 },

  // Sexy
  { text: "Dress up cute even if staying home", category: TaskCategory.SEXY, points: 20 },
  { text: "Take a flirty picture for the gallery", category: TaskCategory.SEXY, points: 20 },
  { text: "Do something that makes you feel confident", category: TaskCategory.SEXY, points: 15 },
];

export const CHALLENGES: Challenge[] = [
  { id: 'c1', text: "Send a voice note whispering something naughty... 💋", type: 'daring' },
  { id: 'c2', text: "Send a selfie biting your lip and looking at the camera", type: 'daring' },
  { id: 'c3', text: "Send a photo of your legs/thighs right now", type: 'daring' },
  { id: 'c4', text: "Record a video blowing a slow, sexy kiss", type: 'romantic' },
  { id: 'c5', text: "Text Amine: 'I've been a bad girl, punish me...' 😈", type: 'daring' },
  { id: 'c6', text: "Do 5 minutes of stretching (but make it look sexy)", type: 'fun' },
  { id: 'c7', text: "Send a close-up picture of your lips", type: 'romantic' },
  { id: 'c8', text: "Describe your dirtiest fantasy in a text message", type: 'daring' },
  { id: 'c9', text: "Send a photo showing a little bit of skin 😉", type: 'daring' },
  { id: 'c10', text: "Tell me exactly what you want me to do to you", type: 'daring' },
];

export const LOVE_MESSAGES = [
  "Don’t forget, Amine is proud of you 💕",
  "Drink water, pretty girl 💧",
  "Time to shine like my flower 🌸",
  "You are capable of amazing things.",
  "I love watching you grow.",
  "My queen, handle your business!",
  "Smile, you look beautiful today.",
];

export const CATEGORY_ICONS = {
  [TaskCategory.PRODUCTIVITY]: BookOpen,
  [TaskCategory.CHORES]: Coffee,
  [TaskCategory.SELF_CARE]: Sparkles,
  [TaskCategory.LOVE]: Heart,
  [TaskCategory.SEXY]: Flame,
};