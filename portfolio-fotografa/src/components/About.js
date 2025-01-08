import React from "react";
import "./About.css";
import fotosobremim from "../images/fotosobremim.jpg";

const About = () => {
  return (
    <div className="about">
      {/* Foto da Clara Amaral */}
      <img
        src={fotosobremim} // Usando a foto importada
        alt="Clara Amaral"
        className="about-photo"
      />
      
      {/* Texto Sobre Mim */}
      <div className="about-text">
        <h1>Clara Amaral</h1>
        <h2>Sobre Mim</h2>
        
        {/* Seção para os quadrados de "Minha Visão" e "Minha Missão" */}
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
