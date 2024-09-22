const Course = require('../models/Course');  // Assuming you have a Course model
const Student = require('../models/Student');  // Assuming you have a Student model
const { ErrorValidation, SuccessValidation } = require('../utils/helpers');

// Create a new course
const createCourse = async (req, res) => {
    const { name, description, pdfUrl, cost, duration, rating } = req.body;
    try {
        const newCourse = new Course({ name, description, pdfUrl, cost, duration, rating });
        await newCourse.save();
        SuccessValidation(req, res, { message: 'Course created successfully', course: newCourse }, 201);
    } catch (err) {
        ErrorValidation(req, res, err);
    }
};

// Get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();  // Assuming you have a soft delete
        SuccessValidation(req, res, courses);
    } catch (err) {
        ErrorValidation(req, res, err);
    }
};

// Get course by ID
const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findOne({courseId});
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        SuccessValidation(req, res, course);
    } catch (err) {
        ErrorValidation(req, res, err);
    }
};

// Update a course
const updateCourse = async (req, res) => {
    const courseId = req.params.id;
    const { name, description, pdfUrl, cost, duration, rating } = req.body;
    console.log(courseId);
    try {
        const course = await Course.findOne({courseId});
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        course.name = name || course.name;
        course.description = description || course.description;
        course.pdfUrl = pdfUrl || course.pdfUrl;
        course.cost = cost || course.cost;
        course.duration = duration || course.duration;
        course.rating = rating || course.rating;

        await course.save();
        SuccessValidation(req, res, { message: 'Course updated successfully', course });
    } catch (err) {
        ErrorValidation(req, res, err);
    }
};

//Delete course
const deleteCourse = async (req, res) => {
    const courseId  = req.params.id;  // Use courseId from the request params

    try {
        // Find and delete the course by the custom courseId field
        const course = await Course.findOneAndDelete({ courseId });
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        SuccessValidation(req, res, { message: 'Course deleted successfully' });
    } catch (err) {
        ErrorValidation(req, res, err);
    }
};



// Register a student to a course
const registerStudentToCourse = async (req, res) => {
    const { name, studentClass, year, branch, phone, email, college,course_name,courseId } = req.body;

    try {
        const course = await Course.findOne({courseId});
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const newStudent = new Student({
            name, studentClass, year, branch, phone, email, college, course_name,courseId
        });

        await newStudent.save();
        SuccessValidation(req, res, { message: 'Student registered successfully', student: newStudent });
    } catch (err) {
        ErrorValidation(req, res, err);
    }
};


const getStudentsByCourseId = async (req, res) => {
    const { courseId } = req.params;
    console.log(courseId)
    try {
        // Fetch students based on the custom courseId
        const students = await Student.find({ courseId });
        if (!students || students.length === 0) {
            return res.status(404).json({ message: 'No students found for this course' });
        }

        SuccessValidation(req, res, students);
    } catch (err) {
        ErrorValidation(req, res, err);
    }
};


module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    registerStudentToCourse,
    getStudentsByCourseId
};
