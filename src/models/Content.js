const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: { type: String, required: false },
  description: { type: String, required: false },
  contentGallery: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ContentGallery' }],
});

module.exports = mongoose.model('Product', contentSchema);