const express = require('express');
const {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
  deleteAllContacts,
} = require('../controllers/contact.controller');

const router = express.Router();

router.get('/', getAllContacts);
router.get('/:id', getContactById);
router.post('/', addContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);
router.delete('/', deleteAllContacts);

module.exports = router;
