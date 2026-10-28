import "./Footer.css";

function Footer() {
  return (
    <footer className="app-footer">
      <p>© {new Date().getFullYear()} SyncBoard</p>
      <p>Built with React, Node.js & Socket.IO</p>
    </footer>
  );
}

export default Footer;
