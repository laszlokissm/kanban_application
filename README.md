# Kanban Task Manager


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

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kanban-application.git
   cd kanban-application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm start
   ```
   This starts a dev server at http://localhost:5173/

4. **Build for production**
   ```bash
   npm run build
   ```


## Tech Stack

- **UI Framework**: Preact with TypeScript
- **Styling**: Material-UI components and Less
- **Drag-and-Drop**: React Beautiful DnD
- **State Management**: React Hooks with local storage persistence 
- **Build Tool**: Vite
