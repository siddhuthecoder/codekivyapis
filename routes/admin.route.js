const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controllers/admin.controller');

// Admin Registration
router.post('/register', registerAdmin);

// Admin Login
router.post('/login', loginAdmin);

module.exports = router;
