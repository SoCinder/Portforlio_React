const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
