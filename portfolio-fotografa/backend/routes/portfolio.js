const express = require('express');
const multer = require('multer');
const Project = require('../models/Project');

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
    const { client, theme } = req.body;
    const image = req.file.path;

    const newProject = new Project({ client, theme, image });
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

//Rota: Editar um projeto
router.put('/:id', async (req, res) => {
  console.log('Entrou na rota PUT /portfolio/:id');
  try {
    const { id } = req.params;
    const { client, theme } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { client, theme },
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

module.exports = router;
