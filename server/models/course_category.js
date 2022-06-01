const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const Course = require('./course');
const Category = require('./category');

const courseCategory = sequelize.define('course_category', {})

Category.belongsToMany(Course, {through: 'course_category'});
Course.belongsToMany(Category, {through: 'course_category'});

module.exports = courseCategory;