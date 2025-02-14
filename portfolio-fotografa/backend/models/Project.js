const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    client: { type: String, required: true },
    theme: { type: String, required: true },
    image: { type: String, required: true },
    photos: [{ type: String }] // Array para armazenar as URLs das fotos
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
