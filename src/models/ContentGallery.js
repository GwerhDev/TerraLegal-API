const mongoose = require("mongoose");

const contentGallerySchema = new mongoose.Schema({
  file: { type: String, required: true },
});

module.exports = mongoose.model('ContentGallery', contentGallerySchema);
