import React, { useState, useEffect } from "react";
import "./About.css";

const About = () => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/about/photo")
      .then((response) => response.json())
      .then((data) => {
        if (data.photoUrl) {
          setPhotoUrl(data.photoUrl);
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar a foto:", error);
        setError("Erro ao carregar a foto");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="about">
      <h1>Clara Amaral</h1>

      <div className="content-wrapper">
        {loading ? (
          <p className="loading-text">Carregando foto...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <img src={photoUrl} alt="Clara Amaral" className="about-photo" />
        )}

        <div className="detail-box">
          <h3>Fotógrafa</h3>
          <h3>Diretora de Arte</h3>
          <h3>Produção Executiva</h3>
        </div>
      </div>

      <p className="about-quote">
        Transformando momentos em eternidade com um olhar que captura a essência
        da sofisticação. Fotografias refinadas que transbordam elegância, cada
        clique imortalizando detalhes preciosos. Experiencie a arte de fotografar
        em seu nível mais elevado e exclusivo.
      </p>
    </section>
  );
};

export default About;
