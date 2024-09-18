interface Cards {
  name: string;
  id: string;
  cards: MemoryCard[];
}

interface MemoryCard {
  question: string;
  answer: string;
  isResolve: boolean;
}
