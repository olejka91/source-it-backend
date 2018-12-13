const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REQUIRE MODEL
const User = require('../models/user');

const SALT = 10;

exports.login = ({ body }, res) => {
  User.findOne({ email: body.email }, (err, user) => {
    if (err) return res.status(500).json({ message: 'Internal error', err });

    if (!user) return res.status(401).json({ message: 'Auth failed' });

    bcrypt.compare(body.password, user.password, (err, result) => {
      if (err) return res.status(401).json({ message: 'Auth failed' });

      if (!result) return res.status(401).json({ message: 'Auth failed' });

      const token = jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_KEY, {
        expiresIn: '1h',
      });

      return res
        .header({ token })
        .status(200)
        .json({
          email: user.email,
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          created_at: user.created_at,
        });
    });
  });
};

exports.registration = ({ body }, res) => {
  User.findOne({ email: body.email }, (err, user) => {
    if (err) return res.status(400).json({ err });

    if (user) return res.status(422).json({ message: 'Mail exists' });

    bcrypt.hash(body.password, SALT, (err, hash) => {
      if (err) return res.status(401).json({ message: 'Encryption problem was occurred', err });

      const user = new User({
        _id: mongoose.Types.ObjectId(),
        created_at: new Date().toISOString(),
        ...body,
        email: body.email,
        password: hash,
      });

      user.save().then(result => {
        const token = jwt.sign({ email: result.email, userId: result._id }, process.env.JWT_KEY, {
          expiresIn: '1h',
        });

        res
          .header({ token })
          .status(201)
          .json({
            user: {
              email: result.email,
              id: result._id,
              first_name: result.first_name,
              last_name: result.last_name,
              created_at: result.created_at,
            },
          });
      });
    });
  });
};

exports.forgotPassword = (req, res, next) => {};
