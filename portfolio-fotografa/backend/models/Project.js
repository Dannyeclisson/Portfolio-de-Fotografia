const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    client: { type: String, required: true },
    theme: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
