const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: { type: String, required: false },
  description: { type: String, required: false },
  published: { type: Boolean, required: false },
  contentGallery: [{ type: String, required: false }],
});

module.exports = mongoose.model('Content', contentSchema);