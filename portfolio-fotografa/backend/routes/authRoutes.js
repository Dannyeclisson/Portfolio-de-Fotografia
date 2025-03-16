const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Rota de login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Procurar usuário no banco de dados
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }

    // Comparar senha com o hash armazenado
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Senha incorreta!" });
    }

    // Gerar token JWT
    const payload = { userId: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Sucesso no login, enviar o token JWT
    res.status(200).json({
      message: "Login bem-sucedido!",
      user: { email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor!" });
  }
});

// Rota de registro (criação de novo usuário)
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se o e-mail já está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "E-mail já está em uso!" });
    }

    // Criar novo usuário
    const user = new User({ email, password });

    // Salvar o usuário no banco de dados
    await user.save();

    // Gerar token JWT
    const payload = { userId: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Sucesso no registro, enviar o token JWT
    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      user: { email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor!" });
  }
});

module.exports = router;
