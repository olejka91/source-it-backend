const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const imageUpload = require('../middleware/imageUpload');

// REQUIRE CONTROLLERS
const booksController = require('../controllers/books');

router.get('/', checkAuth, booksController.getAllBooks);
router.get('/:bookId', checkAuth, booksController.getBook);
router.post('/', imageUpload.single('image'), checkAuth, booksController.createBook);
router.put('/:bookId', checkAuth, booksController.updateBook);
router.delete('/:bookId', checkAuth, booksController.deleteBook);

module.exports = router;
