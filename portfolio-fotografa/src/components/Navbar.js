import React, { useEffect } from "react";
import { scroller } from "react-scroll";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../images/logo.jpg"; 

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (section) => {
    if (location.pathname !== "/home") {
      navigate("/home", { state: { scrollTo: section } });
    } else {
      scroller.scrollTo(section, {
        duration: 500,
        smooth: true,
        offset: -70,
      });
    }
  };

  useEffect(() => {
    if (location.state?.scrollTo) {
      scroller.scrollTo(location.state.scrollTo, {
        duration: 500,
        smooth: true,
        offset: -70,
      });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const menuItems = [
    { label: "Sobre Mim", section: "about" },
    { label: "Trabalhos", section: "portfolio" },
    { label: "Blog", section: "blog" },
    { label: "Contatos", section: "contact" },
    { label: "Home", section: "home", isButton: true }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="navbar-menu">
        {menuItems.map((item) => (
          <li
            key={item.section}
            className={item.isButton ? "home-button" : ""}
            onClick={() => handleNavigation(item.section)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
