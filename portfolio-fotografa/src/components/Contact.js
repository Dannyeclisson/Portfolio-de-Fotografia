import React, { useState, useEffect } from "react";
import "./Contact.css";

const Contact = () => {
  const [photoUrl, setPhotoUrl] = useState(""); // Estado para armazenar a foto

  // Buscar a foto do backend
  useEffect(() => {
    fetch("http://localhost:5000/contact/photo")
      .then((response) => response.json())
      .then((data) => {
        if (data.photoUrl) {
          setPhotoUrl(data.photoUrl);
        }
      })
      .catch((error) => console.error("Erro ao carregar a foto do contato:", error));
  }, []);

  return (
    <div className="contact-section">
      <div className="contact-image">
        {photoUrl ? (
          <img src={photoUrl} alt="Contato" />
        ) : (
          <p>Carregando foto...</p>
        )}
      </div>
      <div className="contact-details">
        <h2>Contato</h2>
        <p>Entre em contato comigo para qualquer dúvida, solicitação de orçamento ou até mesmo para discutir aquele projeto especial que você tem em mente. Estou à disposição para ajudar a transformar suas ideias em realidade e garantir que cada momento seja capturado da melhor maneira possível. Vamos conversar e fazer algo incrível juntos!</p>
        <div className="contact-info">
          <span>📞 (61) 9576-6922</span>
          <span>📧 fotografa@email.com</span>
          <span>📷 @fotografa_insta</span>
          <span>📍 Rua abc, 123 - Sua Cidade</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
