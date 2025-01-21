# Mr. Ed - The AI Powered Content Editor

Mr. Ed is a Vue 3 application built with TypeScript and Vite. It leverages AI to assist users in creating and managing content, such as quizzes and documents.

## Features

- **AI Integration**: Uses OpenAI's GPT-4 to generate and manage content.
- **Vue 3**: Modern JavaScript framework for building user interfaces.
- **TypeScript**: Strongly typed programming language that builds on JavaScript.
- **Vite**: Next-generation frontend tooling for fast development.

## Project Structure

.env.local
```
VITE_OPENAI_BASE_URL="https://api.openai.com/v1"
VITE_OPENAI_API_KEY="YOUR_OPENAI_KEY"
```

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/bhbdev/mr-ed.git
    cd mr-ed
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create an .env file with your OpenAI API key:
    ```sh
    VITE_OPENAI_BASE_URL="https://api.openai.com/v1"
    VITE_OPENAI_API_KEY="YOUR_OPENAI_KEY"
    ```

### Running the Project

To start the development server:
```sh
npm run dev