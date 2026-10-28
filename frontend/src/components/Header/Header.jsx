import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="app-header">
      <div className="app-brand">
        <span className="brand-icon">◈</span>
        <span>SyncBoard</span>
      </div>

      <span className="header-subtitle">Real-time Kanban Board</span>
    </header>
  );
}

export default Header;
