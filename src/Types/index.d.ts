export interface Answer {
  text: string;
  isCorrect: boolean;
  count: number;
  proximity: number;
}

export interface StructureType {
  name: string;
  id: string;
  cards: MemoryCardType[];
}

export type StructuresTypes = StructureType[]

export interface MemoryCardType {
  question: string;
  answers: Answer[];
  answer: string;
  isResolve: boolean;
}

export type ID = string;

export type GameMode = "Quiz" | "Repetition" | "FollowUp";
