const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.post('/login-google', AuthController.loginWithGoogle);
router.post('/test-login', AuthController.testLogin);
router.post('/verify', AuthController.verify);
router.post('/logout', AuthController.logout);

module.exports = router;
