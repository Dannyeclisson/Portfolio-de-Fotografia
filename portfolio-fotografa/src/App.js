import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import ProjectDetails from "./components/ProjectDetails";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { animateScroll as scroller } from "react-scroll";


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const section = sessionStorage.getItem("scrollToSection");
    if (section) {
      setTimeout(() => {
        scroller.scrollTo(section, {
          duration: 500,
          smooth: true,
        });
      }, 100); 
      sessionStorage.removeItem("scrollToSection");
    }
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div>
        <Routes>
          {/* Redireciona a raiz para o login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Rota de Login */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard Protegido */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* Página Pública (acessível via /home) */}
          <Route 
            path="/home" 
            element={
              <>
                <div id="home">
                  <Navbar />
                </div>
                <div id="about">
                  <About />
                </div>
                <div id="portfolio">
                  <Portfolio />
                </div>
                <div id="blog">
                  <Blog />
                </div>
                <div id="contact">
                  <Contact />
                </div>
              </>
            } 
          />

          {/* Demais rotas */}
          <Route path="/portfolio/:id" element={<ProjectDetails />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
