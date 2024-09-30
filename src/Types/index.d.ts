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

export interface IProperty {
  name: string;
  value: any;
  type: string;
  isList?: boolean;
  required?: boolean;
  inheritedFrom?: string; // ID de l'objet X
}

export interface IX {
  _id: string;
  properties: IProperty[];
  label?: string; // ID de l'étiquette
  versions?: string[]; // IDs des versions précédentes
  relations?: { type: string; target: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  name: string;
  value: any;
  type: string;
  isList?: boolean;
  required?: boolean;
  inheritedFrom?: string; // ID de l'objet X
}

export interface XType {
  _id: string;
  properties: Property[];
  label?: string; // ID de l'étiquette
  versions?: string[]; // IDs des versions précédentes
  relations?: { type: string; target: string }[];
  createdAt: string;
  updatedAt: string;
}

export type ID = string;

export type GameMode = "Quiz" | "Repetition" | "FollowUp";
