const mongoose = require('mongoose');

// REQUIRE MODEL
const Book = require('../models/book');

exports.getAllBooks = ({ userId }, res) => {
  Book.find({ userId }, 'image title description', (err, books) => {
    if (err) return res.status(404).json({ message: 'Something went wrong', error: err });

    res.status(200).json({ books });
  });
};

exports.getBook = ({ userId, params }, res) => {
  Book.findOne({ userId, _id: params.bookId }, (err, book) => {
    if (err) return res.status(404).json({ message: 'No valid entry found for provided id' });

    res.status(200).json({ book });
  });
};

exports.createBook = ({ userId, body }, res) => {
  const book = new Book({
    _id: mongoose.Types.ObjectId(),
    userId,
    ...body,
  });

  book
    .save()
    .then(book => {
      res.status(201).json({ book });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};

exports.updateBook = ({ params, body }, res, next) => {
  Book.findOneAndUpdate({ _id: params.bookId }, { ...body }, err => {
    if (err) return res.status(400).json({ err });

    res.status(204).json({});
  });
};

exports.deleteBook = ({ params }, res, next) => {
  Book.findOneAndDelete({ _id: params.bookId }, err => {
    if (err) return res.status(404).json({ err });

    res.status(204).json({});
  });
};
