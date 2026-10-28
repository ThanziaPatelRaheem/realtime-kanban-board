import React from "react";
import KanbanBoard from "./components/Kanbanboard/KanbanBoard";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />

      <main className="app-main">
        <KanbanBoard />
      </main>

      <Footer />
    </div>
  );
}

export default App;
