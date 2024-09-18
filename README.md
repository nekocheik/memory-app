# FlashCard App

This project is a flashcard application designed to help you learn terms, definitions, and words quickly and efficiently. The application allows you to import flashcards from JSON files, and in future versions, it will synchronize with Notion for a more dynamic and integrated learning experience.

## Features

-   **Flashcard Creation**: Create flashcards with terms and definitions to facilitate learning.
-   **JSON Import**: Flashcards can be imported using JSON files for easy batch creation.
-   **Internal Storage**: Initially, all flashcards are stored internally, ensuring fast access and offline usability.
-   **Learning Mode**: Choose from various learning modes like multiple-choice, fill-in-the-blank, or review.
-   **Progress Tracking**: Keep track of your learning progress through basic statistics (terms learned, correct/incorrect answers).

## Planned Features

-   **Notion Synchronization**: In future versions, the app will integrate with Notion for cloud-based storage and real-time synchronization.
-   **Advanced Analytics**: Track performance over time with detailed analytics and improvement tips.
-   **Customizable Learning Sessions**: Personalize the learning experience with adjustable difficulty, session length, and repetition intervals.
-   **Dark Mode**: A dark mode for more comfortable studying at night.

## Getting Started

To get the project up and running locally, follow the steps below.

### Prerequisites

Ensure you have the following installed on your machine:

-   [Node.js](https://nodejs.org/) (v14+ recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    
    bash
    
    Copier le code
    
    `git clone https://github.com/yourusername/flashcard-app.git
    cd flashcard-app` 
    
2.  **Install dependencies:**
    
    bash
    
    Copier le code
    
    `npm install` 
    
3.  **Start the development server:**
    
    bash
    
    Copier le code
    
    `npm start` 
    
4.  **Import JSON flashcards:**
    
    Create a folder inside the `src/data/` directory for your JSON flashcards.
    
    Example JSON file format:
    
    json
    
    Copier le code
    
    `[
      {
        "term": "Asynchronous",
        "definition": "Operations that occur independently of the main program flow."
      },
      {
        "term": "Closure",
        "definition": "A function that retains access to its lexical scope, even when the function is executed outside that scope."
      }
    ]` 
    
    Import the JSON file in the application to use the flashcards:
    
    js
    
    Copier le code
    
    `import flashcards from './data/flashcards.json';` 
    

### Project Structure

bash

Copier le code

`src/
├── components/      # Reusable React components
├── data/            # Flashcard JSON files
├── hooks/           # Custom React hooks
├── pages/           # Application pages (e.g., Home, Flashcards)
├── utils/           # Utility functions
├── App.tsx          # Main App component
└── index.tsx        # Application entry point` 

## Usage

-   **Import Flashcards**: To begin, import flashcards from a JSON file located in the `src/data/` folder.
-   **Start Learning**: Navigate to the learning page and select the flashcards you want to study. Choose your preferred learning mode (multiple-choice, review, etc.).
-   **Track Progress**: The app will track your learning progress, giving you statistics on the terms you've mastered and the ones you need to review.

## Mini Roadmap

### Version 1.0: Internal Storage with JSON

-   Basic flashcard creation and storage.
-   JSON file import for batch flashcard creation.
-   Flashcard review mode.
-   Multiple learning modes (fill-in-the-blank, multiple-choice).

### Version 2.0: Notion Integration

-   Implement synchronization with Notion API to store flashcards and track progress in the cloud.
-   Real-time updates when flashcards are modified in Notion.
-   Enhanced statistics and performance tracking using Notion data.

### Version 3.0: Customizable Learning and Dark Mode

-   Personalize learning sessions with various difficulty levels.
-   Dark mode for better usability in low-light conditions.
-   Detailed analytics and performance tracking.

## Contributing

Contributions are welcome! Feel free to open a pull request or submit an issue if you encounter any problems.

## Features

-   **Flashcard Creation**: Create flashcards with terms and definitions to facilitate learning.
-   **JSON Import**: Flashcards can be imported using JSON files for easy batch creation.
-   **Internal Storage**: Initially, all flashcards are stored internally, ensuring fast access and offline usability.
-   **Learning Mode**: Choose from various learning modes like multiple-choice, fill-in-the-blank, or review.
-   **Progress Tracking**: Keep track of your learning progress through basic statistics (terms learned, correct/incorrect answers).

## Planned Features

-   **Notion Synchronization**: In future versions, the app will integrate with Notion for cloud-based storage and real-time synchronization.
-   **Advanced Analytics**: Track performance over time with detailed analytics and improvement tips.
-   **Customizable Learning Sessions**: Personalize the learning experience with adjustable difficulty, session length, and repetition intervals.
-   **Dark Mode**: A dark mode for more comfortable studying at night.

## Getting Started

To get the project up and running locally, follow the steps below.

### Prerequisites

Ensure you have the following installed on your machine:

-   [Node.js](https://nodejs.org/) (v14+ recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    
    bash
    
    Copier le code
    
    `git clone https://github.com/yourusername/flashcard-app.git
    cd flashcard-app` 
    
2.  **Install dependencies:**
    
    bash
    
    Copier le code
    
    `npm install` 
    
3.  **Start the development server:**
    
    bash
    
    Copier le code
    
    `npm start` 
    
4.  **Import JSON flashcards:**
    
    Create a folder inside the `src/data/` directory for your JSON flashcards.
    
    Example JSON file format:
    
    json
    
    Copier le code
    
    `[
      {
        "term": "Asynchronous",
        "definition": "Operations that occur independently of the main program flow."
      },
      {
        "term": "Closure",
        "definition": "A function that retains access to its lexical scope, even when the function is executed outside that scope."
      }
    ]` 
    
    Import the JSON file in the application to use the flashcards:
    
    js
    
    Copier le code
    
    `import flashcards from './data/flashcards.json';` 
    

### Project Structure

bash

Copier le code

`src/
├── components/      # Reusable React components
├── data/            # Flashcard JSON files
├── hooks/           # Custom React hooks
├── pages/           # Application pages (e.g., Home, Flashcards)
├── utils/           # Utility functions
├── App.tsx          # Main App component
└── index.tsx        # Application entry point` 

## Usage

-   **Import Flashcards**: To begin, import flashcards from a JSON file located in the `src/data/` folder.
-   **Start Learning**: Navigate to the learning page and select the flashcards you want to study. Choose your preferred learning mode (multiple-choice, review, etc.).
-   **Track Progress**: The app will track your learning progress, giving you statistics on the terms you've mastered and the ones you need to review.

## Mini Roadmap

### Version 1.0: Internal Storage with JSON

-   Basic flashcard creation and storage.
-   JSON file import for batch flashcard creation.
-   Flashcard review mode.
-   Multiple learning modes (fill-in-the-blank, multiple-choice).

### Version 2.0: Notion Integration

-   Implement synchronization with Notion API to store flashcards and track progress in the cloud.
-   Real-time updates when flashcards are modified in Notion.
-   Enhanced statistics and performance tracking using Notion data.

### Version 3.0: Customizable Learning and Dark Mode

-   Personalize learning sessions with various difficulty levels.
-   Dark mode for better usability in low-light conditions.
-   Detailed analytics and performance tracking.
