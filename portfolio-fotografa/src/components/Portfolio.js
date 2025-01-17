import React, { useState } from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const [projects, setProjects] = useState([
    { id: 1, image: 'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', client: 'Ana Paula', theme: 'Casamento' },
    { id: 2, image: 'https://images.pexels.com/photos/24740393/pexels-photo-24740393/free-photo-of-momento-familia.jpeg?auto=compress&cs=tinysrgb&w=600', client: 'João e Maria', theme: 'Ensaio' },
    { id: 3, image: 'https://images.pexels.com/photos/16537217/pexels-photo-16537217/free-photo-of-segurando-holding-cerimonia-evento.png?auto=compress&cs=tinysrgb&w=600', client: 'Carla Silva', theme: 'Batizado' },
    { id: 4, image: 'https://images.pexels.com/photos/3534022/pexels-photo-3534022.jpeg?auto=compress&cs=tinysrgb&w=600', client: 'Lucas Costa', theme: 'Festa de 15 anos' },
  ]);

  const [visibleProjects, setVisibleProjects] = useState(2); // Quantos projetos estão visíveis

  const handleSeeMore = () => {
    setVisibleProjects(projects.length); // Exibe todos os projetos
  };

  return (
    <div className="portfolio-container">
      <h2>Experiências Profissionais</h2>
      <div className="portfolio-grid">
        {projects.slice(0, visibleProjects).map((project) => (
          <div key={project.id} className="portfolio-item">
            <img src={project.image} alt={project.theme} />
            <div className="portfolio-info">
              <h3>{project.client}</h3>
              <p>{project.theme}</p>
            </div>
          </div>
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
