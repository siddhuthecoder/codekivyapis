const mongoose = require('mongoose');
const crypto = require('crypto');

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' }
}, { timestamps: true });

// Hash password before saving the admin
adminSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        const hash = crypto.createHash('sha256');
        hash.update(this.password);
        this.password = hash.digest('hex');
    }
    next();
});

// Compare hashed password
adminSchema.methods.comparePassword = function(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    const hashedPassword = hash.digest('hex');
    return hashedPassword === this.password;
};

module.exports = mongoose.model('Admin', adminSchema);
