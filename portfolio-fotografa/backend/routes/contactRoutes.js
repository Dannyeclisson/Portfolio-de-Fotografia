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

// Rota para criar um novo registro "Contatos" com a foto inicial
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhuma imagem enviada.' });
    }

    const photoPath = req.file.path; // Caminho da imagem salva

    const contact = new Contact({ photo: photoPath });
    await contact.save();

    res.status(201).json({ message: 'Registro criado com sucesso!', contact });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o registro.', error });
  }
});


// Rota para atualizar a foto
router.put('/edit-photo', upload.single('photo'), async (req, res) => {
  try {
    const id = req.body.id; // ← Corrija para pegar do FormData
    if (!id) return res.status(400).json({ message: 'ID ausente' });

    const contact = await Contact.findByIdAndUpdate(
      id,
      { photo: req.file.path },
      { new: true }
    );

    res.status(200).json({ 
      message: 'Foto atualizada!', 
      contact // ← Garanta que isso está sendo retornado
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno', error });
  }
});

// Rota para buscar o registro "Contatos"
router.get('/', async (req, res) => {
  try {
    const contact = await Contact.findOne(); // Busca o único registro "Contatos"
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o registro.', error });
  }
});

// Rota para buscar a foto
router.get('/photo', async (req, res) => {
  try {
    const contact = await Contact.findOne();
    if (!contact || !contact.photo) {
      return res.status(404).json({ message: 'Nenhuma foto encontrada.' });
    }
    res.sendFile(path.resolve(contact.photo));
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar a foto.', error });
  }
});

module.exports = router;