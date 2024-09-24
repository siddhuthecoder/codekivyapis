const express = require('express');
const router = express.Router();
const { sendNotification,getAllNotifications } = require('../controllers/notification.controller');

router.post('/send', sendNotification);

router.get('/',getAllNotifications);
module.exports = router;
