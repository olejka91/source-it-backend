const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  created_at: mongoose.Schema.Types.Date,
  avatar: { type: String, required: false },
  first_name: { type: String, required: true },
  last_name: { type: String, require: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
  },
  password: { type: String, required: true },
  age: { type: String, required: false },
  gender: { type: String, required: false },
});

module.exports = mongoose.model('user', userSchema);
