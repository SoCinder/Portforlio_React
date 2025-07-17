const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  school:String,
  degree: String,
  field:String,
  startDate: Date,
  endDate:Date
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);
