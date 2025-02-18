import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'; // Importe o Navbar
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams(); 
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
      <Navbar /> {/* Adicione o Navbar aqui */}
      <div className="photo-gallery">
        {project.photos.map((photo, index) => (
          <img 
            key={index} 
            src={`http://localhost:5000/${photo}`} 
            alt={`Foto ${index + 1}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectDetails;
