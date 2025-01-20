const express = require('express');
const mongoose = require('./config/db');
const cors = require('cors');
const portfolioRoutes = require('./routes/portfolioRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Para servir imagens

// Rotas
app.use('/api/portfolio', portfolioRoutes);

// Porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

