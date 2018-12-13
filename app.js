const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// CONFIGURE REST API MIDDLEWARES
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CONNECT TO DB
mongoose.connect(
  'mongodb://localhost:27017/test',
  (err, db) => {
    if (!err) {
      console.log('We are connected');
    }
  },
  { useNewUrlParser: true }
);
mongoose.set('debug', true);

const authRoutes = require('./api/routes/auth');
const profileRoutes = require('./api/routes/profile');
const booksRoutes = require('./api/routes/books');

// SET UP ROUTES
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/books', booksRoutes);

// HANDLE ERRORS
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;

  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: { message: error.message },
  });
});

module.exports = app;
