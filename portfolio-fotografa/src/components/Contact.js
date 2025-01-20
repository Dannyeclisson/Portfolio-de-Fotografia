import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-section">
      <div className="contact-image">
        <img 
          src="https://images.pexels.com/photos/3967438/pexels-photo-3967438.jpeg?auto=compress&cs=tinysrgb&w=600/400x400" 
          alt="Contato" 
        />
      </div>
      <div className="contact-details">
        <h2>Contato</h2>
        <p>Entre em contato comigo para qualquer dúvida, solicitação de orçamento ou até mesmo para discutir aquele projeto especial que você tem em mente. Estou à disposição para ajudar a transformar suas ideias em realidade e garantir que cada momento seja capturado da melhor maneira possível. Vamos conversar e fazer algo incrível juntos!</p>
        <div className="contact-info">
          <span>
            📞 (61) 9576-6922
          </span>
          <span>
            📧 fotografa@email.com
          </span>
          <span>
            📷 @fotografa_insta
          </span>
          <span>
            📍  Rua abc, 123 - Sua Cidade
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
