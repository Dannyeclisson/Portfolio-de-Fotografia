import React from "react";
import "./Blog.css";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Dicas de Fotografia",
      image: "https://images.pexels.com/photos/93820/pexels-photo-93820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/300x200",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat dui non metus pretium, sed tristique leo luctus.",
    },
    {
      id: 2,
      title: "Tendências de Iluminação",
      image: "https://images.pexels.com/photos/30315596/pexels-photo-30315596/free-photo-of-luz-de-lampada-dramatica-criando-um-ambiente-sombrio.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/300x200",
      description: "Phasellus euismod sapien non metus ultricies suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 3,
      title: "Como Escolher um Tema",
      image: "https://images.pexels.com/photos/2179205/pexels-photo-2179205.jpeg?auto=compress&cs=tinysrgb&w=600/300x200",
      description: "Donec feugiat dui non metus pretium, sed tristique leo luctus. Phasellus euismod sapien non metus ultricies suscipit.",
    },
  ];

  return (
    <div className="blog-section">
      <h2 className="blog-title">Blog</h2>
      <div className="blog-posts">
        {posts.map((post) => (
          <div className="blog-post" key={post.id}>
            <img src={post.image} alt={post.title} />
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <button>Veja Mais</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
