import React, { useState, useEffect } from "react";
import "./Blog.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/blog")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => console.error("Erro ao carregar posts:", error));
  }, []);

  return (
    <div className="blog-section">
      <h2 className="blog-title">Blog</h2>
      {loading ? (
        <p>Carregando posts...</p>
      ) : (
        <div className="blog-posts">
          {posts.map((post) => (
            <div className="blog-post" key={post._id}>
              <img src={`http://localhost:5000/${post.image}`} alt={post.title} />
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                <button>Veja Mais</button>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
