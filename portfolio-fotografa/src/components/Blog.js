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
      {loading ? (
        <p>Carregando posts...</p>
      ) : (
        <div className="blog-posts-masonry">
          {posts.map((post, index) => (
            <a 
              href={post.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`blog-post-card masonry-item-${index % 6}`} 
              key={post._id}
            >
              <div className="post-image-container">
                <img 
                  src={`http://localhost:5000/${post.image}`} 
                  alt={post.title} 
                  className="post-image"
                />
                <div className="post-content-overlay">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;