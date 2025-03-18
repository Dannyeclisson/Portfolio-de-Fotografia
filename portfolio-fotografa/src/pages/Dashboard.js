import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import './Dashboard.css'; // Importando o CSS

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("sobre");
  const [about, setAbout] = useState({ photo: "", description: "" });
  const [newPhoto, setNewPhoto] = useState(null);
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingProjectData, setEditingProjectData] = useState({
    client: "",
    theme: "",
    image: null,
  });
  const [newProject, setNewProject] = useState({
    client: "",
    theme: "",
    image: null,
  });

  useEffect(() => {
    fetch("http://localhost:5000/about")
      .then((res) => res.json())
      .then((data) => setAbout(data))
      .catch((err) => console.error("Erro ao buscar dados:", err));

    fetch("http://localhost:5000/portfolio")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Erro ao buscar projetos:", err));
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handlePhotoChange = (e) => {
    setNewPhoto(e.target.files[0]);
  };

  const handlePhotoUpload = async () => {
    if (!newPhoto) return;
    const formData = new FormData();
    formData.append("photo", newPhoto);
    formData.append("id", about._id);

    try {
      const response = await fetch("http://localhost:5000/about/edit-photo", {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setAbout(result.about);
        alert("Foto atualizada com sucesso!");
      } else {
        alert("Erro ao atualizar foto: " + result.message);
      }
    } catch (error) {
      console.error("Erro ao enviar foto:", error);
    }
  };

  const handleAddProject = async () => {
    const formData = new FormData();
    formData.append("client", newProject.client);
    formData.append("theme", newProject.theme);
    if (newProject.image) {
      formData.append("image", newProject.image);
    }

    try {
      const response = await fetch("http://localhost:5000/portfolio", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setProjects([...projects, result]);
        alert("Projeto adicionado com sucesso!");
      } else {
        alert("Erro ao adicionar projeto: " + result.message);
      }
    } catch (error) {
      console.error("Erro ao adicionar projeto:", error);
    }
  };

  const handleEditProject = (project) => {
    setEditingProjectId(project._id);
    setEditingProjectData({
      client: project.client,
      theme: project.theme,
      image: null,
    });
  };

  const handleDeleteProject = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/portfolio/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects(projects.filter((proj) => proj._id !== id));
        alert("Projeto deletado com sucesso!");
      } else {
        alert("Erro ao deletar projeto");
      }
    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
    }
  };

  const handleProjectUpdate = async () => {
    if (!editingProjectId) return;
  
    const updatedData = {
      client: editingProjectData.client,
      theme: editingProjectData.theme,
    };
  
    try {
      const response = await fetch(`http://localhost:5000/portfolio/${editingProjectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Atualiza a lista de projetos no estado
        setProjects((prevProjects) =>
          prevProjects.map((proj) =>
            proj._id === editingProjectId ? { ...proj, ...updatedData } : proj
          )
        );
        setEditingProjectId(null);
        alert("Projeto atualizado com sucesso!");
      } else {
        alert("Erro ao atualizar projeto: " + result.message);
      }
    } catch (error) {
      console.error("Erro ao atualizar projeto:", error);
    }
  };
  

  const handlePhotosChange = (e) => {
    setEditingProjectData({
      ...editingProjectData,
      photos: [...e.target.files],
    });
  };

  const handlePhotosUpload = async () => {
    if (!editingProjectId || editingProjectData.photos.length === 0) return;

    const formData = new FormData();
    editingProjectData.photos.forEach((photo) => {
      formData.append("photos", photo);
    });

    try {
      const response = await fetch(`http://localhost:5000/portfolio/${editingProjectId}/photos`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setProjects(
          projects.map((proj) =>
            proj._id === editingProjectId ? { ...proj, photos: result.photos } : proj
          ),
        );
        alert("Fotos adicionadas com sucesso!");
      } else {
        alert("Erro ao adicionar fotos: " + result.message);
      }
    } catch (error) {
      console.error("Erro ao enviar fotos:", error);
    }
  };

  const handleDeletePhoto = async (projectId, photo) => {
    try {
      const response = await fetch(`http://localhost:5000/portfolio/${projectId}/photos`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ photo }),
      });
  
      if (response.ok) {
        // Atualiza o estado para remover a foto excluída
        setProjects(
          projects.map((proj) =>
            proj._id === projectId
              ? { ...proj, photos: proj.photos.filter((p) => p !== photo) }
              : proj
          )
        );
        alert("Foto deletada com sucesso!");
      } else {
        alert("Erro ao deletar foto");
      }
    } catch (error) {
      console.error("Erro ao deletar foto:", error);
    }
  };
  

  return (
    <div className="dashboard-container">
      <h2>Painel de Administração</h2>
      <p>Bem-vinda, {user?.email}!</p>
      <button onClick={handleLogout} className="exit">Sair</button>

      <div className="tabs">
        <button onClick={() => setActiveTab("sobre")} className={activeTab === "sobre" ? "active" : ""}>Sobre Mim</button>
        <button onClick={() => setActiveTab("trabalhos")} className={activeTab === "trabalhos" ? "active" : ""}>Trabalhos</button>
        <button onClick={() => setActiveTab("blog")} className={activeTab === "blog" ? "active" : ""}>Blog</button>
        <button onClick={() => setActiveTab("contatos")} className={activeTab === "contatos" ? "active" : ""}>Contatos</button>
      </div>

      <div className="tab-content">
        {activeTab === "sobre" && (
          <div className="sobre-mim-container">
            <h3>Sobre Mim</h3>
            {about.photo && <img src={`http://localhost:5000/${about.photo}`} alt="Foto" width="200" />} <br />
            <input type="file" onChange={handlePhotoChange} /> <br />
            <button onClick={handlePhotoUpload} className="update-photo">Atualizar Foto</button>
          </div>
        )}

        {activeTab === "trabalhos" && (
          <div>
            <h3>Adicionar Novo Trabalho</h3>
            <input
              type="text"
              placeholder="Nome do Cliente"
              value={newProject.client}
              onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
            />
            <input
              type="text"
              placeholder="Tema do Trabalho"
              value={newProject.theme}
              onChange={(e) => setNewProject({ ...newProject, theme: e.target.value })}
            />
            <input type="file" onChange={(e) => setNewProject({ ...newProject, image: e.target.files[0] })} />
            <button onClick={handleAddProject}>Adicionar Trabalho</button>

            <h3>Trabalhos Existentes</h3>
            {projects.map((project) => (
              <div key={project._id} className="project-item">
                <h5>{project.client} - {project.theme}</h5>
                {project.image && <img src={`http://localhost:5000/${project.image}`} alt="Imagem do projeto" width="400" />}
                <button onClick={() => handleEditProject(project)} className="edit">Editar</button>
                <button onClick={() => handleDeleteProject(project._id)} className="delete">Deletar</button>

                {editingProjectId === project._id && (
                  <div>
                    <h3>Editar Trabalho</h3>
                    <input type="text" value={editingProjectData.client} onChange={(e) => setEditingProjectData({ ...editingProjectData, client: e.target.value })} />
                    <input type="text" value={editingProjectData.theme} onChange={(e) => setEditingProjectData({ ...editingProjectData, theme: e.target.value })} />
                    <button onClick={handleProjectUpdate}>Atualizar</button>
                    
                    <div>
                      <h3>Adicionar fotos ao Projeto</h3>
                      <input
                        type="file"
                        multiple
                        onChange={handlePhotosChange}
                      />
                      <button onClick={handlePhotosUpload}>Adicionar Fotos</button>
                    </div>

                    <h3>Fotos do Trabalho:</h3>
                    {project.photos && project.photos.map((photo, index) => (
                      <div key={index} className="photo-item">
                        <img src={`http://localhost:5000/${photo}`} alt={`Foto ${index + 1}`} width="150" />
                        <button onClick={() => handleDeletePhoto(project._id, photo)} className="delete">Deletar Foto</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
