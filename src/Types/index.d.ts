export interface Cards {
  name: string;
  id: string;
  cards: MemoryCard[];
}

export interface MemoryCard {
  question: string;
  answer: string;
  isResolve: boolean;
}
