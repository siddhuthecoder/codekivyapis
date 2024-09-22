const express = require('express');
const router = express.Router();
const {getAllContactForms,submitContactForm} = require('../controllers/contact.controller');
const authMiddleware = require('../middleware/auth.middleware');


router.get('/', authMiddleware, getAllContactForms);

router.post('/', submitContactForm);

module.exports = router;
