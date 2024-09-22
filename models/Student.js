const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    studentClass: { type: String, required: true },
    year: { type: Number, required: true },
    branch: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    college: { type: String, required: true },
    course_name: { type: String, required: true },
    courseId: { type: String, unique: true },  
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
