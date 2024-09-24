import type { StructuresTypes } from "./Types/index";

const data : StructuresTypes = [
  {
    name: "Chemical Elements and Symbols",
    id: "3229898d-b7be-447d-8387-8f1ea433e5a1",
    cards: [
      {
        question: "What is 2 + 2?",
        answer: "4",
        isResolve: true,
        answers: [
          { text: "4", isCorrect: true, count: 0, proximity: 1 },
          { text: "2", isCorrect: false, count: 0, proximity: 0.5 },
          { text: "6", isCorrect: false, count: 0, proximity: 0.2 },
          { text: "8", isCorrect: false, count: 0, proximity: 0.1 },
          { text: "10", isCorrect: false, count: 0, proximity: 0.05 },
          { text: "12", isCorrect: false, count: 0, proximity: 0.01 },
          { text: "14", isCorrect: false, count: 0, proximity: 0.005 },
          { text: "16", isCorrect: false, count: 0, proximity: 0.001 },
          { text: "18", isCorrect: false, count: 0, proximity: 0.0005 },
          { text: "20", isCorrect: false, count: 0, proximity: 0.0001 },
        ],
      },
      {
        question: "What is the chemical symbol for water?",
        answer: "H2O",
        isResolve: false,
        answers: [
          { text: "H2O", isCorrect: true, count: 0, proximity: 1 },
          { text: "H2S", isCorrect: false, count: 0, proximity: 0.5 },
          { text: "CO2", isCorrect: false, count: 0, proximity: 0.2 },
          { text: "O2", isCorrect: false, count: 0, proximity: 0.1 },
          { text: "N2", isCorrect: false, count: 0, proximity: 0.05 },
          { text: "He", isCorrect: false, count: 0, proximity: 0.01 },
          { text: "Ne", isCorrect: false, count: 0, proximity: 0.005 },
          { text: "Ar", isCorrect: false, count: 0, proximity: 0.001 },
          { text: "Kr", isCorrect: false, count: 0, proximity: 0.0005 },
          { text: "Xe", isCorrect: false, count: 0, proximity: 0.0001 },
        ],
      },
      {
        question: "Who wrote '1984'?",
        answer: "George Orwell",
        isResolve: true,
        answers: [
          { text: "George Orwell", isCorrect: true, count: 0, proximity: 1 },
          { text: "Aldous Huxley", isCorrect: false, count: 0, proximity: 0.5 },
          { text: "Ray Bradbury", isCorrect: false, count: 0, proximity: 0.2 },
          {
            text: "Fahrenheit 451",
            isCorrect: false,
            count: 0,
            proximity: 0.1,
          },
          {
            text: "Joseph Heller",
            isCorrect: false,
            count: 0,
            proximity: 0.05,
          },
          {
            text: "Kurt Vonnegut",
            isCorrect: false,
            count: 0,
            proximity: 0.01,
          },
          {
            text: "Isaac Asimov",
            isCorrect: false,
            count: 0,
            proximity: 0.005,
          },
          {
            text: "Arthur C. Clarke",
            isCorrect: false,
            count: 0,
            proximity: 0.001,
          },
          {
            text: "Robert A. Heinlein",
            isCorrect: false,
            count: 0,
            proximity: 0.0005,
          },
          {
            text: "Philip K. Dick",
            isCorrect: false,
            count: 0,
            proximity: 0.0001,
          },
        ],
      },
    ],
  },
];

export { data };
