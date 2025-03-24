import React, { useState, useEffect } from "react";
import "./Contact.css";

const Contact = () => {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch("http://localhost:5000/contact/photo");
        
        if (!response.ok) {
          throw new Error('Foto não encontrada');
        }

        // Converter a resposta para Blob e criar URL
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setPhotoUrl(objectUrl);
      } catch (error) {
        console.error("Erro ao carregar a foto:", error);
        setPhotoUrl('fallback-image.jpg'); // Imagem de fallback
      }
    };

    fetchPhoto();
  }, []);

  return (
    <div className="contact-section">
      <div className="contact-image">
      {photoUrl ? (
          <img 
            src={photoUrl} 
            alt="Contato" 
            onError={(e) => {
              e.target.src = "fallback-image.jpg";
              setPhotoUrl("fallback-image.jpg");
            }}
          />
        ) : (
          <p>Carregando foto...</p>
        )}
      </div>
      <div className="contact-details">
        <h2>Contato</h2>
        <p>
          Entre em contato comigo para qualquer dúvida, solicitação de orçamento ou até mesmo para discutir aquele projeto especial que você tem em mente. 
          Estou à disposição para ajudar a transformar suas ideias em realidade e garantir que cada momento seja capturado da melhor maneira possível.
        </p>
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
