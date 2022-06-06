const sequelize = require('../config/db');
const Course = require('./course');
const User = require('./user');

const userCourse = sequelize.define('user_course', {})

User.belongsToMany(Course, {through: 'user_course'});
Course.belongsToMany(User, {through: 'user_course'});

module.exports = userCourse;