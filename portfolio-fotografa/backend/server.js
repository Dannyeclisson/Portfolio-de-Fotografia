const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Middleware para processar dados JSON no corpo das requisições
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conectar ao MongoDB
connectDB();

// Rotas
const portfolioRoutes = require('./routes/portfolioRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const contactRoutes = require('./routes/contactRoutes');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes'); // Importando a autenticação

app.use('/portfolio', portfolioRoutes);
app.use('/about', aboutRoutes);
app.use('/contact', contactRoutes);
app.use('/blog', blogRoutes);
app.use('/auth', authRoutes); // Adicionando as rotas de autenticação

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
