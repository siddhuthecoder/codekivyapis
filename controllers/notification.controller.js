const mongoose = require('mongoose');
const Notification = require('../models/Notification');
const { ErrorValidation, SuccessValidation } = require('../utils/helpers');

// Send notification
const sendNotification = async (req, res) => {
    const { message, Attachment, link } = req.body;

    try {
        const generalNotification = new Notification({
            message,
            Attachment,
            link,
        });

        await generalNotification.save();
        return res.status(200).json({ message: 'General notification sent to the website.' });
    } catch (err) {
        return res.status(500).json({ message: 'Error sending notifications.', error: err.message });
    }
};

// Get all notifications
const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        SuccessValidation(req, res, notifications);
    } catch (err) {
        ErrorValidation(req, res, err);
    }
};

// Delete a single notification by ID
const deleteNotification = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedNotification = await Notification.findByIdAndDelete(id);
        if (!deletedNotification) {
            return res.status(404).json({ message: 'Notification not found.' });
        }
        return res.status(200).json({ message: 'Notification deleted successfully.' });
    } catch (err) {
        return res.status(500).json({ message: 'Error deleting notification.', error: err.message });
    }
};

// Delete all notifications
const deleteAllNotifications = async (req, res) => {
    try {
        await Notification.deleteMany({});
        return res.status(200).json({ message: 'All notifications deleted successfully.' });
    } catch (err) {
        return res.status(500).json({ message: 'Error deleting notifications.', error: err.message });
    }
};

module.exports = {
    sendNotification,
    getAllNotifications,
    deleteNotification,
    deleteAllNotifications
};
