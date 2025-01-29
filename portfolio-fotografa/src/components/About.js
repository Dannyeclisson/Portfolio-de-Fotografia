import React, { useState, useEffect } from "react";
import "./About.css";

const About = () => {
  const [photoUrl, setPhotoUrl] = useState(""); // Estado para a URL da foto

  // Função para buscar a foto do backend
  useEffect(() => {
    fetch("http://localhost:5000/about/photo") // URL corrigida
      .then((response) => response.json())
      .then((data) => {
        if (data.photoUrl) {
          setPhotoUrl(data.photoUrl);
        }
      })
      .catch((error) => console.error("Erro ao carregar a foto:", error));
  }, []);

  return (
    <div className="about">
      {/* Foto da Clara Amaral */}
      {photoUrl ? (
        <img
          src={photoUrl}
          alt="Clara Amaral"
          className="about-photo"
        />
      ) : (
        <p>Carregando foto...</p>
      )}

      {/* Texto Sobre Mim */}
      <div className="about-text">
        <h1>Clara Amaral</h1>
        <h2>Sobre Mim</h2>

        <div className="about-details">
          <div className="detail-box">
            <h3>Minha Visão</h3>
            <p>Acredito que a fotografia é uma forma poderosa de contar histórias e transmitir emoções. Minha visão é capturar momentos únicos, oferecendo uma perspectiva autêntica e inspiradora para cada cliente.</p>
          </div>
          <div className="detail-box">
            <h3>Minha Missão</h3>
            <p>Minha missão é criar imagens que não apenas documentam momentos, mas que também tocam o coração e a alma de quem as vê. Busco sempre entregar trabalho de alta qualidade com dedicação e compromisso.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
