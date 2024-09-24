const Student = require('../models/Student');
const Notification = require('../models/Notification');
const {ErrorValidation,SuccessValidation} = require('../utils/helpers');

const sendNotification = async (req, res) => {
    const { message,Attachment,link } = req.body;

    try {
            // If no courseId is provided, send a general notification to the website
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

const getAllNotifications = async (req,res) => {
    try {
        const notifications = await Notification.find();
        SuccessValidation(req, res, notifications);
    } catch (err) {
        ErrorValidation(req, res, err);
    }
};

module.exports = { sendNotification,
  getAllNotifications,
};
