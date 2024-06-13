const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  price: { type: Number, required: false},
  title: { type: String, required: false },
  published: { type: Boolean, required: false },
  description: { type: String, required: false },
  contentGallery: [{ type: String, required: false }],
});

module.exports = mongoose.model('Content', contentSchema);