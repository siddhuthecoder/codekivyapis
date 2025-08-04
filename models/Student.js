const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    studentClass: { type: String},
    year: { type: Number, required: true },
    branch: { type: String },
    phone: { type: String, required: true },
    WaNumber: { type: String, required: true },
    email: { type: String, required: true },
    college: { type: String },
    course_name: { type: String, required: true },
    courseId: { type: String, unique: true },  
    imageString:{type:String},
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
