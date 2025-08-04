const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const ErrorValidation = (req,res, err) => {
    const errors = err.errors ? Object.values(err.errors).map(error => error.message) : [err.message];
    res.status(400).json({ success: false, errors });
};

const SuccessValidation = (req,res, data, statusCode = 200) => {
    res.status(statusCode).json({ success: true, data });
};

const generateJwtToken = (account) => {
    return jwt.sign(
        { id: account._id, email: account.email, role: account.role || 'user' },  // Default role to 'user' if not present
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};


module.exports = {
    ErrorValidation,
    SuccessValidation,
    generateJwtToken
};
