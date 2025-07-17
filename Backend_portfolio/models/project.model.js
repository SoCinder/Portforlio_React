const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title:String,
  desc:String,
  image:String,
  link:String
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
