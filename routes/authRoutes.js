const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Create an auth controller with login and register methods

router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));

module.exports = router;
