const Contact = require('../models/contact.model');

exports.getAll = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

exports.getById = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return res.status(404).json({ message: 'Contact not found' });
  res.json(contact);
};

exports.create = async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.status(201).json(contact);
};

exports.update = async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!contact) return res.status(404).json({ message: 'Contact not found' });
  res.json(contact);
};

exports.remove = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Contact deleted successfully' });
};
