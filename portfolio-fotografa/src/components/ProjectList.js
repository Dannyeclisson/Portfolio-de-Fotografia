import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProjectList = () => {
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
      <div style={{ 
        columnCount: 3, 
        columnGap: '20px' 
      }}>
        {projects.map((project) => (
          <Link 
            to={`/portfolio/${project._id}`}
            key={project._id}
            style={{ 
              textDecoration: 'none', 
              color: 'inherit', 
              display: 'inline-block', 
              marginBottom: '20px',
              width: '100%'
            }}
          >
            <div>
              <img 
                src={`http://localhost:5000/${project.image}`} 
                alt={project.theme} 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  display: 'block',
                  marginBottom: '8px'
                }} 
              />
              <p style={{ 
                textAlign: 'center', 
                fontSize: '1rem', 
                color: '#36302A' 
              }}>
                {project.theme}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
