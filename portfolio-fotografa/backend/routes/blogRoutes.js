const express = require("express");
const router = express.Router();
const multer = require("multer");
const BlogPost = require("../models/blogModel");

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
    const image = req.file ? req.file.path : req.body.image;

    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { title, image, description, link },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post não encontrado." });
    }

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