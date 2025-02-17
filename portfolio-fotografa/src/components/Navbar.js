import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <button 
        className="menu-button" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>
      {menuOpen && (
        <div className="menu">
          <h1>Clara Amaral</h1>
          <ul>
            <li>Home</li>
            <li>Sobre Mim</li>
            <li>Trabalhos</li>
            <li>Blog</li>
            <li>Contatos</li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
