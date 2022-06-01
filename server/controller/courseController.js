
const Course = require('../models/course');
const Category = require('../models/category');
const course_category= require('../models/course_category');


exports.getCourses = (req, res) => {
    Course.findAll({
        include:[
        {
            model: Category,
            attributes: ['id', 'name'],
            through: {
                attributes: ['categoryId', 'courseId']}
        
    }]}).then(courses => {
        res.send(courses);     
    });
}

exports.getCourseById = (req, res) => {
    Course.findOne({
        where : {id: req.params.id},
        include:[
            {
                model: Category,
                attributes: ['id', 'name'],
                through: {
                    attributes: ['categoryId', 'courseId']}}]

    }).then(course => {res.send(course);});
}

exports.createCourse = (req, res) => {
    Course.create({
        where : {id: req.params.id},
        name: req.body.name,
        description: req.body.description,
        maxPoints: req.body.maxPoints,
    }
    
    ).then(course => {res.send(course);});
}

exports.updateCourse=(req, res) => {
    Course.update({
        name: req.body.name,
        description: req.body.description,
        maxPoints: req.body.maxPoints
    },{where:{id:req.params.id}}
    ).then(course => {res.send(course);})
}

exports.deleteCourse=(req, res) => {
    Course.destroy({
        where: {
            id: req.params.id
        }
    })
}

exports.addCourseCategoryJunction=(req, res) => {
    course_category.create({
        courseId: req.body.courseId,
        categoryId: req.body.categoryId
    }).then(course_category => {
        res.send(course_category);
    })
    
}


