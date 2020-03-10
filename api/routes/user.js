const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.get('/', UserController.get_all_users);

router.post('/login', UserController.login);

router.post('/signup', UserController.signup);

module.exports = router;