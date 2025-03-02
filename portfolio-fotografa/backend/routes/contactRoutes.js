const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Contact = require('../models/contactModel');

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pasta onde a imagem será salva
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Rota para atualizar a foto de contato
router.put('/edit-photo', upload.single('photo'), async (req, res) => {
  try {
    const { id } = req.body;
    const photoPath = req.file.path.replace("\\", "/"); // Corrigindo caminho para funcionar no frontend

    const contact = await Contact.findByIdAndUpdate(
      id,
      { photo: photoPath },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Registro de contato não encontrado.' });
    }

    res.status(200).json({ message: 'Foto do contato atualizada com sucesso!', contact });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a foto.', error });
  }
});

// Rota para buscar a última foto de contato cadastrada
router.get('/photo', async (req, res) => {
  try {
    const contact = await Contact.findOne().sort({ createdAt: -1 }); // Busca o último contato adicionado
    if (!contact || !contact.photo) {
      return res.status(404).json({ message: 'Nenhuma foto encontrada.' });
    }
    
    const photoUrl = `http://localhost:5000/${contact.photo.replace("\\", "/")}`;
    res.status(200).json({ photoUrl });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar a foto.', error });
  }
});

// Rota para criar um novo contato com foto
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhuma imagem enviada.' });
    }

    const newContact = new Contact({
      photo: req.file.path.replace("\\", "/"), // Corrigindo caminho da imagem
    });

    await newContact.save();
    res.status(201).json({ message: 'Contato criado com sucesso!', contact: newContact });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o contato.', error });
  }
});

module.exports = router;
