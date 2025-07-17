const Project = require('../models/project.model');

exports.getAll = async (req, res) => {
  const items = await Project.find();
  res.json(items);
};

exports.getById = async (req, res) => {
  const item = await Project.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Project not found' });
  res.json(item);
};

exports.create = async (req, res) => {
  const item = new Project(req.body);
  await item.save();
  res.status(201).json(item);
};

exports.update = async (req, res) => {
  const item = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!item) return res.status(404).json({ message: 'Project not found' });
  res.json(item);
};

exports.remove = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project deleted successfully' });
};
