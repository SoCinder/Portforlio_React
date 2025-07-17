// backend/routes/auth.routes.js
const router        = require('express').Router();
const asyncHandler  = require('../middlewares/asyncHandler');
const { signup, signin } = require('../controllers/auth.controller');

router.post('/signup', asyncHandler(signup));
router.post('/signin', asyncHandler(signin));

module.exports = router;
