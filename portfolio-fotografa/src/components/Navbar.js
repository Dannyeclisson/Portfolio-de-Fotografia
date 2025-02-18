import React, { useState } from "react";
import { Link } from "react-scroll";
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
            <li>
              <Link 
                to="home" 
                smooth={true} 
                duration={500}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="about" 
                smooth={true} 
                duration={500}
                onClick={() => setMenuOpen(false)}
              >
                Sobre Mim
              </Link>
            </li>
            <li>
              <Link 
                to="portfolio" 
                smooth={true} 
                duration={500}
                onClick={() => setMenuOpen(false)}
              >
                Trabalhos
              </Link>
            </li>
            <li>
              <Link 
                to="blog" 
                smooth={true} 
                duration={500}
                onClick={() => setMenuOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                to="contact" 
                smooth={true} 
                duration={500}
                onClick={() => setMenuOpen(false)}
              >
                Contatos
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
