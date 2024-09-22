const Contact = require('../models/Contact');  // Assuming you have a Contact model
const { ErrorValidation, SuccessValidation } = require('../utils/helpers');

// Handle contact form submission
const submitContactForm = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        SuccessValidation(req, res, { message: 'Contact form submitted successfully', contact: newContact }, 201);
    } catch (err) {
        ErrorValidation(req, res, err);
    }
};

// Get all contact form submissions
const getAllContactForms = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        SuccessValidation(req, res, contacts);
    } catch (err) {
        ErrorValidation(req, res, err);
    }
};

module.exports = {
    submitContactForm,
    getAllContactForms
};
