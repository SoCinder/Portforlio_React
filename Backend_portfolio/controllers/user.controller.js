const User = require('../models/user.model');

exports.getAll = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

exports.getById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

exports.create = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  const obj = user.toObject();
  delete obj.password;
  res.status(201).json(obj);
};

exports.update = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

exports.remove = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted successfully' });
};
