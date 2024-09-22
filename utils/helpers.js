const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const ErrorValidation = (req,res, err) => {
    const errors = err.errors ? Object.values(err.errors).map(error => error.message) : [err.message];
    res.status(400).json({ success: false, errors });
};

const SuccessValidation = (req,res, data, statusCode = 200) => {
    res.status(statusCode).json({ success: true, data });
};

const generateJwtToken = (admin) => {
    return jwt.sign({ id: admin._id, email: admin.email, role: admin.role }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};

module.exports = {
    ErrorValidation,
    SuccessValidation,
    generateJwtToken
};
