const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db'); // Conexão com o MongoDB

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conectar ao MongoDB
connectDB();

// Rotas
const portfolioRoutes = require('./routes/portfolio');
const aboutRoutes = require('./routes/aboutRoutes'); // Nome corrigido
const contactRoutes = require('./routes/contactRoutes');
app.use('/portfolio', portfolioRoutes);
app.use('/about', aboutRoutes); // Adiciona as rotas do About
app.use('/contact', contactRoutes);

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
