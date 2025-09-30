const express = require('express');
const multer = require('multer');
const Project = require('../models/ProjectModel');

const router = express.Router();

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Listar projetos
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar projetos' });
  }
});

// Adicionar novo projeto
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { theme } = req.body;
    const image = req.file.path;

    const newProject = new Project({ theme, image });
    await newProject.save();

    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar projeto' });
  }
});

// Deletar projeto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }

    res.status(200).json({ message: 'Projeto deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar projeto' });
  }
});

// Editar projeto (exceto imagem)
router.put('/:id', async (req, res) => {
  console.log('Entrou na rota PUT /portfolio/:id');
  try {
    const { id } = req.params;
    const { theme } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { theme },
      { new: true } // Retorna o projeto atualizado
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }

    console.log('Projeto atualizado:', updatedProject);
    res.status(200).json(updatedProject);
  } catch (err) {
    console.error('Erro ao editar projeto:', err);
    res.status(500).json({ message: 'Erro ao editar projeto' });
  }
});

// Editar apenas a imagem do projeto
router.put('/image/:id', upload.single('image'), async (req, res) => {
  console.log('Entrou na rota PUT /portfolio/image/:id');
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: 'Nenhuma imagem foi enviada' });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { image: req.file.path },
      { new: true } // Retorna o projeto atualizado
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }

    console.log('Imagem atualizada:', updatedProject);
    res.status(200).json(updatedProject);
  } catch (err) {
    console.error('Erro ao atualizar imagem:', err);
    res.status(500).json({ message: 'Erro ao atualizar imagem' });
  }
});

// Upload de várias fotos para um projeto específico
router.post('/:id/photos', upload.array('photos', 10), async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Projeto não encontrado!' });
    }

    // Adiciona as URLs das fotos no array do projeto
    const photoPaths = req.files.map(file => file.path);
    project.photos.push(...photoPaths);
    await project.save();

    res.status(200).json({ message: 'Fotos enviadas com sucesso!', photos: project.photos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao enviar as fotos!' });
  }
});

const fs = require('fs');
const path = require('path');

// Deletar foto do projeto
router.delete('/:id/photos', async (req, res) => {
  try {
    const { id } = req.params;
    const { photo } = req.body; // Caminho da foto a ser deletada

    // Remove a foto do diretório de uploads
    const filePath = path.join(__dirname, '..', photo);
    fs.unlinkSync(filePath);  // Exclui o arquivo

    // Atualiza o banco de dados, removendo a foto do projeto
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $pull: { photos: photo } },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }

    res.status(200).json(updatedProject);
  } catch (err) {
    console.error('Erro ao deletar foto:', err);
    res.status(500).json({ message: 'Erro ao deletar foto' });
  }
});


router.delete('/:projectId/photos/:photoIndex', async (req, res) => {
  try {
    const { projectId, photoIndex } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Projeto não encontrado!' });
    }

    if (project.photos[photoIndex]) {
      project.photos.splice(photoIndex, 1);
      await project.save();
      res.status(200).json({ message: 'Foto excluída com sucesso!' });
    } else {
      res.status(404).json({ message: 'Foto não encontrada!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir foto!' });
  }
});


// Obter um projeto específico (com fotos)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Projeto não encontrado!' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar o projeto!' });
  }
});

module.exports = router;
