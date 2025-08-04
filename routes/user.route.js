const express = require('express');
const router = express.Router();
const { registerUser, loginUser, deleteUser,getUserDetails } = require('../controllers/user.controller');

// Admin Registration
router.post('/register', registerUser);

// Admin Login
router.post('/login', loginUser);

router.delete('/delete',deleteUser);

router.get('/details',getUserDetails)

module.exports = router;
