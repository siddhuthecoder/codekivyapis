const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    Attachment: {type:String},
    link :{type:String}
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
