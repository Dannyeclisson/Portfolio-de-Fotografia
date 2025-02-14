import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/portfolio');
        setProjects(res.data);
      } catch (err) {
        console.error('Erro ao buscar projetos:', err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Portfolio</h1>
      <div>
        {projects.map((project) => (
          <Link 
            to={`/portfolio/${project._id}`} // Direciona para a página de detalhes do projeto
            key={project._id}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div>
              <h2>{project.client}</h2>
              <p>{project.theme}</p>
              <img 
                src={`http://localhost:5000/${project.image}`} 
                alt={project.client} 
                style={{ width: '200px', height: 'auto' }} 
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
