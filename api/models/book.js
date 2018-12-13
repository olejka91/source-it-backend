const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: false },
  description: { type: String, required: true },
  pages: { type: String, required: false },
  published: { type: mongoose.Schema.Types.Date, required: false },
});

module.exports = mongoose.model('book', bookSchema);
