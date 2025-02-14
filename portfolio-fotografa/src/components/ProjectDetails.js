import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectDetails = () => {
  const { id } = useParams(); // Obtém o ID da URL
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/portfolio/${id}`);
        setProject(res.data);
      } catch (err) {
        console.error('Erro ao buscar detalhes do projeto:', err);
      }
    };

    fetchProjectDetails();
  }, [id]);

  if (!project) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>{project.client}</h1>
      <p>{project.theme}</p>
      <img 
        src={`http://localhost:5000/${project.image}`} 
        alt={project.client} 
        style={{ width: '400px', height: 'auto' }} 
      />
      <h2>Fotos:</h2>
      <div>
        {project.photos.map((photo, index) => (
          <img 
            key={index} 
            src={`http://localhost:5000/${photo}`} 
            alt={`Foto ${index + 1}`} 
            style={{ width: '200px', height: 'auto', margin: '10px' }} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectDetails;
