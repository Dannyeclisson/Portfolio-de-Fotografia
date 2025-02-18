import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    // Verifica se há necessidade de rolar até uma seção ao carregar a página
    const section = sessionStorage.getItem("scrollToSection");
    if (section && location.pathname === "/") {
      window.scrollTo(0, document.getElementById(section).offsetTop);
      sessionStorage.removeItem("scrollToSection");
    }
  }, [location.pathname]);

  const menuItems = [
    { label: "Home", section: "home" },
    { label: "Sobre Mim", section: "about" },
    { label: "Trabalhos", section: "portfolio" },
    { label: "Blog", section: "blog" },
    { label: "Contatos", section: "contact" }
  ];

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
            {menuItems.map((item) => (
              <li key={item.section}>
                {location.pathname === "/" ? (
                  <ScrollLink 
                    to={item.section} 
                    smooth={true} 
                    duration={500}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </ScrollLink>
                ) : (
                  <span onClick={() => handleNavigation('/', item.section)}>
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
