const router = require('express').Router();
const asyncHandler = require('../middlewares/asyncHandler');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const ctrl = require('../controllers/project.controller');

router.get('/', asyncHandler(ctrl.getAll));
router.get('/:id', asyncHandler(ctrl.getById));
router.post('/', verifyToken, isAdmin, asyncHandler(ctrl.create));
router.put('/:id', verifyToken, isAdmin, asyncHandler(ctrl.update));
router.delete('/:id',verifyToken, isAdmin, asyncHandler(ctrl.remove));

module.exports = router;
