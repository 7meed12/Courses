const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseController');

router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);
router.post('/addjunction', courseController.addCourseCategoryJunction)
router.post('/create', courseController.createCourse);
router.put('/update/:id', courseController.updateCourse);
router.delete('/delete/:id', courseController.deleteCourse);


 module.exports= router;
 