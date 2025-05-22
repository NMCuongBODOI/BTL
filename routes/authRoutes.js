const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);        // POST /api/auth/signup
router.post('/login', authController.login);          // POST /api/auth/login
router.post('/verify', authController.verifyToken);   // POST /api/auth/verify

module.exports = router;