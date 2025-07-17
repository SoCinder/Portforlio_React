// backend/controllers/education.controller.js
const Education = require('../models/education.model');

exports.getAll = async (req, res) => {
  const list = await Education.find();
  res.json(list);
};

exports.getById = async (req, res) => {
  const entry = await Education.findById(req.params.id);
  if (!entry) return res.status(404).json({ message: 'Education not found' });
  res.json(entry);
};

exports.create = async (req, res) => {
  const entry = new Education(req.body);
  await entry.save();
  res.status(201).json(entry);
};

exports.update = async (req, res) => {
  const entry = await Education.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!entry) return res.status(404).json({ message: 'Education not found' });
  res.json(entry);
};

exports.remove = async (req, res) => {
  await Education.findByIdAndDelete(req.params.id);
  res.json({ message: 'Education deleted successfully' });
};
