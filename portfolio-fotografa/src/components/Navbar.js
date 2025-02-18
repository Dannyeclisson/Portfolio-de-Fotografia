import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path, section) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      sessionStorage.setItem("scrollToSection", section);
      navigate(path);
    }
  };

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
            <li onClick={() => handleNavigation('/', 'home')}>Home</li>
            <li>
              {location.pathname === "/" ? (
                <ScrollLink 
                  to="about" 
                  smooth={true} 
                  duration={500}
                  onClick={() => setMenuOpen(false)}
                >
                  Sobre Mim
                </ScrollLink>
              ) : (
                <span onClick={() => handleNavigation('/', 'about')}>
                  Sobre Mim
                </span>
              )}
            </li>
            <li>
              {location.pathname === "/" ? (
                <ScrollLink 
                  to="portfolio" 
                  smooth={true} 
                  duration={500}
                  onClick={() => setMenuOpen(false)}
                >
                  Trabalhos
                </ScrollLink>
              ) : (
                <span onClick={() => handleNavigation('/', 'portfolio')}>
                  Trabalhos
                </span>
              )}
            </li>
            <li>
              {location.pathname === "/" ? (
                <ScrollLink 
                  to="blog" 
                  smooth={true} 
                  duration={500}
                  onClick={() => setMenuOpen(false)}
                >
                  Blog
                </ScrollLink>
              ) : (
                <span onClick={() => handleNavigation('/', 'blog')}>
                  Blog
                </span>
              )}
            </li>
            <li>
              {location.pathname === "/" ? (
                <ScrollLink 
                  to="contact" 
                  smooth={true} 
                  duration={500}
                  onClick={() => setMenuOpen(false)}
                >
                  Contatos
                </ScrollLink>
              ) : (
                <span onClick={() => handleNavigation('/', 'contact')}>
                  Contatos
                </span>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
