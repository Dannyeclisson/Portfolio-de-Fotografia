import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Portfolio.css';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState(3);

  // Buscar projetos do backend
  useEffect(() => {
    fetch('http://localhost:5000/portfolio')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Erro ao carregar projetos:', error));
  }, []);

  // Função para exibir mais projetos
  const handleSeeMore = () => {
    setVisibleProjects(projects.length); // Exibe todos os projetos
  };

  return (
    <div className="portfolio-container">
      <h2>Experiências Profissionais</h2>
      <div className="portfolio-grid">
        {projects.slice(0, visibleProjects).map((project) => (
          <Link 
            to={`/portfolio/${project._id}`} 
            key={project._id} 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="portfolio-item" style={{ cursor: 'pointer' }}>
              <img src={`http://localhost:5000/${project.image}`} alt={project.theme} />
              <div className="portfolio-info">
                <h3>{project.client}</h3>
                <p>{project.theme}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {visibleProjects < projects.length && (
        <div className="see-more-container">
          <button className="see-more-button" onClick={handleSeeMore}>
            Veja Mais
          </button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
