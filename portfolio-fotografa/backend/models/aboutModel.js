const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  photo: {
    type: String, // Caminho da foto (nome do arquivo ou URL)
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('About', aboutSchema);
