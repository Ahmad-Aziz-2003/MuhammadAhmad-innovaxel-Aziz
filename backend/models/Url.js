const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  url: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  accessCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Url', UrlSchema);
