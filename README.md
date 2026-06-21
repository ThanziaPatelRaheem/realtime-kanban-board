# Real-Time Kanban Board

A real-time Kanban board built with React, Socket.IO, React DnD, Recharts, Vitest, React Testing Library, Playwright, and Node.js.

---

## Features

- Create, update, delete, and move tasks
- Drag and drop tasks between columns
- Real-time task sync using Socket.IO
- Task priority and category selection using React Select
- File upload with image preview and PDF support
- Invalid file validation
- Task progress chart using Recharts
- Loading spinner while syncing tasks
- Unit, Integration, and End-to-End tests

---

## Tech Stack

### Frontend

- React
- Socket.IO Client
- React DnD
- React Select
- Recharts
- React Icons
- Vitest
- React Testing Library
- Playwright

### Backend

- Node.js
- Express
- Socket.IO

---

## Project Structure

```txt
backend/
├── server.js

frontend/
├── src/
│   ├── components/
│   │   ├── KanbanBoard.jsx
│   │   ├── TaskCard.jsx
│   │   ├── DropColumn.jsx
│   │   ├── CustomSelect.jsx
│   │   └── TaskChart.jsx
│   │
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   │
│   └── socket.js
│
├── vite.config.js
└── playwright.config.js
```

---

## Getting Started

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Start Backend Server

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:8000
```

---

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 4. Start Frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:3000
```

---

## WebSocket Events

The backend uses the following Socket.IO events:

| Event         | Description                                         |
| ------------- | --------------------------------------------------- |
| `task:create` | Creates a new task                                  |
| `task:update` | Updates task title, description, priority, category |
| `task:move`   | Moves a task between columns                        |
| `task:delete` | Deletes a task                                      |
| `sync:tasks`  | Sends updated task list to all connected clients    |

---

## Testing

### Run Unit and Integration Tests

```bash
cd frontend

npm test
```

---

### Run End-to-End Tests

Start both backend and frontend servers first, then run:

```bash
cd frontend

npm run test:e2e
```

If Playwright browsers are not installed:

```bash
npx playwright install
```

---

## Test Coverage

### Unit Tests

- Renders Kanban Board
- Shows error for invalid file upload

### Integration Tests

- Emits `task:create` when a user adds a task
- Updates UI when `sync:tasks` is received

### End-to-End Tests

- User can add a task and see it on the board
- User can drag a task to another column

---

## Notes

- Tasks are stored in backend memory using an array.
- Data remains available while the backend server is running.
- Data resets when the backend server restarts.
- File uploads are simulated using `URL.createObjectURL()`.
- Image previews work during the active browser session.
- Uploaded image URLs may not persist after page refresh or server restart.

---

## Future Improvements

- Persist tasks using MongoDB
- Upload attachments to cloud storage
- Add user authentication
- Add filtering and search
- Improve responsive mobile layout
- Add due dates and task assignments
- Add dark mode support
