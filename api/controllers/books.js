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

exports.createBook = ({ userId, body, file }, res) => {
  const book = new Book({
    _id: mongoose.Types.ObjectId(),
    userId,
    title: body.title,
    description: body.description,
    author: body.author,
    pages: body.pages,
    published: body.published,
    image: file.path,
  });

  book
    .save()
    .then(book => {
      return res.status(201).json({ book });
    })
    .catch(error => {
      return res.status(400).json({ error });
    });
};

exports.updateBook = ({ params, body }, res, next) => {
  Book.findOneAndUpdate({ _id: params.bookId }, body, (err, book) => {
    if (err) return res.status(400).json({ err });

    res.status(204).json({ book });
  });
};

exports.updateBookImage = ({ params, file }, res, next) => {
  Book.findOneAndUpdate({ _id: params.bookId }, { image: file.path }, (err, book) => {
    if (err) return res.status(400).json({ err });

    res.status(200).json({ message: "Book's cover updated" });
  });
};

exports.deleteBook = ({ params }, res, next) => {
  Book.findOneAndDelete({ _id: params.bookId }, err => {
    if (err) return res.status(404).json({ err });

    res.status(204).json({});
  });
};
