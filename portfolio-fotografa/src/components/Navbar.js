import React, { useState, useEffect } from "react";
import { Link as ScrollLink, scroller} from "react-scroll";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (section) => {
    setMenuOpen(false);
    
    // Se NÃO está na página pública, navega para ela primeiro
    if (location.pathname !== "/home") {
      navigate("/home", {
        state: { scrollTo: section } // Passa a seção como estado
      });
    } else {
      // Já está na página pública, apenas faz o scroll
      scroller.scrollTo(section, {
        duration: 500,
        smooth: true,
        offset: -70 // Ajuste para altura do navbar
      });
    }
  };

  useEffect(() => {
    // Executa scroll após navegação
    if (location.state?.scrollTo) {
      scroller.scrollTo(location.state.scrollTo, {
        duration: 500,
        smooth: true,
        offset: -70
      });
      
      // Limpa o estado para evitar repetição
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location]);

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
                <span 
                  onClick={() => handleNavigation(item.section)}
                  style={{ cursor: "pointer" }}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;