const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true }, // Link do botão "Veja Mais"
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BlogPost", blogSchema);