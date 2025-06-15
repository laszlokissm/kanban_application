# Kanban Task Manager

<h2 align="center">
  <img height="256" width="256" src="./src/assets/preact.svg">
</h2>

<h3 align="center">A feature-rich Kanban board application built with Preact</h3>

## Features

- **Drag-and-Drop Interface**: Seamlessly move tasks between columns with React Beautiful DnD
- **Task Management**: Create, edit, and delete tasks with detailed properties
- **Deadline Management**: Set and track task deadlines
- **Tag System**: Organize tasks with colored tags for better categorization
- **Task Filtering**: Filter tasks by tags to focus on specific categories
- **Upcoming Tasks View**: See all tasks with deadlines in chronological order
- **Customizable Board**: Change board background color
- **Persistent Storage**: All changes are automatically saved to local storage

## Getting Started

- `npm start` - Starts a dev server at http://localhost:5173/
- `npm run build` - Builds for production, emitting to `dist/`
- `npm run preview` - Starts a server at http://localhost:4173/ to test production build locally

## Tech Stack

- **UI Framework**: Preact with TypeScript
- **Styling**: Material-UI components and Less
- **Drag-and-Drop**: React Beautiful DnD
- **State Management**: React Hooks with local storage persistence 
- **Build Tool**: Vite
