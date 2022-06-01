const Category = require('../models/category');
const Course = require('../models/course');

exports.getCategories = (req, res) => {
    Category.findAll(
        {
            include:[
            {
                model: Course,
                attributes: ['id', 'name' , 'description', 'maxPoints'],
                through: {
                    attributes: ['categoryId', 'courseId']} 
        }]}
    ).then(categories => { 
        res.cookie('jwt', 'test');
        res.send(categories); });
}

exports.getCategoryById = (req, res) => {
    Category.findOne({
        where : {id: req.params.id},
        include:[
            {
                model: Course,
                attributes: ['id', 'name' , 'description', 'maxPoints'],
                through: {
                    attributes: ['categoryId', 'courseId']}}]

    }).then(category => { res.send(category); });

}


exports.createCategory = (req, res) => {
    Category.create({
        name: req.body.name,
    })
    .then(category => { res.send(category);});
}

exports.updateCategory=(req, res) => {
    Category.update(
        {name: req.body.name},
        {where : {id:req.params.id}}
        )
    .then(category => {res.send(category);})}

exports.deleteCategory=(req,res) => {
    Category.destroy({ where: {id: req.params.id }})
}