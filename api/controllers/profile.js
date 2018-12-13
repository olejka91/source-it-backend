const bcrypt = require('bcrypt');

// REQUIRE MODELS
const User = require('../models/user');
const Book = require('../models/book');

const SALT = 10;

exports.getProfileData = ({ userId }, res) => {
  User.findOne({ _id: userId }, (error, user) => {
    if (!user) return res.status(404).json({ error });

    return res.status(200).json({
      user: {
        avatar: user.avatar,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        gender: user.gender,
      },
    });
  });
};

exports.changePassword = ({ userId, body }, res) => {
  bcrypt.hash(body.password, SALT, (err, hash) => {
    if (err) return res.status(401).json({ message: 'Encryption problem was occurred', err });

    User.findOneAndUpdate({ _id: userId }, { password: hash }, (err, result) => {
      if (err) return res.status(404).json({ message: 'Problems with pass update', err });

      res.status(204).json({});
    });
  });
};

exports.deleteUser = ({ userId }, res) => {
  User.deleteOne({ _id: userId }, error => {
    if (error) return res.status(404).json({ error });

    Book.deleteMany({ userId }, err => {
      if (err) return res.status(404).json({ err });

      res.status(200).json({ message: 'User removed', succeed: true });
    });
  });
};

exports.updateProfile = ({ userId, body, file }, res) => {
  User.findOneAndUpdate({ _id: userId }, { ...body, avatar: file.path }, (error, user) => {
    if (error) return res.status(404).json({ message: 'Problems with profile update', error });

    res.status(200).json({
      user: {
        avatar: user.avatar,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        gender: user.gender,
      },
    });
  });
};
