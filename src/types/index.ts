export type Archetype = 'Warrior' | 'Sage' | 'Lover' | 'Seeker';

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  text: string;
  archetype: Archetype;
  score: number;
}

export interface QuizResult {
  primaryArchetype: Archetype;
  scores: Record<Archetype, number>;
}

export interface IFSPart {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export interface CheckIn {
  id: string;
  date: string;
  activePart: string;
  selfState: boolean;
  tokens: number;
}

export interface UserData {
  archetype?: Archetype;
  quizCompleted: boolean;
  checkIns: CheckIn[];
  selfStreak: number;
  totalTokens: number;
  lastCheckInDate?: string;
}

export interface Intervention {
  id: string;
  type: 'letter' | 'journal' | 'ubuntu';
  title: string;
  description: string;
  prompt: string;
  archetype: Archetype;
}

export interface QuickReset {
  id: string;
  name: string;
  emoji: string;
  duration: number; // in seconds
  description: string;
  instructions: string[];
}

export type RootStackParamList = {
  Main: undefined;
  Quiz: undefined;
  QuizResult: { result: QuizResult };
  Interventions: undefined;
  InterventionDetail: { intervention: Intervention };
  CheckIn: undefined;
  Community: undefined;
  QuickResets: undefined;
  QuickResetDetail: { reset: QuickReset };
};
