const express = require("express");
const router = express.Router();
const multer = require("multer");
const BlogPost = require("../models/blogModel");
const fs = require("fs");
const path = require("path");

// Configuração do multer para uploads de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Pasta onde as imagens serão salvas
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Criar um post do blog
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const image = req.file ? req.file.path : null;

    if (!title || !description || !link || !image) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const newPost = new BlogPost({ title, image, description, link });
    await newPost.save();

    res.status(201).json({ message: "Post criado com sucesso!", newPost });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar post.", error });
  }
});

// Buscar todos os posts do blog
router.get("/", async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar posts.", error });
  }
});

// Atualizar um post do blog
router.put("/edit/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado." });
    }

    // Se uma nova imagem for enviada, exclua a antiga
    let updatedImage = post.image; 
    if (req.file) {
      // Excluir imagem antiga se existir
      if (post.image) {
        const oldImagePath = path.join(__dirname, "..", post.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Erro ao excluir imagem antiga:", err);
        });
      }
      updatedImage = req.file.path;
    }

    // Atualizar o post
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { title, image: updatedImage, description, link },
      { new: true }
    );

    res.status(200).json({ message: "Post atualizado com sucesso!", updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar post.", error });
  }
});

// Deletar um post do blog
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post não encontrado." });
    }

    res.status(200).json({ message: "Post deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar post.", error });
  }
});

module.exports = router;