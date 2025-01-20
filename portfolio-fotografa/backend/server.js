const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db'); // Importa a função para conectar ao MongoDB

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conectar ao MongoDB usando connectDB()
connectDB();

// Rotas
const portfolioRoutes = require('./routes/portfolio');
app.use('/portfolio', portfolioRoutes);

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
