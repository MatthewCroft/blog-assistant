# Blog Assistant

## Overview

Blog Assistant is an AI-powered tool designed to help users generate structured blog outlines and assist with blog writing. Users can fill out a form to receive blog outline suggestions, complete with headings, subheadings, and bullet points. The tool also features a side-by-side editor, allowing users to write their blog while referencing the AI-generated outline. Additionally, users can highlight sections of their blog and request AI-powered rewrites for improved content quality.

This project leverages Pinecone to store embeddings, enabling contextual AI assistance. When a user interacts with the tool, embeddings and relevant context are retrieved from Pinecone to generate meaningful suggestions and rewrites.

## Features

- Generate blog outlines with structured headings and bullet points.
- Edit blog content side by side with AI-generated details.
- Highlight sections for AI-powered rewrites.
- Utilize Pinecone for embedding storage and retrieval to provide the best context-aware AI responses.

## Setup and Installation

To run this project, follow these steps:

### Backend (Spring Boot API)

1. Ensure you have Java installed.
2. Navigate to the root directory of the project.
3. Run the Docker Compose file to set up dependencies:
   ```sh
   docker-compose up -d
   ```
4. Run the Pinecone index creation script:
   - Locate `PineconeExample` in the package `com.blog.blogassistantapi`.
   - Execute the Java file to initialize the Pinecone index.
5. Start the Spring Boot backend service.
   ```sh
   ./mvnw spring-boot:run  # or use your preferred method
   ```

### Frontend (React UI)

1. Navigate to the `blog-assistant-ui` directory:
   ```sh
   cd blog-assistant-ui
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

### Blog Creation Process

A demonstration of the blog creation process:

[![Blog Creation Process](https://img.youtube.com/vi/O1BeezC_PcA/0.jpg)](https://www.youtube.com/watch?v=O1BeezC_PcA)

1. Open the frontend application in your browser.
2. Choose a username.
3. Fill out the form to generate a blog outline.
4. A loading screen will appear while the request is being processed.
5. Once completed, the blog outline suggestions will appear on the right, while the text editor will be on the left.
6. The blog outline section is collapsible to allow for full-screen text editing.

### AI-Powered Rewrite Feature

A demonstration of the AI-powered rewrite functionality:

[![AI-Powered Rewrite Feature](https://img.youtube.com/vi/f0lpMPRFfY0/0.jpg)](https://www.youtube.com/watch?v=f0lpMPRFfY0)

1. Highlight any section of your blog text.
2. Click the "Rewrite" button to request AI assistance.
3. A side panel will open with a loading spinner as the request is processed.
4. Once completed, the rewritten text will appear, providing an enhanced version of the highlighted section.

## Technologies Used

- **Backend**: Spring Boot, Java
- **Frontend**: React, JavaScript
- **AI Integration**: OpenAI API
- **Vector Database**: Pinecone
- **Containerization**: Docker, Docker Compose

## Contribution

Feel free to submit issues or contribute to the project by opening pull requests.

## License

This project is licensed under the MIT License.

