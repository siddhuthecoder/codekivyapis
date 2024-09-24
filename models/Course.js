const mongoose = require('mongoose');
const crypto = require('crypto');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    pdfUrl: { type: String },
    cost: { type: Number, required: true },
    duration: { type: String, required: true },
    rating: { type: Number },
    courseId: { type: String, unique: true }, 
    numberOfStudentsEnrolled: { type: Number, default: 0 },
    imageString:{type:String}
}, { timestamps: true });

// Generate a custom courseId before saving
courseSchema.pre('save', function (next) {
    if (!this.courseId) {
        this.courseId = generateCourseId(); 
    }
    next();
});

const generateCourseId = () => {
    const uniqueId = crypto.randomBytes(4).toString('hex');  // Generates a unique 8-character hex string
    return `COURSE-${uniqueId}`;  // Customize the courseId format (e.g., COURSE-abcdef12)
};

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
