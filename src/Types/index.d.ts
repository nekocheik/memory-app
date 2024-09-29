export interface Answer {
  text: string;
  isCorrect?: boolean;
  count?: number;
  proximity?: number;
}

export interface KnowledgeSet {
  name: string;
  _id: string;
  cards: MemoryCardType[];
  timeLimit?: number; // Ajout du temps total pour l'ensemble
}

export type KnowledgeSets = KnowledgeSet[];

export interface MemoryCardType {
  question: string;
  answers: Answer[];
  answer?: string;
  isResolve?: boolean;
  _id: string;
  timeLimit?: number; // Ajout du temps pour chaque question
}

export type ID = string;

export type GameMode = "Quiz" | "Repetition" | "FollowUp";
