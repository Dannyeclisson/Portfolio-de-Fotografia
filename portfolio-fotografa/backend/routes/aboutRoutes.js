const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const About = require('../models/aboutModel');

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pasta para salvar as imagens
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Rota para criar um novo registro "Sobre Mim" com a foto inicial
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhuma imagem enviada.' });
    }

    const photoPath = req.file.path; // Caminho da imagem salva

    const about = new About({ photo: photoPath });
    await about.save();

    res.status(201).json({ message: 'Registro criado com sucesso!', about });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o registro.', error });
  }
});


// Rota para atualizar a foto
router.put('/edit-photo', upload.single('photo'), async (req, res) => {
  try {
    const { id } = req.body; // ID do registro "Sobre Mim"
    const photoPath = req.file.path; // Caminho do arquivo enviado

    const about = await About.findByIdAndUpdate(
      id,
      { photo: photoPath },
      { new: true }
    );

    if (!about) {
      return res.status(404).json({ message: 'Registro não encontrado.' });
    }

    res.status(200).json({ message: 'Foto atualizada com sucesso!', about });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a foto.', error });
  }
});

// Rota para buscar o registro "Sobre Mim"
router.get('/', async (req, res) => {
  try {
    const about = await About.findOne(); // Busca o único registro "Sobre Mim"
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o registro.', error });
  }
});

// Rota para buscar a foto
router.get('/photo', async (req, res) => {
  try {
    const about = await About.findOne(); // Busca o único registro "Sobre Mim"
    if (!about || !about.photo) {
      return res.status(404).json({ message: 'Nenhuma foto encontrada.' });
    }
    res.status(200).json({ photoUrl: `http://localhost:5000/${about.photo}` });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar a foto.', error });
  }
});

module.exports = router;