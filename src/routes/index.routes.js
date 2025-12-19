const express = require('express');
const protect = require('../middleware/auth.middleware');
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/index.controller');

const router = express.Router();

router.get('/users', protect, getUsers);

router.get('/', protect, getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;