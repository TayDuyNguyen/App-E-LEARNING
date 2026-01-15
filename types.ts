
export interface Note {
  id: string;
  timestamp: string;
  content: string;
}

export interface Resource {
  id: string;
  name: string;
  type: 'pdf' | 'link' | 'code';
  url: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isLocked: boolean;
  type: 'video' | 'quiz' | 'reading';
  isCompleted?: boolean;
  description?: string;
  notes?: Note[];
  resources?: Resource[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Question {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'essay';
  text: string;
  media?: { type: 'image' | 'audio'; url: string };
  options?: string[];
  correctAnswer?: string | number;
  hint?: string;
  explanation?: string;
}

export interface Exercise {
  id: string;
  title: string;
  timeLimit?: number; // in seconds
  questions: Question[];
}

export interface Vocabulary {
  id: string;
  word: string;
  phonetic: string;
  definition: string;
  example: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isBookmarked: boolean;
  isLearned: boolean;
  audioUrl?: string;
}

export interface Review {
  id: string;
  userName: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  progress: number;
  image: string;
  lessonsCount: number;
  instructor: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  price: string;
  oldPrice?: string;
  rating: number;
  reviewCount: number;
  description: string;
  outcomes: string[];
  requirements: string[];
  curriculum: Lesson[]; 
  modules?: Module[];   
  reviews: Review[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export enum AppSection {
  HOME = 'home',
  EXPLORE = 'explore',
  AI_TUTOR = 'ai_tutor',
  PROFILE = 'profile',
  COURSE_DETAIL = 'course_detail',
  CURRICULUM = 'curriculum',
  LESSON_PLAYER = 'lesson_player',
  SEARCH = 'search',
  NOTIFICATIONS = 'notifications',
  EXERCISE = 'exercise',
  EXERCISE_RESULT = 'exercise_result',
  VOCABULARY = 'vocabulary',
  VOCABULARY_DETAIL = 'vocabulary_detail',
  FLASHCARDS = 'flashcards',
  FLASHCARD_RESULT = 'flashcard_result',
  FLASHCARD_DECKS = 'flashcard_decks',
  PROGRESS = 'progress',
  ACHIEVEMENTS = 'achievements',
  LEADERBOARD = 'leaderboard'
}

export enum AuthStatus {
  SPLASH = 'splash',
  WELCOME = 'welcome',
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgot_password',
  AUTHENTICATED = 'authenticated',
}
