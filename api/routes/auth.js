const express = require('express');
const router = express.Router();

// REQUIRE CONTROLLERS
const authController = require('../controllers/auth');

router.post('/login', authController.login);
router.post('/registration', authController.registration);
router.post('/forgot_password', authController.forgotPassword);

module.exports = router;
