import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import galerias from "../images/galerias.jpg";
import './Portfolio.css';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [visibleProjects] = useState();

  // Buscar projetos do backend
  useEffect(() => {
    fetch('http://localhost:5000/portfolio')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Erro ao carregar projetos:', error));
  }, []);

  return (
    <div className="portfolio">
      <div className="portfolio-hero">
        <img src={galerias} alt="Galerias" className="portfolio-hero-image"/>
        <h2 className="portfolio-hero-title">Galerias</h2>
      </div>
      <div className="portfolio-grid">
        {projects.slice(0, visibleProjects).map((project) => {
          const imagePath = project.image ? project.image.replace(/\\/g, "/") : '';
          return (
            <Link 
              to={`/portfolio/${project._id}`} 
              key={project._id} 
              className="portfolio-link"
            >
              <div className="portfolio-item">
                <img 
                  src={`http://localhost:5000/${imagePath}`} 
                  alt={project.theme} 
                  className="portfolio-item-image" 
                />
                <div className="portfolio-theme">{project.theme}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Portfolio;