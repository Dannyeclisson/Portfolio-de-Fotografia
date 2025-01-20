const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { createPortfolioItem } = require('../controllers/portfolioController');

// Rota para criar um trabalho com upload
router.post('/upload', upload.single('image'), createPortfolioItem);

module.exports = router;
