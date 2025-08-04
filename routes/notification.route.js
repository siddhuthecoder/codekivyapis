const express = require('express');
const router = express.Router();
const { sendNotification, getAllNotifications, deleteNotification, deleteAllNotifications } = require('../controllers/notification.controller');

// Route to send a notification
router.post('/send', sendNotification);

// Route to get all notifications
router.get('/', getAllNotifications);

// Route to delete a specific notification by ID
router.delete('/:id', deleteNotification);

// Route to delete all notifications
router.delete('/', deleteAllNotifications);

module.exports = router;
