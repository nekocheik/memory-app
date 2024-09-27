export interface Answer {
  text: string;
  isCorrect: boolean;
  count: number;
  proximity: number;
}

export interface KnowledgeSet {
  name: string;
  _id: string;
  cards: MemoryCardType[];
}

export type KnowledgeSets = KnowledgeSet[];

export interface MemoryCardType {
  question: string;
  answers: Answer[];
  answer: string;
  isResolve: boolean;
}

export type ID = string;

export type GameMode = "Quiz" | "Repetition" | "FollowUp";
