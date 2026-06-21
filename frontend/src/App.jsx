import React from "react";
import KanbanBoard from "./components/KanbanBoard";

function App() {
  return (
    <div className="App">
      <h1>Real-time Kanban Board</h1>
      <h2>Manage tasks with WebSockets and Drag & Drop</h2>
      <KanbanBoard />
    </div>
  );
}

export default App;
