const express = require('express');
const router = express.Router();
const { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse, registerStudentToCourse, getStudentsByCourseId } = require('../controllers/course.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Course routes
router.post('/', authMiddleware,createCourse);
router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.put('/:id',authMiddleware, updateCourse);
router.delete('/:id',authMiddleware, deleteCourse);

router.post('/register', registerStudentToCourse);
router.get('/:courseId/students',authMiddleware, getStudentsByCourseId);

module.exports = router;
