import React, { useEffect, useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch("http://localhost:5000/contact/photo");
        if (!response.ok) throw new Error("Erro ao carregar foto");

        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setPhotoUrl(objectUrl);
      } catch (error) {
        console.error("Erro ao carregar foto:", error);
        setPhotoUrl("fallback-image.jpg");
      }
    };

    fetchPhoto();
  }, []);

  return (
    <div className="contact-wrapper">
      <div className="contact-left">
        <h1 className="contact-name">Clara Amaral</h1>

        <p className="social-text">Siga-nos nas redes sociais</p>

        <div className="gallery-row">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Foto social"
              onError={(e) => (e.target.src = "fallback-image.jpg")}
            />
          ) : (
            <p>Carregando foto...</p>
          )}
        </div>
      </div>

      <div className="contact-right">
        <h3 className="right-title">Localização</h3>
        <p className="right-text">Brasília - DF</p>

        <h3 className="right-title">Contato</h3>
        <p className="right-text">
          <a href="mailto:email@exemplo.com">email@exemplo.com</a>
          <br />
          (555) 555-5555
        </p>
      </div>
    </div>
  );
};

export default Contact;
