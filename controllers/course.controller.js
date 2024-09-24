const Course = require('../models/Course'); 
const Student = require('../models/Student');  
const { ErrorValidation, SuccessValidation } = require('../utils/helpers');

// Create a new course
const createCourse = async (req, res) => {
    const { name, description, pdfUrl, cost, duration, rating,imageString } = req.body;
    try {
        const newCourse = new Course({ name, description, pdfUrl, cost, duration, rating,imageString });
        await newCourse.save();
        SuccessValidation(req, res, { message: 'Course created successfully', course: newCourse }, 201);
    } catch (err) {
        ErrorValidation(req, res, err);
    }
};

// Get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();  
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
    const { name, description, pdfUrl, cost, duration, rating,imageString } = req.body;
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
        course.imageString = imageString || course.imageString;

        await course.save();
        SuccessValidation(req, res, { message: 'Course updated successfully', course });
    } catch (err) {
        ErrorValidation(req, res, err);
    }
};

//Delete course
const deleteCourse = async (req, res) => {
    const courseId  = req.params.id;  

    try {
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
    const { name, studentClass, year, branch, phone, email, college ,courseId } = req.body;

    try {
        const course = await Course.findOne({courseId});
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        const course_name = course.name;
        const newStudent = new Student({
            name, studentClass, year, branch, phone, email, college, course_name,courseId
        });
        
        course.numberOfStudentsEnrolled += 1;
        await course.save();
        await newStudent.save();

        SuccessValidation(req, res, { message: 'Student registered successfully', student: newStudent });

    } catch (err) {
        ErrorValidation(req, res, err);
    }
};

const getStudentsByCourseId = async (req, res) => {
    const { courseId } = req.params;
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
