const mongoose = require('mongoose');

const WorkSchema = new mongoose.Schema({
  client: { type: String, required: true },
  theme: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Work', WorkSchema);
