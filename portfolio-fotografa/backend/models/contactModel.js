const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  photo: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
